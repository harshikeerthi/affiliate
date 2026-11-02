import threading
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone

# ==============================================================================
# IN-MEMORY STORAGE LIMITATIONS & ARCHITECTURAL NOTE:
# ------------------------------------------------------------------------------
# 1. TEMPORARY DEMO ONLY: All collections reside strictly in Python process RAM.
# 2. VOLATILITY: When the Uvicorn process restarts or stops, all newly registered
#    affiliates and submitted leads will be cleared and re-seeded to initial defaults.
# 3. CONCURRENCY: A threading.Lock is used to ensure basic thread safety in single-
#    process dev mode, but this does NOT support multi-worker clustering or horizontal scaling.
# 4. FUTURE MIGRATION: In Phase 2, this layer will be replaced with Supabase /
#    PostgreSQL with SQLAlchemy ORM and Alembic migrations.
# ==============================================================================

class InMemoryStore:
    """Thread-safe in-memory store for demo affiliates and leads."""

    def __init__(self):
        self._lock = threading.Lock()
        self.affiliates: Dict[str, Dict[str, Any]] = {}
        self.leads: Dict[str, Dict[str, Any]] = {}
        self._seed_initial_data()

    def _seed_initial_data(self):
        """Seed initial realistic demonstration data."""
        # Seed default demo affiliate
        default_affiliate = {
            "id": "aff-demo-01",
            "name": "Harshitha Rao",
            "email": "harshitha.partner@sbloom.demo",
            "phone": "+91 98765 43210",
            "referral_code": "SBLOOM-HARSHI-78",
            "category": "Tech & Digital Creators",
            "payout_upi": "harshitha@oksbi",
            "joined_at": "2026-10-15T10:00:00Z",
            "role": "affiliate",
            "notification_whatsapp": True,
            "notification_email": True,
            "password_hash": "dummy_demo_salt:dummy_demo_hash",
        }
        self.affiliates[default_affiliate["id"]] = default_affiliate

        # Under Master Prompt rules: No fabricated leads.
        # Genuine leads will be added dynamically when submitted by affiliates.
        self.leads = {}



# Singleton in-memory storage instance
store = InMemoryStore()
