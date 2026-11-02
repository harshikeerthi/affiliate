# 🌿 sBLOOM Affiliate Portal — Foundation Phase (Phase 1)

Welcome to the **sBLOOM Affiliate Portal**! This repository houses the foundation architecture for the sBLOOM affiliate and creator intelligence platform.

This phase establishes two completely independent services:
1. **Frontend**: Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**, styled using official sBLOOM design tokens and typography.
2. **Backend**: Built with **Python 3.13** and **FastAPI**, served via **Uvicorn** with type-safe Pydantic configuration and CORS support.

> ℹ️ **Phase 1 Database Notice**: Database integration is intentionally deferred to Phase 2. No external database or Supabase setup is required in this phase. The backend serves live foundation telemetry and mock-ready health diagnostics.

---

## 📁 Repository Structure

```text
Affiliate/
├── .env.example               # Root configuration template
├── .gitignore                 # Excludes node_modules, .env, __pycache__, and build artifacts
├── README.md                  # This beginner-friendly documentation
│
├── backend/                   # Independent Python / FastAPI Service
│   ├── .env.example           # Backend environment template
│   ├── .env                   # Local backend configuration (Port 8000, CORS)
│   ├── requirements.txt       # Python dependencies (FastAPI, Uvicorn, Pydantic, HTTPX)
│   ├── run.py                 # Beginner-friendly one-command server launcher
│   ├── app/
│   │   ├── __init__.py        # App package marker
│   │   ├── main.py            # FastAPI entry point, CORS middleware, lifespan events
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   └── config.py      # Pydantic BaseSettings for type-safe environment variables
│   │   └── api/
│   │       ├── __init__.py
│   │       └── v1/
│   │           ├── __init__.py
│   │           ├── api.py     # Aggregated v1 routing table
│   │           └── endpoints/
│   │               ├── __init__.py
│   │               └── health.py # Health check telemetry endpoint (/api/v1/health)
│   └── tests/
│       ├── __init__.py
│       └── test_health.py     # Automated unit tests for health check & root endpoints
│
└── frontend/                  # Independent React / Vite / TypeScript Service
    ├── .env.example           # Frontend environment template
    ├── .env                   # Frontend local config (points to http://localhost:8000)
    ├── index.html             # HTML shell with Fraunces, Plus Jakarta Sans, & Telugu Google Fonts
    ├── package.json           # NPM scripts and dependencies (React 19, Lucide, Tailwind CSS)
    ├── postcss.config.js      # PostCSS setup for Tailwind CSS
    ├── tailwind.config.js     # Custom sBLOOM brand tokens & font families
    ├── tsconfig.json          # TypeScript workspace configuration
    ├── vite.config.ts         # Vite bundler configuration
    └── src/
        ├── index.css                  # Design tokens, CSS variables, subtle dot grid pattern
        ├── main.tsx                   # React root entry point
        ├── App.tsx                    # React Router configuration for all 13 routes
        ├── context/
        │   ├── LanguageContext.tsx    # English & Telugu switcher with draft notice
        │   └── AuthContext.tsx        # Direct sign-up session & persona switcher (Affiliate ⇄ Admin)
        ├── data/
        │   ├── translations.ts        # Bilingual dictionary (EN & TE)
        │   ├── sampleLeads.ts         # Realistic sample leads dataset
        │   ├── sampleServices.ts      # Services catalog for affiliate promotion
        │   └── sampleEarnings.ts      # Sample earnings and payout invoices
        ├── components/
        │   ├── ui/                    # Reusable design system components
        │   │   ├── Button.tsx         # Primary violet, outline, lime, danger with loader
        │   │   ├── Input.tsx          # Visible labels, required asterisk, validation error
        │   │   ├── Select.tsx         # Dropdown select with custom chevron
        │   │   ├── Textarea.tsx       # Textarea with helper text and validation
        │   │   ├── Card.tsx           # Canvas, surface, and dark card containers
        │   │   ├── StatusBadge.tsx    # Color-coded pills (Pending, Qualified, Converted...)
        │   │   ├── Table.tsx          # Responsive data table with empty state handling
        │   │   ├── Drawer.tsx         # Slide-out side drawer for mobile & lead auditing
        │   │   ├── Modal.tsx          # Accessible ConfirmationDialog with keyboard events
        │   │   ├── DemoDataNotice.tsx # Global disclaimer for simulated demo data
        │   │   └── ComingSoonState.tsx# Phase 2 module placeholder
        │   ├── layout/
        │   │   ├── AffiliateLayout.tsx# 248px sidebar layout + TopBar + Demo disclaimer
        │   │   ├── AdminLayout.tsx    # 248px dark admin sidebar layout + TopBar
        │   │   ├── TopBar.tsx         # EN/TE language toggle, role switcher, user menu
        │   │   ├── AffiliateSidebar.tsx # 8 required affiliate navigation links & partner ID
        │   │   └── AdminSidebar.tsx   # Distinct dark sidebar for admin console
        │   └── features/
        │       └── LeadDrawer.tsx     # Lead submission form & commission audit drawer
        └── pages/
            ├── LandingPage.tsx        # / — Welcome portal landing page
            ├── auth/
            │   ├── SignupPage.tsx     # /app/signup — Instant direct join (NO waiting screen!)
            │   └── LoginPage.tsx      # /app/login — Partner login with demo credentials
            ├── affiliate/
            │   ├── DashboardPage.tsx  # /app — Overview KPIs & recent leads
            │   ├── ServicesPage.tsx   # /app/services — Promotional catalog & custom links
            │   ├── LearnPage.tsx      # /app/learn — Training academy & sales pitch kit
            │   ├── LeadsPage.tsx      # /app/leads — Lead management table & filters
            │   ├── EarningsPage.tsx   # /app/earnings — Commission ledger & payout dates
            │   ├── InvoicesPage.tsx   # /app/invoices — Downloadable payout vouchers
            │   ├── ProfilePage.tsx    # /app/profile — Partner details, UPI payout settings
            │   └── SupportPage.tsx    # /app/support — Ticket submission & FAQ accordion
            └── admin/
                ├── AdminDashboardPage.tsx # /admin — Ecosystem oversight & volume
                └── AdminLeadsPage.tsx # /admin/leads — Lead moderation & deal conversion
```

---

## 🎨 sBLOOM Design Tokens

The frontend adheres to the exact design specifications:

| Token Name | Hex Code | Visual Role |
| :--- | :--- | :--- |
| **Canvas** | `#FAF7F2` | Primary light background surface |
| **Secondary Surface** | `#F3ECE1` | Card surfaces, container backgrounds |
| **Main Text** | `#12101F` | Deep dark ink for high-contrast readability |
| **Secondary Text** | `#575266` | Muted charcoal for descriptions and metadata |
| **Border** | `#E8E2D8` | Subtle card dividers and container borders |
| **Violet** | `#6B3CFF` | Primary brand accent and interactive elements |
| **Magenta** | `#FF4FA3` | Secondary brand accent and highlight badges |
| **Lime** | `#D6F36B` | High-energy indicator for success, health, and activity |
| **Admin Dark** | `#0E0B1E` | High-contrast dark containers and code blocks |

### Typography
- **Display Headings**: `Fraunces` (Loaded via Google Fonts, weights 400 to 800)
- **Body Copy**: `Plus Jakarta Sans` (Loaded via Google Fonts, weights 300 to 800)
- **Telugu Support**: `Noto Sans Telugu` for multilingual creator onboarding (e.g. `స్వాగతం`)

---

## 🚀 Quickstart Guide (Step-by-Step for Beginners)

Open **two separate terminal windows** (one for backend, one for frontend).

### 1. Terminal 1 — Start the Backend (FastAPI)

```bash
# Step 1: Navigate to the backend directory
cd backend

# Step 2: (Optional) Install dependencies if not already installed
pip install -r requirements.txt

# Step 3: Run the backend server
python run.py
```

- Backend will start at: **`http://localhost:8000`**
- Interactive Swagger documentation: **`http://localhost:8000/docs`**
- Health endpoint: **`http://localhost:8000/api/v1/health`**

> **Tip**: You can also run the backend directly with Uvicorn:
> ```bash
> uvicorn app.main:app --reload --port 8000
> ```

---

### 2. Terminal 2 — Start the Frontend (Vite + React)

```bash
# Step 1: Navigate to the frontend directory
cd frontend

# Step 2: (Optional) Install dependencies if not already installed
npm install

# Step 3: Start the Vite development server
npm run dev
```

- Open your browser at: **`http://localhost:5173`**
- The frontend will automatically ping `http://localhost:8000/api/v1/health` and display **"API Online"** with live roundtrip latency (e.g. `12ms`).

---

## 🔌 API Base URL Configuration

The frontend is decoupled from the backend through an explicit environment variable:

- Located in `frontend/.env`:
  ```ini
  VITE_API_BASE_URL=http://localhost:8000
  ```
- Handled safely in `frontend/src/config/api.ts`:
  ```typescript
  export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  ```
If you ever deploy the backend to a remote server or different port, simply update `VITE_API_BASE_URL` in `frontend/.env`. You can also test custom URLs dynamically in the UI!

---

## 🧪 Verification & Automated Tests

All tests and build checks have been executed and verified:

### 1. Backend Unit Tests
Run the automated test suite from the `backend/` directory:
```bash
cd backend
python -m unittest discover -s tests -p "test_*.py"
```
**Verified Result**:
- `test_root_endpoint_returns_200` — **PASSED**
- `test_v1_health_endpoint_success` — **PASSED**
- `test_top_level_health_alias` — **PASSED**
- `test_database_is_not_connected_in_phase_1` — **PASSED**

### 2. Frontend Production Build Check
Run the TypeScript and Vite build check from the `frontend/` directory:
```bash
cd frontend
npm run build
```
**Verified Result**:
- TypeScript type-checking (`tsc -b`) — **0 errors**
- Vite production bundle generation — **Successfully built `dist/`**

---

## 🗺️ Roadmap to Phase 2

Now that the foundation is operational:
1. **Database Integration**: Connect Supabase PostgreSQL instance with Prisma/SQLAlchemy models.
2. **Affiliate Authentication**: Creator login, session cookies, and JWT token issuance.
3. **Commission Tracking**: Referral links generator, UTM parameters tracking, and real-time commission calculation.
4. **Analytics Dashboard**: Graphical revenue, click-through rates, and conversion metrics.
