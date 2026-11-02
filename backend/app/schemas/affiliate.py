from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator


class AffiliateRegisterRequest(BaseModel):
    """Schema for demo affiliate self-registration."""

    name: str = Field(..., min_length=2, max_length=100, description="Full name or creator brand name")
    email: EmailStr = Field(..., description="Valid contact email address")
    phone: str = Field(..., min_length=8, max_length=20, description="Contact phone or WhatsApp number")
    password: str = Field(..., min_length=6, max_length=100, description="Demo password (hashed with salt, never stored plain)")
    category: str = Field("Tech & Digital Creators", description="Promotion category")
    payout_upi: Optional[str] = Field(None, max_length=100, description="Optional UPI ID for demo payouts")
    consent: bool = Field(..., description="Must agree to affiliate terms and data handling")

    @field_validator("consent")
    def validate_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError("You must agree to the partner terms and ethics guidelines to register.")
        return v


class AffiliateUpdateRequest(BaseModel):
    """Schema for updating affiliate profile settings."""

    name: Optional[str] = Field(None, min_length=2, max_length=100)
    phone: Optional[str] = Field(None, min_length=8, max_length=20)
    category: Optional[str] = Field(None, max_length=100)
    payout_upi: Optional[str] = Field(None, max_length=100)
    notification_whatsapp: Optional[bool] = None
    notification_email: Optional[bool] = None


class AffiliateResponse(BaseModel):
    """Schema for public affiliate profile data (no credentials exposed)."""

    id: str = Field(..., description="Internal demo affiliate ID")
    name: str = Field(..., description="Full name or creator brand name")
    email: EmailStr = Field(..., description="Partner email address")
    phone: str = Field(..., description="Partner contact phone")
    referral_code: str = Field(..., description="Assigned referral code for attribution tracking")
    category: str = Field(..., description="Promotion category")
    payout_upi: Optional[str] = Field(None, description="Configured payout UPI ID")
    joined_at: str = Field(..., description="Registration timestamp")
    role: str = Field("affiliate", description="Account role")
    notification_whatsapp: bool = Field(True, description="WhatsApp deal notifications")
    notification_email: bool = Field(True, description="Email invoice notifications")
    disclaimer: str = Field(
        "DEMO ACCOUNT: In-memory demonstration profile. No real financial credentials or transactions stored.",
        description="Demo account limitation note",
    )
