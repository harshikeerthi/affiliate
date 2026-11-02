# sBLOOM Affiliate Portal — Frontend Design & Architecture Specification

> **Audience**: Engineering Team, Product Designers, and Frontend Reviewers  
> **Repository**: `e:\HARSHITHA\OTTOBON\Affiliate\frontend`  
> **Status**: Verified & Live at `http://localhost:5173/app`  
> **Target Audience / Market**: Regional Creators, Digital Agencies, and Tech Consultants in South India & Pan-India  

---

## 1. Executive Summary & Technology Stack

The **sBLOOM Affiliate Portal** is a high-performance, responsive single-page web application designed for creator monetization and enterprise deal referrals. It enables affiliates to generate tracked referral links, submit qualified enterprise leads, monitor lead verification stages, and track commission settlements.

### Core Technology Stack
| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **UI Framework** | React | `^19.3.1` | Component architecture & concurrent rendering |
| **Language** | TypeScript | `~7.0.2` | Strict static typing and interface contracts |
| **Build Tool & Bundler** | Vite | `^8.3.5` | Fast HMR dev server and optimized production bundling |
| **Routing** | React Router DOM | `^7.18.5` | Client-side routing with nested layout routes |
| **Styling** | Tailwind CSS | `^3.4.19` | Utility-first styling with custom design tokens |
| **CSS Preprocessor** | PostCSS + Autoprefixer | `^8.5.32` | Modern CSS compilation & vendor prefixing |
| **Iconography** | Lucide React | `^1.66.0` | Clean, modern feather-style SVG iconography |
| **Code Quality** | Oxlint | `^1.89.0` | Fast static linting |
| **API Integration** | Fetch API + Custom Client | Native ES | REST client connected to FastAPI backend on port 8000 |

---

## 2. Design System & Visual Tokens

The visual design system of sBLOOM is built upon warm organic editorial tones paired with vibrant high-tech accents (Electric Violet, Acid Lime, and Electric Magenta), creating a distinct premium look.

### 2.1 Complete Color Palette Tokens

| Token Name | Tailwind Class | Hex Code | Purpose / Application |
| :--- | :--- | :--- | :--- |
| **Canvas** | `bg-sbloom-canvas` | `#FAF7F2` | Global page background (warm editorial cream) |
| **Surface** | `bg-sbloom-surface` | `#F3ECE1` | Card backgrounds, pill wrappers, subtle contrast areas |
| **Text Main** | `text-sbloom-text-main` | `#12101F` | Primary headings, prominent copy, high-contrast dark text |
| **Text Secondary** | `text-sbloom-text-secondary`| `#575266` | Muted subtitles, timestamp labels, helper captions |
| **Border** | `border-sbloom-border` | `#E8E2D8` | Dividers, card strokes, input container outlines |
| **Violet (Primary)**| `bg-sbloom-violet` | `#6B3CFF` | Primary brand accent, primary CTA buttons, active nav items |
| **Violet Light** | `bg-sbloom-violet-light`| `#845BFF` | Hover states, glowing highlights |
| **Violet Dark** | `bg-sbloom-violet-dark` | `#5125DB` | Active / pressed button states |
| **Magenta (Accent)**| `bg-sbloom-magenta` | `#FF4FA3` | Secondary brand accent, feature highlights, logo flare |
| **Magenta Light** | `bg-sbloom-magenta-light`| `#FF70B6` | Subtle badges, gradient accents |
| **Lime (Highlight)**| `bg-sbloom-lime` | `#D6F36B` | High-energy pills, active badges, status indicators |
| **Lime Dark** | `bg-sbloom-lime-dark` | `#B8DB3D` | Lime hover states and contrast borders |
| **Admin Dark** | `bg-sbloom-admin` | `#0E0B1E` | Admin console sidebar, dark mode containers |
| **Admin Card** | `bg-sbloom-admin-card` | `#181432` | Dark container elevated surface |

### 2.2 Status Badge Color Tokens

Used across Lead Management, Commission Ledgers, and Invoices:

| Status Name | Background Class | Text / Border Class | Dot Hex Code | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| **Pending** | `bg-amber-50` | `text-amber-800 border-amber-200` | `#f59e0b` | Newly submitted lead awaiting initial review |
| **Contacted** | `bg-purple-50` | `text-purple-800 border-purple-200` | `#6B3CFF` | Sales team has initiated contact with client |
| **Qualified** | `bg-lime-50` | `text-lime-900 border-lime-300` | `#6fa014` | Client requirements verified; demo / POC scheduled |
| **Converted** | `bg-emerald-50` | `text-emerald-900 border-emerald-200` | `#10b981` | Deal closed, agreement signed, commission earned |
| **Rejected** | `bg-red-50` | `text-red-700 border-red-200` | `#ef4444` | Ineligible lead, out of service scope |
| **Paid** | `bg-emerald-50` | `text-emerald-900 border-emerald-200` | `#10b981` | Payout disbursed to affiliate bank / UPI |
| **Processing** | `bg-indigo-50` | `text-indigo-800 border-indigo-200` | `#6366f1` | Payout calculation approved; awaiting bank batch |
| **Draft** | `bg-orange-50` | `text-orange-800 border-orange-200` | `#f97316` | Draft translation or incomplete record |

### 2.3 Typography System

The typography pairs an editorial high-contrast serif for headings with a clean geometric sans-serif for UI clarity:

| Category | Font Family | Fallbacks | Weight / Settings | Used In |
| :--- | :--- | :--- | :--- | :--- |
| **Headings** | `'Fraunces'` | `Georgia, serif` | Bold / Extrabold (`opsz 32`) | `h1, h2, h3`, Hero titles, Brand logomark |
| **Body & UI** | `'Plus Jakarta Sans'` | `-apple-system, sans-serif` | Regular (400), SemiBold (600), Bold (700) | General copy, tables, buttons, form inputs |
| **Telugu Script**| `'Noto Sans Telugu'` | `'Plus Jakarta Sans', sans-serif` | Regular (400), Bold (700) | Telugu bilingual strings (`font-telugu`) |
| **Code / IDs** | `ui-monospace` | `SFMono-Regular, Menlo, Monaco` | Bold (700) | Referral codes, UTR numbers, Lead IDs |

### 2.4 Shadows & Custom Visual Effects

- **Standard Card Shadow**: `box-shadow: 0 10px 30px -5px rgba(18, 16, 31, 0.05), 0 4px 6px -2px rgba(18, 16, 31, 0.03)`
- **Hover Elevation Shadow**: `box-shadow: 0 20px 35px -5px rgba(107, 60, 255, 0.12), 0 8px 10px -4px rgba(18, 16, 31, 0.04)`
- **Violet Glow**: `0 0 25px rgba(107, 60, 255, 0.25)`
- **Lime Glow**: `0 0 25px rgba(214, 243, 107, 0.35)`
- **Glassmorphism Panel**: `background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid var(--sbloom-border);`
- **Radial Dot Grid**: `radial-gradient(rgba(18, 16, 31, 0.06) 1px, transparent 1px)` with `background-size: 24px 24px`
- **Pulsing Indicator**: `@keyframes pulse-ring` active on live API heartbeat status badge

---

## 3. Application Routing & Layout Hierarchy

```
App.tsx (Root Provider Stack: LanguageProvider -> AuthProvider -> BrowserRouter)
│
├── Public & Auth Routes
│   ├── /                 --> LandingPage (Hero, Value Props, Language Toggle, Direct Join)
│   ├── /app/login        --> LoginPage (Credentials, Quick-fill Demo)
│   └── /app/signup       --> SignupPage (Direct Partner Access, Instant Referral ID)
│
├── /app (AffiliateLayout: Desktop Sidebar + TopBar + DemoBanner + Mobile Drawer)
│   ├── /app              --> DashboardPage (Key metrics, referral link, lead table, quick services)
│   ├── /app/services     --> ServicesPage (4 Fixed MVP catalog services, commission calculator)
│   ├── /app/learn        --> LearnPage (Academy guides, pitching decks, South India regional outreach)
│   ├── /app/leads        --> LeadsPage (Lead pipeline, search/filter, LeadDrawer trigger)
│   ├── /app/earnings     --> EarningsPage (Commission ledger, cleared vs pending payouts, TDS notice)
│   ├── /app/invoices     --> InvoicesPage (Monthly statements, UTR references, payout status)
│   ├── /app/profile      --> ProfilePage (Personal data, UPI ID, notification preferences)
│   └── /app/support      --> SupportPage (FAQ accordion, ticket creation form)
│
└── /admin (AdminLayout: Dark Sidebar + Admin TopBar + Simulated Role Banner)
    ├── /admin            --> AdminDashboardPage (Ecosystem volume, 28 partners, 94 leads)
    └── /admin/leads      --> AdminLeadsPage (Cross-affiliate leads, status update modal)
```

---

## 4. Layout Templates & Navigation Specs

### 4.1 AffiliateLayout (`frontend/src/components/layout/AffiliateLayout.tsx`)
- **Structure**: 2-column flex container (`h-screen`, `overflow-hidden`).
- **Sidebar**: Fixed `248px` wide on desktop (`lg:block`), slides into a left Drawer on mobile (`<Drawer position="left">`).
- **Content Area**: Vertical flex container containing:
  1. **TopBar**: Fixed height `h-16`, sticky, backdrop blur (`bg-white/95`).
  2. **Global Demo Banner**: `<DemoDataNotice />` clearly warning users that figures are simulated.
  3. **Telugu Translation Notice**: Displayed conditionally if active language is `'te'` (`గమనిక: తెలుగు అనువాదం ప్రస్తుతం డ్రాఫ్ట్ దశలో ఉంది`).
  4. **Main Scrollable Viewport**: `overflow-y-auto px-4 sm:px-8 py-6`.

### 4.2 AffiliateSidebar (`frontend/src/components/layout/AffiliateSidebar.tsx`)
- **Branding Header**: sBLOOM icon badge (`bg-sbloom-admin` with violet/magenta ambient blur) + `sBLOOM Affiliate Portal` title.
- **Nav Links (8 items)**:
  - Dashboard (`/app`)
  - Services (`/app/services`)
  - Learn (`/app/learn`)
  - My Leads (`/app/leads`)
  - Earnings (`/app/earnings`)
  - Invoices (`/app/invoices`)
  - Profile (`/app/profile`)
  - Support (`/app/support`)
- **Active State**: Solid violet fill (`bg-sbloom-violet text-white shadow-xs`).
- **Inactive State**: Hover surface (`hover:bg-sbloom-surface text-sbloom-text-secondary`).
- **Bottom Partner ID Card**:
  - Displays user's unique referral ID (e.g. `SBLOOM-HARSHI-78`).
  - One-click copy button with clipboard API and 2-second checkmark confirmation (`lucide-react: Check`).
  - Commission rate reminder: *"Attach to customer referrals to auto-credit your 20% commission."*

### 4.3 TopBar (`frontend/src/components/layout/TopBar.tsx`)
- **Left Controls**: Mobile hamburger button (`lg:hidden`), breadcrumb indicator (`Portal / PageName`).
- **Right Controls**:
  1. **Backend Health Badge**: Live ping indicator (`API Live (12ms)` in lime, or `API Offline` in red). Clicking triggers instant health re-check.
  2. **Copy Referral Link CTA**: Quick button copying full URL (`https://portal.sbloom.io/?ref=SBLOOM-HARSHI-78`).
  3. **Role Switcher Pill**: Instant toggle between Affiliate Portal and Admin Console for demonstration.
  4. **Bilingual Switcher (EN / తెలుగు)**: Segmented control toggling UI strings between English and Telugu.
  5. **User Profile Dropdown**: Shows initials avatar, full name, role, and quick links to Profile and Sign Out.

### 4.4 AdminLayout & AdminSidebar (`frontend/src/components/layout/AdminLayout.tsx`)
- Styled in dark theme (`bg-sbloom-admin`, `#0E0B1E`) with neon Lime and Violet accents.
- Dedicated System Administration navigation:
  - System Overview (`/admin`)
  - Lead Management (`/admin/leads`)
- Distinct *"Simulated Admin Role"* top banner to prevent confusion with affiliate view.
- Return to Affiliate Portal quick link.

---

## 5. Screen & Template Catalog

### 5.1 Landing Page (`LandingPage.tsx`)
- **Hero Banner**: High-contrast headline *"Turn Your Audience Into Sustained Revenue"*.
- **Direct Access CTA**: Prominent *"Join Directly"* button leading to immediate signup without waiting lists.
- **Value Cards**: Highlighting 25% recurring commissions, 60-day cookie lifetime, verified enterprise services, and multilingual support.

### 5.2 Registration & Authentication (`SignupPage.tsx` & `LoginPage.tsx`)
- **Direct Affiliate Signup**:
  - Full Name, Email, Phone / WhatsApp (mandatory for Indian payout comms), Password.
  - Partner Promotion Category dropdown (Tech Creators, Agencies, Influencers, BD Freelancers, South India Communities).
  - Terms of Service & Ethics confirmation checkbox.
  - Generates instant partner code without manual waiting list.
- **Login Page**:
  - Direct credentials login.
  - Quick-Fill Demo button for instant testing during presentations.

### 5.3 Affiliate Dashboard (`DashboardPage.tsx`)
- **Top Metrics Row (4 Cards)**:
  - Total Earnings: `₹1,42,500` (cleared to date)
  - Pending Payout: `₹38,000` (scheduled for 10 Nov)
  - Converted Deals: `12` closed client referrals
  - Active Catalog: `4 Services` available for promotion
- **Attribution Link Box**: Displayed with copy button, UTM parameters explanation, and performance tips.
- **Recent Pipeline Table**: Displays the 4 latest submitted leads with real-time status badges and view drawer trigger.
- **Promoted Solutions Grid**: Cards showcasing the 4 core services with commission percentages and direct referral CTA.

### 5.4 Lead Management & Drawer (`LeadsPage.tsx` & `LeadDrawer.tsx`)
- **Leads Table**:
  - Search input filtering by client name, company, service, or lead ID.
  - Status pill filter (`All`, `Pending`, `Contacted`, `Qualified`, `Converted`, `Rejected`).
  - Responsive table showing Reference ID, Client, Company, Service, Estimated Value, Commission Est, Status, and Submission Date.
- **Slide-Over Lead Drawer (`LeadDrawer.tsx`)**:
  - Dual Mode: `create` (new referral) and `view` (inspect lead history).
  - Form Fields:
    - Organization / Business Name
    - Contact Person Name
    - Business Email Address
    - Phone / WhatsApp Number
    - Regional Location (default: `Hyderabad, Telangana`)
    - Industry Sector
    - Target Service Dropdown (connected to live services catalog)
    - Project Scope & Requirements
    - Preferred Meeting Window
    - Partner Consent Checkbox (confirms affiliate had prior conversation)
    - Private Affiliate Notes
  - Full client-side validation with inline error messaging.

### 5.5 Fixed MVP Services Catalog (`ServicesPage.tsx`)
Four enterprise AI & automation services pre-configured for launch:

| Service ID | Service Name | Commission Rate | Average Earnings | Attribution Window |
| :--- | :--- | :--- | :--- | :--- |
| `srv-agentic-pipeline` | **Enterprise Agentic AI Pipeline** | 25% | ₹45,000 / deal | 60 days |
| `srv-workflow-automation` | **Autonomous Workflow Automation** | 20% | ₹18,500 / deal | 45 days |
| `srv-creator-funnel` | **Omnichannel Creator Funnel Suite**| 15% | ₹12,000 / deal | 30 days |
| `srv-data-intelligence` | **Creator Data Intelligence Engine** | 20% | ₹22,000 / deal | 60 days |

Each card provides:
- Target audience tags.
- 3 key selling bullet points.
- 1-click client referral button pre-populating `LeadDrawer`.
- Direct link copy button with UTM tags.

### 5.6 Financials: Earnings & Invoices (`EarningsPage.tsx` & `InvoicesPage.tsx`)
- **Earnings Page**:
  - Breakdown of Cleared vs Pending payout balances.
  - Next settlement date indicator (`10 Nov 2026`).
  - TDS tax compliance disclaimer (Section 194H of Indian Income Tax Act).
  - Commission ledger with individual deal credits and conversion timestamps.
- **Invoices Page**:
  - Monthly tax invoices & disbursement receipts.
  - Payment rails: Direct Bank Transfer (NEFT) & UPI.
  - Reference numbers (UTR banking references).

### 5.7 Enablement: Academy & Support (`LearnPage.tsx` & `SupportPage.tsx`)
- **Learn Academy**:
  - Guides on enterprise pitching, objection handling, and regional creator outreach in South India.
  - Downloadable talk tracks and deck summaries.
- **Support & Help Center**:
  - Interactive accordion FAQ addressing cookie lifetimes, payment schedules, and attribution rules.
  - Support Ticket Submission Drawer with priority levels and instant feedback.

### 5.8 Admin Operations (`AdminDashboardPage.tsx` & `AdminLeadsPage.tsx`)
- Ecosystem pipeline overview: 28 active partners, 94 leads, ₹34,80,000 volume.
- Admin lead management table with partner attribution tags.
- Status transition modal dialog enabling operators to advance lead stages (`Pending` -> `Contacted` -> `Qualified` -> `Converted` -> `Rejected`).

---

## 6. Reusable UI Component Library (`frontend/src/components/ui/`)

| Component | File Path | Key Props | Description |
| :--- | :--- | :--- | :--- |
| **Button** | `ui/Button.tsx` | `variant`, `size`, `isLoading`, `leftIcon`, `rightIcon` | 6 styling variants (`primary`, `secondary`, `outline`, `ghost`, `lime`, `danger`), 3 sizes, accessible focus rings. |
| **Card** | `ui/Card.tsx` | `variant`, `hoverable`, `padding` | Container component with `canvas`, `surface`, `dark`, or `outline` presets and optional lift-on-hover. |
| **Table** | `ui/Table.tsx` | `columns`, `data`, `keyExtractor`, `emptyMessage`, `onRowClick` | Generic TypeScript `<T>` data table with empty state illustration and custom column render callbacks. |
| **StatusBadge** | `ui/StatusBadge.tsx` | `status`, `size` | Standardized pill with colored indicator dot and semantic background colors. |
| **Drawer** | `ui/Drawer.tsx` | `isOpen`, `onClose`, `title`, `position`, `width` | Slide-over drawer with backdrop blur, smooth CSS transform, and keyboard ESC dismiss. |
| **Modal** | `ui/Modal.tsx` | `isOpen`, `onClose`, `title`, `children`, `footer` | Centered modal dialog with accessible trap; includes `ConfirmationDialog` helper. |
| **Input** | `ui/Input.tsx` | `label`, `error`, `helperText`, `leftIcon`, `rightIcon` | Text input with animated focus border, floating label, and inline error styling. |
| **Select** | `ui/Select.tsx` | `label`, `error`, `options` (`{value, label}`) | Dropdown select matching design token styling. |
| **Textarea** | `ui/Textarea.tsx` | `label`, `error`, `rows` | Multi-line text field for requirements and notes. |
| **DemoDataNotice**| `ui/DemoDataNotice.tsx`| `compact?: boolean` | Prominent amber notice clarifying simulated sample data. |
| **ComingSoonState**| `ui/ComingSoonState.tsx`| `title`, `description`, `eta` | Empty state placeholder for deferred MVP features. |

---

## 7. Bilingual Localization Architecture (English + Telugu)

- **Context Provider**: `LanguageContext.tsx` wraps the entire application.
- **Dictionary**: `frontend/src/data/translations.ts` contains synchronized key-value pairs for all major UI strings.
- **Draft Status Indicator**:
  - Because Telugu translations are currently in draft status awaiting formal linguistic review, the application automatically displays a `Draft Telugu UI` badge whenever Telugu is selected.
  - Telugu typography uses `'Noto Sans Telugu'` font stack for proper conjunct character rendering.

---

## 8. State Management & API Integration Layer

### 8.1 AuthContext (`frontend/src/context/AuthContext.tsx`)
- Manages authenticated user state:
  ```typescript
  export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: 'affiliate' | 'admin';
    referralCode: string;
    phone: string;
    category: string;
    joinedDate: string;
    payoutUpi?: string;
    notificationWhatsapp: boolean;
    notificationEmail: boolean;
  }
  ```
- Persists user preferences to `localStorage` (`sbloom_active_user`).
- Maintains live backend heartbeat with latency recording.
- Exposes: `login()`, `registerDemo()`, `logout()`, `toggleRole()`, `updateProfile()`, `checkConnection()`.

### 8.2 Central API Client (`frontend/src/services/api.ts`)
- Communicates with FastAPI backend configured via `VITE_API_BASE_URL` (`http://localhost:8000`).
- Core endpoints integrated:
  - `GET /health`: Server health & database readiness.
  - `POST /api/v1/affiliates/register-demo`: Direct partner registration.
  - `GET /api/v1/affiliates/me`: Fetch active affiliate profile.
  - `PATCH /api/v1/affiliates/me`: Update profile & UPI details.
  - `POST /api/v1/leads`: Submit new client lead attribution.
  - `GET /api/v1/leads`: Fetch affiliate's leads with limit & pagination.
  - `GET /api/v1/services`: Fetch fixed catalog services.

---

## 9. Demo Data Isolation & Production Transition Plan

### 9.1 Demo Data Isolation Principles
1. **Explicit Flag**: All sample records contain `isDemoSample: true` (or `is_demo_sample = TRUE` in database schema).
2. **Visual Marking**: The amber `<DemoDataNotice />` banner is rendered in the global layout and above data tables.
3. **No Financial Pollution**: Backend validation ensures records flagged with `is_demo_sample = true` are excluded from real financial payout calculations.

### 9.2 Supabase Migration Readiness
- **Database Schema Designed**: 8 relational tables (`profiles`, `services`, `leads`, `lead_services`, `lead_status_history`, `commissions`, `invoices`, `invoice_commissions`).
- **Row-Level Security (RLS)**: Affiliate isolation policies ensure affiliates can only view and insert records matching their own `auth.uid()`.
- **Frontend Switch**: Once Supabase Auth is activated, `AuthContext` will exchange email/password with `supabase.auth.signInWithPassword()` and attach the Bearer JWT token to `apiClient` requests.

---

## 10. Summary Checklist for Frontend Review

- [x] Responsive layout verified across Desktop (1920px, 1440px), Laptop (1024px), Tablet (768px), and Mobile (375px).
- [x] Zero blank-screen ESM import errors (all TypeScript types imported via `import type`).
- [x] Bilingual toggle functioning seamlessly between English and Telugu.
- [x] Live backend connectivity badge verified with millisecond latency ping.
- [x] Partner referral code 1-click clipboard copy functional.
- [x] Lead submission drawer fully validated with required fields and error messages.
- [x] Demo data notices visible across all sensitive financial and pipeline views.
- [x] Admin console switchable for operational review without session conflicts.
