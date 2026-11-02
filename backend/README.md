# 🌿 sBLOOM Affiliate Portal — FastAPI Backend

FastAPI backend foundation for the **sBLOOM Affiliate Portal**. Built with **Python 3.13**, **FastAPI**, **Pydantic v2**, and **Uvicorn**.

> ⚠️ **Demo Architecture & In-Memory Storage Limitations**:
> - **In-Memory Storage Only**: For this phase, all registered demo affiliates and customer leads reside in volatile server memory. Data resets when the backend server restarts.
> - **Database Deferred**: External database integration (Supabase / PostgreSQL) will be connected in Phase 2.
> - **Password Security**: Passwords are salted and hashed using PBKDF2-HMAC-SHA256 and never stored in plain text. This is a demonstration scaffold and not a production authentication authority.
> - **Strict CORS**: Configured exclusively for local frontend origins (`http://localhost:5173`, `http://127.0.0.1:5173`).

---

## 📁 Maintainable Backend Structure

```text
backend/
├── .env.example               # Environment variables template
├── .env                       # Local development environment configuration
├── requirements.txt           # Python dependencies (FastAPI, Uvicorn, Pydantic, HTTPX, email-validator)
├── run.py                     # One-click beginner launcher: `python run.py`
├── README.md                  # This API documentation guide
├── app/
│   ├── __init__.py            # Application package root
│   ├── main.py                # FastAPI app, strict CORS, lifespan, top-level /health & root info
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py          # Pydantic BaseSettings for type-safe environment configuration
│   │   └── security.py        # PBKDF2 salted password hashing & demo disclaimers
│   ├── schemas/               # Pydantic models for request validation & response serialization
│   │   ├── __init__.py
│   │   ├── health.py          # HealthResponse telemetry schema
│   │   ├── affiliate.py       # AffiliateRegisterRequest, Update, and Response schemas
│   │   ├── lead.py            # LeadCreateRequest, LeadResponse, LeadListResponse with validators
│   │   └── service.py         # ServiceItem and ServiceListResponse schemas
│   ├── services/              # Business logic & in-memory state management
│   │   ├── __init__.py
│   │   ├── storage.py         # Thread-safe in-memory store initialized with sample leads
│   │   ├── affiliate_service.py # Demo partner registration & referral code generation
│   │   ├── lead_service.py    # Reference number generation (SBL-YYYYMM-XXXX) & filtering
│   │   └── service_catalog.py # Catalog of promotional offerings with commission calculators
│   └── api/
│       ├── __init__.py
│       └── v1/
│           ├── __init__.py
│           ├── api.py         # Aggregated v1 routing table
│           └── endpoints/
│               ├── __init__.py
│               ├── health.py  # GET /health & /api/v1/health
│               ├── affiliates.py # POST /register-demo, GET /me, PATCH /me
│               ├── leads.py   # POST /leads, GET /leads, GET /leads/{lead_id}
│               └── services.py# GET /services
└── tests/
    ├── __init__.py
    ├── test_health.py         # Health telemetry tests
    ├── test_affiliates.py     # Demo affiliate registration, uniqueness, and profile updates
    ├── test_leads.py          # Lead creation, reference number regex, filtering, and 404 tests
    ├── test_validation.py     # Missing fields, invalid emails, consent checks, password length
    └── test_services.py       # Promotional catalog tests
```

---

## 🚀 How to Run the Backend

### 1. Start Server with One Command
From inside the `backend` directory:
```powershell
python run.py
```

Or using Uvicorn directly:
```powershell
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

---

## 📖 How to Open Interactive API Documentation

Once the server is running, open your web browser:

1. **Interactive Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
   - Allows testing all endpoints interactively with JSON payloads.
2. **ReDoc Alternative UI**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
   - Clean, publication-style API reference.

---

## 🔌 API Endpoints Reference

### 1. Health Diagnostics
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Top-level service health check, uptime, in-memory disclaimer |
| `GET` | `/api/v1/health` | Canonical v1 health diagnostics endpoint |

### 2. Affiliates Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/affiliates/register-demo` | Register demo partner. Generates unique referral code (e.g. `SBLOOM-HARSHI-78`). Passwords salted & hashed. |
| `GET` | `/api/v1/affiliates/me` | Retrieve active affiliate profile (supports optional `X-Affiliate-Id` header). |
| `PATCH` | `/api/v1/affiliates/me` | Update partner profile fields, UPI payout ID, or notification settings. |

### 3. Referral Leads Pipeline
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/leads` | Create a new lead referral. Validates all required fields, verifies consent, generates reference number (`SBL-YYYYMM-XXXX`), and calculates estimated commission. |
| `GET` | `/api/v1/leads` | List referral leads. Supports filters: `status`, `sector`, `affiliate_code`, `search`, `skip`, `limit`. |
| `GET` | `/api/v1/leads/{lead_id}` | Retrieve single lead details by internal ID (`lead-9041`) or reference (`SBL-202610-9041`). Returns 404 if not found. |

### 4. Promotional Services Catalog
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/services` | Returns the 4 sBLOOM service tiers available for affiliate promotion with commission rates and cookie durations. |

---

## 📋 Lead Schema & Field Specifications

When submitting a lead to `POST /api/v1/leads`, Pydantic validates the following fields:

```json
{
  "business_name": "Apex Cloud Solutions Pvt Ltd",
  "contact_name": "Vikramaditya Sharma",
  "email": "vikram@apexcloud.in",
  "phone": "+91 98450 11223",
  "location": "Hyderabad, Telangana, India",
  "sector": "Technology & Enterprise SaaS",
  "services_of_interest": ["srv-agentic-pipeline"],
  "business_requirements": "Looking to automate L1/L2 customer support using fine-tuned agent workflows.",
  "preferred_meeting_datetime": "2026-11-20T14:30:00+05:30",
  "timezone": "Asia/Kolkata",
  "consent": true,
  "affiliate_code": "SBLOOM-HARSHI-78",
  "notes": "Met client at Hyderabad SaaS Summit."
}
```

- **Validation Rules**:
  - `business_name`, `contact_name`, `email`, `phone`, `location`, `sector`, `services_of_interest`, `business_requirements`, and `consent` are **strictly required**.
  - `consent` must be `true` (if `false`, returns HTTP 422: *"Explicit consent is required..."*).
  - `business_requirements` requires a minimum of 10 characters.
  - Generates a unique reference number formatted: **`SBL-<YEAR><MONTH>-<4-HEX-CHARS>`** (e.g. `SBL-202611-9F3B`).

---

## 🧪 Running Automated Tests

Run the complete test suite from inside the `backend` directory:
```powershell
cd backend
python -m unittest discover -s tests -p "test_*.py"
```

**Actual Test Results**:
- `test_health.py`: 3 tests — **PASSED**
- `test_affiliates.py`: 4 tests — **PASSED**
- `test_leads.py`: 6 tests — **PASSED**
- `test_validation.py`: 6 tests — **PASSED**
- `test_services.py`: 1 test — **PASSED**
- **Total**: `Ran 20 tests in 0.266s — OK`
