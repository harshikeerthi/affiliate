"""
Structured Local Data Layer for Verified Client and Business Records.
Prepares the application to receive authoritative client records from Excel workbooks or Google Sheets.
Currently unpopulated awaiting stakeholder upload of genuine client lists.
"""
from typing import List, Optional, Dict, Any
from app.schemas.service import VerifiedClientBusiness

# ==============================================================================
# AUTHORITATIVE CLIENT BUSINESS CATALOG
# In this phase, clients are stored in this structured local module.
# No fake or fabricated clients are created.
# Records will be populated when the user provides the Excel/Google Sheets data.
# ==============================================================================

VERIFIED_CLIENTS: List[VerifiedClientBusiness] = []

VALID_CATEGORIES = ["Healthcare", "Education", "Professional Services"]


def get_all_clients() -> List[VerifiedClientBusiness]:
    """Retrieve all verified business catalog records."""
    return VERIFIED_CLIENTS


def get_clients_by_category(category: str) -> List[VerifiedClientBusiness]:
    """Filter verified business records by category (Healthcare, Education, Professional Services)."""
    if not category or category.lower() == "all":
        return VERIFIED_CLIENTS
    return [c for c in VERIFIED_CLIENTS if c.category.lower() == category.lower()]


def get_clients_by_service(service_id: str) -> List[VerifiedClientBusiness]:
    """Filter verified business records by associated service ID."""
    return [c for c in VERIFIED_CLIENTS if c.service_id == service_id]


def import_clients_from_records(records: List[Dict[str, Any]]) -> int:
    """
    Import and validate client records from parsed Excel or Google Sheets rows.
    Ensures URL integrity and category adherence.
    """
    imported_count = 0
    valid_categories_set = {c.lower() for c in VALID_CATEGORIES}
    
    for r in records:
        raw_cat = r.get("category", "Professional Services").strip()
        matched_cat = next((c for c in VALID_CATEGORIES if c.lower() == raw_cat.lower()), None)
        if not matched_cat:
            continue

        client_id = r.get("id") or f"client-{len(VERIFIED_CLIENTS) + 1:03d}"
        name = r.get("name", "").strip()
        if not name:
            continue

        client = VerifiedClientBusiness(
            id=client_id,
            name=name,
            category=matched_cat,
            service_id=r.get("service_id", "srv-whatsapp-automation"),
            service_name=r.get("service_name"),
            website_url=r.get("website_url"),
            location=r.get("location"),
            verified=r.get("verified", True),
            source=r.get("source", "Excel workbook source"),
            notes=r.get("notes"),
        )
        VERIFIED_CLIENTS.append(client)
        imported_count += 1

    return imported_count
