import sys
import os
import unittest
import re

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from fastapi.testclient import TestClient
from app.main import app


class TestLeadsAPI(unittest.TestCase):
    """Test suite for lead submission, reference generation, and retrieval."""

    def setUp(self):
        self.client = TestClient(app)

    def test_create_lead_success(self):
        """Test creating a new lead with all required fields."""
        payload = {
            "business_name": "Zenith Analytics Corp",
            "contact_name": "Rohan Mehra",
            "email": "rohan@zenithanalytics.io",
            "phone": "+91 99123 45678",
            "location": "Hyderabad, Telangana",
            "sector": "Healthcare",
            "services_of_interest": ["srv-whatsapp-automation"],
            "business_requirements": "Looking to automate patient appointment booking and reminders via WhatsApp.",
            "preferred_meeting_datetime": "2026-11-20T15:00:00+05:30",
            "timezone": "Asia/Kolkata",
            "consent": True,
            "affiliate_code": "SBLOOM-HARSHI-78",
            "notes": "Met clinic director at Hyderabad Health Summit.",
        }

        response = self.client.post("/api/v1/leads", json=payload)
        self.assertEqual(response.status_code, 201)
        data = response.json()

        # Check required return fields
        self.assertEqual(data["business_name"], payload["business_name"])
        self.assertEqual(data["contact_name"], payload["contact_name"])
        self.assertEqual(data["email"], payload["email"])
        self.assertEqual(data["status"], "Pending")

        # Verify generated reference number format (e.g. SBL-202611-ABCD)
        self.assertTrue(re.match(r"^SBL-\d{6}-[A-Z0-9]{4}$", data["reference_number"]))
        self.assertIn("TBD", data["estimated_commission"])

    def test_list_leads_returns_data(self):
        """Test GET /api/v1/leads returns list structure."""
        response = self.client.get("/api/v1/leads")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertGreaterEqual(data["total"], 0)
        self.assertIsInstance(data["leads"], list)
        self.assertIn("leads", data)

    def test_get_lead_by_id_and_reference(self):
        """Test retrieving lead by internal ID and reference number after creation."""
        # Create a lead first
        payload = {
            "business_name": "Care Clinic Hospital",
            "contact_name": "Dr. Sunita Rao",
            "email": "sunita@careclinic.in",
            "phone": "+91 98888 77777",
            "location": "Hyderabad, Telangana",
            "sector": "Healthcare",
            "services_of_interest": ["srv-whatsapp-automation"],
            "business_requirements": "Patient reminders and followups automation.",
            "consent": True,
        }
        create_res = self.client.post("/api/v1/leads", json=payload)
        self.assertEqual(create_res.status_code, 201)
        created = create_res.json()

        # Retrieve by ID
        res1 = self.client.get(f"/api/v1/leads/{created['id']}")
        self.assertEqual(res1.status_code, 200)
        self.assertEqual(res1.json()["id"], created["id"])

        # Retrieve by Reference Number
        res2 = self.client.get(f"/api/v1/leads/{created['reference_number']}")
        self.assertEqual(res2.status_code, 200)
        self.assertEqual(res2.json()["contact_name"], "Dr. Sunita Rao")

    def test_get_nonexistent_lead_returns_404(self):
        """Test that requesting an invalid lead ID returns 404 with helpful error."""
        response = self.client.get("/api/v1/leads/non-existent-lead-id")
        self.assertEqual(response.status_code, 404)
        self.assertIn("not found", response.json()["detail"])


if __name__ == "__main__":
    unittest.main()
