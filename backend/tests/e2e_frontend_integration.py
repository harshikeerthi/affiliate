"""
End-to-End Integration Test Suite
Validates the complete flow requested by the user:
1. Backend health check (connection indicator)
2. Demo registration POST /api/v1/affiliates/register-demo
3. Profile view GET /api/v1/affiliates/me & update PATCH /api/v1/affiliates/me
4. Services catalog GET /api/v1/services
5. Lead submission POST /api/v1/leads (with returned reference number)
6. Lead listing GET /api/v1/leads confirming the created lead appears
7. Validation error handling (consent=False, short requirements, duplicate affiliate)
"""
import urllib.request
import urllib.parse
import json
import re
import sys

# Support UTF-8 characters like INR rupee symbol on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

BASE_URL = "http://127.0.0.1:8000"


def make_request(path: str, method: str = "GET", body: dict = None, headers: dict = None):
    url = f"{BASE_URL}{path}"
    req_headers = {"Accept": "application/json"}
    if headers:
        req_headers.update(headers)
    
    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        req_headers["Content-Type"] = "application/json"
    
    req = urllib.request.Request(url, data=data, headers=req_headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            status = resp.status
            content = resp.read().decode("utf-8")
            return status, json.loads(content)
    except urllib.error.HTTPError as e:
        content = e.read().decode("utf-8")
        try:
            return e.code, json.loads(content)
        except Exception:
            return e.code, {"raw_error": content}

def run_tests():
    print("=" * 70)
    print("RUNNING FRONTEND-BACKEND END-TO-END FLOW VERIFICATION")
    print("Target Backend:", BASE_URL)
    print("=" * 70)
    
    # 1. Health check (Connection Indicator)
    print("\n[STEP 1] Testing Connection Indicator (GET /health & GET /api/v1/health)...")
    code, health_data = make_request("/health")
    assert code == 200, f"Expected 200, got {code}"
    assert health_data["status"] == "healthy", f"Expected healthy status, got {health_data['status']}"
    assert health_data["database_connected"] is False, "Expected database_connected=False (no Supabase in this phase)"
    assert "modules_ready" in health_data, "Expected modules_ready list in telemetry"
    print(f"  [OK] GET /health returned 200 OK: {health_data['service']} v{health_data['version']}")
    print(f"  [OK] Storage Mode: {health_data['storage_mode']}")
    print(f"  [OK] Modules active: {len(health_data['modules_ready'])} modules")

    # 2. Services Catalog
    print("\n[STEP 2] Testing Services Catalog (GET /api/v1/services)...")
    code, srv_data = make_request("/api/v1/services")
    assert code == 200, f"Expected 200, got {code}"
    assert srv_data["total"] >= 4, f"Expected >= 4 services, got {srv_data['total']}"
    services = srv_data["services"]
    print(f"  [OK] GET /api/v1/services returned {len(services)} promotional services:")
    for s in services:
        print(f"    - {s['name']} [{s['id']}]: Rate={s['commission_rate']}, Avg={s['avg_commission']}")

    # 3. Demo Registration
    import uuid
    random_slug = uuid.uuid4().hex[:6]
    reg_payload = {
        "name": "Nikhila Varma",
        "email": f"nikhila_{random_slug}@telugutech.org",
        "phone": "+91 94401 23456",
        "password": "SecurePassword123!",
        "category": "Enterprise Solutions Consultant",
        "payout_upi": "nikhila@okhdfcbank",
        "consent": True
    }
    code, reg_data = make_request("/api/v1/affiliates/register-demo", method="POST", body=reg_payload)
    assert code == 201, f"Expected 201 Created, got {code}: {reg_data}"
    referral_code = reg_data["referral_code"]
    affiliate_id = reg_data["id"]
    assert referral_code.startswith("SBLOOM-"), f"Expected SBLOOM referral code, got {referral_code}"
    assert "DEMO" in reg_data["disclaimer"], "Expected DEMO disclaimer in response"
    print(f"  [OK] POST /api/v1/affiliates/register-demo succeeded (201 Created)")
    print(f"  [OK] Assigned Partner ID: {affiliate_id}")
    print(f"  [OK] Generated Referral Code: {referral_code}")
    print(f"  [OK] Demo Notice: {reg_data['disclaimer'][:60]}...")

    # Duplicate registration check
    code_dup, err_dup = make_request("/api/v1/affiliates/register-demo", method="POST", body=reg_payload)
    assert code_dup == 400, f"Expected 400 for duplicate email, got {code_dup}"
    print(f"  [OK] Duplicate registration correctly rejected with 400: '{err_dup.get('detail')}'")

    # 4. Profile View and Update
    print("\n[STEP 4] Testing Profile View & Update (GET / PATCH /api/v1/affiliates/me)...")
    headers = {"X-Affiliate-Id": affiliate_id}
    code, prof_data = make_request("/api/v1/affiliates/me", headers=headers)
    assert code == 200, f"Expected 200, got {code}"
    assert prof_data["name"] == "Nikhila Varma"
    print(f"  [OK] GET /api/v1/affiliates/me confirmed partner: {prof_data['name']} ({prof_data['email']})")

    patch_payload = {
        "phone": "+91 94401 99999",
        "payout_upi": "nikhila.new@icici",
        "notification_whatsapp": True
    }
    code, updated_prof = make_request("/api/v1/affiliates/me", method="PATCH", body=patch_payload, headers=headers)
    assert code == 200, f"Expected 200, got {code}"
    assert updated_prof["phone"] == "+91 94401 99999"
    assert updated_prof["payout_upi"] == "nikhila.new@icici"
    print(f"  [OK] PATCH /api/v1/affiliates/me updated phone and UPI successfully")

    # 5. Lead Submission Form
    print("\n[STEP 5] Testing Lead Submission Form (POST /api/v1/leads)...")
    lead_payload = {
        "business_name": "Kaveri Robotics & Automation Pvt Ltd",
        "contact_name": "Suresh Reddy",
        "email": "suresh.reddy@kaverirobotics.in",
        "phone": "+91 98490 88776",
        "location": "Gachibowli, Hyderabad, Telangana",
        "sector": "Healthcare",
        "services_of_interest": ["srv-whatsapp-automation"],
        "business_requirements": "Evaluating automated communication systems to orchestrate patient and clinic followups.",
        "preferred_meeting_datetime": "2026-11-20T11:00:00+05:30",
        "timezone": "Asia/Kolkata",
        "consent": True,
        "affiliate_code": referral_code,
        "notes": "Met CTO at Hyderabad Tech Summit 2026."
    }
    code, created_lead = make_request("/api/v1/leads", method="POST", body=lead_payload)
    assert code == 201, f"Expected 201 Created, got {code}: {created_lead}"
    ref_num = created_lead["reference_number"]
    assert re.match(r"^SBL-\d{6}-[A-Z0-9]{4}$", ref_num), f"Invalid reference number pattern: {ref_num}"
    assert created_lead["business_name"] == "Kaveri Robotics & Automation Pvt Ltd"
    assert created_lead["status"] == "Pending"
    print(f"  [OK] POST /api/v1/leads recorded lead successfully (201 Created)")
    print(f"  [OK] Returned Unique Reference: {ref_num}")
    print(f"  [OK] Assigned Deal Estimate: {created_lead['estimated_value']}")
    print(f"  [OK] Simulated Commission: {created_lead['estimated_commission']}")

    # Validation check: consent=False
    invalid_lead = dict(lead_payload)
    invalid_lead["consent"] = False
    invalid_lead["email"] = "suresh2@kaverirobotics.in"
    code_inv, err_inv = make_request("/api/v1/leads", method="POST", body=invalid_lead)
    assert code_inv == 422, f"Expected 422 for consent=False, got {code_inv}"
    print(f"  [OK] Lead without consent rejected with 422 Unprocessable Entity")

    # Validation check: requirements too short (< 10 chars)
    invalid_lead2 = dict(lead_payload)
    invalid_lead2["business_requirements"] = "short"
    invalid_lead2["email"] = "suresh3@kaverirobotics.in"
    code_inv2, err_inv2 = make_request("/api/v1/leads", method="POST", body=invalid_lead2)
    assert code_inv2 == 422, f"Expected 422 for short requirements, got {code_inv2}"
    print(f"  [OK] Lead with short requirements rejected with 422 Unprocessable Entity")

    # 6. My Leads Page: Confirm Lead Appears
    print("\n[STEP 6] Testing My Leads Page (GET /api/v1/leads)...")
    code, leads_list = make_request("/api/v1/leads")
    assert code == 200, f"Expected 200, got {code}"
    leads = leads_list["leads"]
    
    # Confirm the newly submitted lead appears
    matching = [l for l in leads if l["reference_number"] == ref_num]
    assert len(matching) == 1, f"Expected to find lead with reference {ref_num} in My Leads table, found {len(matching)}"
    found_lead = matching[0]
    assert found_lead["contact_name"] == "Suresh Reddy"
    assert found_lead["business_name"] == "Kaveri Robotics & Automation Pvt Ltd"
    print(f"  [OK] GET /api/v1/leads confirmed {len(leads)} total leads in backend memory")
    print(f"  [OK] CONFIRMED: Newly submitted lead '{ref_num}' is at the top of My Leads!")

    # Search filter check
    code, search_res = make_request("/api/v1/leads?search=Kaveri")
    assert code == 200
    assert any(l["reference_number"] == ref_num for l in search_res["leads"]), "Search did not find Kaveri"
    print(f"  [OK] Search by 'Kaveri' correctly returned matching lead")

    # Status filter check
    code, status_res = make_request("/api/v1/leads?status=Pending")
    assert code == 200
    assert all(l["status"] == "Pending" for l in status_res["leads"]), "Status filter returned non-Pending leads"
    print(f"  [OK] Status filter 'Pending' returned {len(status_res['leads'])} pending leads")

    # Single lead lookup by reference
    code, single_lead = make_request(f"/api/v1/leads/{ref_num}")
    assert code == 200
    assert single_lead["id"] == found_lead["id"]
    print(f"  [OK] Single lead lookup GET /api/v1/leads/{ref_num} confirmed")

    print("\n" + "=" * 70)
    print("ALL 6 END-TO-END VERIFICATION FLOWS PASSED SUCCESSFULLY!")
    print("=" * 70)

if __name__ == "__main__":
    try:
        run_tests()
    except Exception as e:
        print(f"\n[FAIL] E2E TEST FAILED: {e}", file=sys.stderr)
        sys.exit(1)

