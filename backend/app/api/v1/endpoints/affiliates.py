from typing import Optional
from fastapi import APIRouter, Header, status
from app.schemas.affiliate import (
    AffiliateRegisterRequest,
    AffiliateUpdateRequest,
    AffiliateResponse,
)
from app.services.affiliate_service import (
    register_demo_affiliate,
    get_current_demo_affiliate,
    update_demo_affiliate,
)

router = APIRouter()


@router.post(
    "/register-demo",
    response_model=AffiliateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register Demo Affiliate",
    description=(
        "Registers an affiliate in temporary in-memory demo storage. "
        "No passwords are stored in plain text (salted PBKDF2 hash used). "
        "Assigns an active referral code immediately without manual approval waiting queues."
    ),
)
def register_affiliate(data: AffiliateRegisterRequest) -> AffiliateResponse:
    """Create a new demo affiliate partner with an active referral code."""
    return register_demo_affiliate(data)


@router.get(
    "/me",
    response_model=AffiliateResponse,
    summary="Get Current Affiliate Profile",
    description=(
        "Returns the active demo affiliate profile. "
        "Optionally provide 'X-Affiliate-Id' header to select a specific registered partner; "
        "otherwise defaults to the active demo partner profile."
    ),
)
def get_my_profile(
    x_affiliate_id: Optional[str] = Header(None, alias="X-Affiliate-Id", description="Optional demo affiliate ID or referral code"),
) -> AffiliateResponse:
    """Retrieve current demo affiliate partner data."""
    return get_current_demo_affiliate(x_affiliate_id)


@router.patch(
    "/me",
    response_model=AffiliateResponse,
    summary="Update Affiliate Profile",
    description="Updates in-memory affiliate profile information, notification preferences, or demo UPI payout details.",
)
def update_my_profile(
    updates: AffiliateUpdateRequest,
    x_affiliate_id: Optional[str] = Header(None, alias="X-Affiliate-Id"),
) -> AffiliateResponse:
    """Update active demo affiliate settings."""
    return update_demo_affiliate(updates, x_affiliate_id)
