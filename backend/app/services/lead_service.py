import uuid
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any
from fastapi import HTTPException, status

from app.schemas.lead import (
    LeadCreateRequest,
    LeadResponse,
    LeadListResponse,
)
from app.services.storage import store
from app.services.service_catalog import calculate_commission_for_services


def _generate_reference_number() -> str:
    """Generates a human-readable, unique lead reference number (e.g. SBL-202611-9F3B)."""
    now = datetime.now(timezone.utc)
    year_month = now.strftime("%Y%m")
    unique_suffix = uuid.uuid4().hex[:4].upper()
    return f"SBL-{year_month}-{unique_suffix}"


def create_lead(lead_in: LeadCreateRequest) -> LeadResponse:
    """
    Validates and stores a new referral lead in memory.
    Calculates estimated commission and assigns a unique reference number.
    """
    with store._lock:
        lead_id = f"lead-{uuid.uuid4().hex[:8]}"
        reference_number = _generate_reference_number()
        created_at = datetime.now(timezone.utc).isoformat()

        # Calculate estimated contract value & affiliate commission
        estimated_val, estimated_comm = calculate_commission_for_services(
            lead_in.services_of_interest
        )

        lead_data: Dict[str, Any] = {
            "id": lead_id,
            "reference_number": reference_number,
            "business_name": lead_in.business_name,
            "contact_name": lead_in.contact_name,
            "email": str(lead_in.email),
            "phone": lead_in.phone,
            "location": lead_in.location,
            "sector": lead_in.sector,
            "services_of_interest": lead_in.services_of_interest,
            "business_requirements": lead_in.business_requirements,
            "preferred_meeting_datetime": lead_in.preferred_meeting_datetime,
            "timezone": lead_in.timezone,
            "consent": lead_in.consent,
            "status": "Pending",
            "estimated_value": estimated_val,
            "estimated_commission": estimated_comm,
            "affiliate_code": lead_in.affiliate_code or "SBLOOM-HARSHI-78",
            "notes": lead_in.notes or "",
            "created_at": created_at,
            "is_demo_sample": True,
        }

        store.leads[lead_id] = lead_data

    return LeadResponse(**lead_data)


def get_leads(
    status_filter: Optional[str] = None,
    sector_filter: Optional[str] = None,
    affiliate_code: Optional[str] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
) -> LeadListResponse:
    """Retrieves paginated and filtered list of leads from in-memory storage."""
    with store._lock:
        all_leads = list(store.leads.values())

    # Sort newest first
    all_leads.sort(key=lambda x: x.get("created_at", ""), reverse=True)

    filtered = []
    search_lower = search.lower().strip() if search else None

    for item in all_leads:
        if status_filter and status_filter.lower() != "all":
            if item.get("status", "").lower() != status_filter.lower():
                continue

        if sector_filter and sector_filter.lower() != "all":
            if item.get("sector", "").lower() != sector_filter.lower():
                continue

        if affiliate_code:
            if item.get("affiliate_code", "").lower() != affiliate_code.lower():
                continue

        if search_lower:
            name_match = search_lower in item.get("business_name", "").lower()
            contact_match = search_lower in item.get("contact_name", "").lower()
            ref_match = search_lower in item.get("reference_number", "").lower()
            id_match = search_lower in item.get("id", "").lower()
            if not (name_match or contact_match or ref_match or id_match):
                continue

        filtered.append(item)

    total = len(filtered)
    paginated = filtered[skip : skip + limit]

    return LeadListResponse(
        total=total,
        skip=skip,
        limit=limit,
        leads=[LeadResponse(**l) for l in paginated],
    )


def get_lead_by_id(lead_id: str) -> LeadResponse:
    """
    Finds a lead by internal ID (e.g. 'lead-9041') or reference number (e.g. 'SBL-202610-9041').
    Raises 404 if not found.
    """
    with store._lock:
        # Check direct ID match
        if lead_id in store.leads:
            return LeadResponse(**store.leads[lead_id])

        # Check reference number match or case-insensitive match
        for item in store.leads.values():
            if item.get("reference_number", "").lower() == lead_id.lower() or item.get("id", "").lower() == lead_id.lower():
                return LeadResponse(**item)

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Lead with ID or reference number '{lead_id}' was not found in demo storage.",
    )
