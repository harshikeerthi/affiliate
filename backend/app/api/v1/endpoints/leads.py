from typing import Optional
from fastapi import APIRouter, Query, status
from app.schemas.lead import (
    LeadCreateRequest,
    LeadResponse,
    LeadListResponse,
)
from app.services.lead_service import (
    create_lead,
    get_leads,
    get_lead_by_id,
)

router = APIRouter()


@router.post(
    "",
    response_model=LeadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create New Referral Lead",
    description=(
        "Submits a new business lead referred by an affiliate. "
        "Validates all required fields, verifies consent, generates a formatted reference number "
        "(e.g. SBL-202611-ABCD), and calculates estimated contract value and affiliate commission."
    ),
)
def submit_lead(lead_in: LeadCreateRequest) -> LeadResponse:
    """Submit a client referral lead."""
    return create_lead(lead_in)


@router.get(
    "",
    response_model=LeadListResponse,
    summary="List Referral Leads",
    description="Returns filtered and paginated referral leads stored in demo memory.",
)
def list_leads(
    status: Optional[str] = Query(None, description="Filter by status (Pending, Contacted, Qualified, Converted, Rejected)"),
    sector: Optional[str] = Query(None, description="Filter by sector (e.g. Technology & Enterprise SaaS)"),
    affiliate_code: Optional[str] = Query(None, description="Filter by affiliate referral code"),
    search: Optional[str] = Query(None, description="Search by client name, company, or reference number"),
    skip: int = Query(0, ge=0, description="Pagination offset"),
    limit: int = Query(50, ge=1, le=100, description="Pagination page size"),
) -> LeadListResponse:
    """List customer referral leads."""
    return get_leads(
        status_filter=status,
        sector_filter=sector,
        affiliate_code=affiliate_code,
        search=search,
        skip=skip,
        limit=limit,
    )


@router.get(
    "/{lead_id}",
    response_model=LeadResponse,
    summary="Get Lead by ID or Reference Number",
    description="Retrieves a single lead record using its internal ID (e.g. 'lead-9041') or reference number (e.g. 'SBL-202610-9041').",
)
def get_lead(lead_id: str) -> LeadResponse:
    """Retrieve lead details by reference."""
    return get_lead_by_id(lead_id)
