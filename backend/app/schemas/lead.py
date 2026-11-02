from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field, field_validator


class LeadCreateRequest(BaseModel):
    """Schema for creating a new business referral lead."""

    business_name: str = Field(
        ...,
        min_length=2,
        max_length=150,
        description="Business or organization legal/brand name",
        examples=["Apex Cloud Solutions Pvt Ltd"],
    )
    contact_name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Primary contact person name",
        examples=["Vikramaditya Sharma"],
    )
    email: EmailStr = Field(
        ...,
        description="Business email address for communication",
        examples=["vikram@apexcloud.in"],
    )
    phone: str = Field(
        ...,
        min_length=8,
        max_length=25,
        description="Phone or WhatsApp number with country code",
        examples=["+91 98450 11223"],
    )
    location: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="City or region of the organization",
        examples=["Hyderabad, Telangana, India"],
    )
    sector: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Industry or market sector",
        examples=["Technology & Enterprise SaaS"],
    )
    services_of_interest: List[str] = Field(
        ...,
        min_items=1,
        description="One or more service IDs from the sBLOOM catalog",
        examples=[["srv-agentic-pipeline"]],
    )
    business_requirements: str = Field(
        ...,
        min_length=10,
        max_length=2000,
        description="Summary of project goals, team size, or pain points",
        examples=["Looking to automate L1/L2 customer support using fine-tuned agent workflows."],
    )
    preferred_meeting_datetime: Optional[str] = Field(
        None,
        description="Optional preferred meeting date and time (ISO format or formatted string)",
        examples=["2026-11-15T14:30:00+05:30"],
    )
    timezone: str = Field(
        "Asia/Kolkata",
        max_length=50,
        description="Timezone for scheduling",
        examples=["Asia/Kolkata"],
    )
    consent: bool = Field(
        ...,
        description="Explicit consent from the client to process their contact details",
    )
    affiliate_code: Optional[str] = Field(
        None,
        max_length=50,
        description="Attributed affiliate referral code",
        examples=["SBLOOM-HARSHI-78"],
    )
    notes: Optional[str] = Field(
        None,
        max_length=1000,
        description="Optional internal notes by the affiliate",
    )

    @field_validator("consent")
    def validate_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Explicit consent is required to process and refer client contact information.")
        return v

    @field_validator("services_of_interest")
    def validate_services(cls, v: List[str]) -> List[str]:
        cleaned = [s.strip() for s in v if s.strip()]
        if not cleaned:
            raise ValueError("At least one service of interest must be selected.")
        return cleaned


class LeadResponse(BaseModel):
    """Schema for lead details returned by the API."""

    id: str = Field(..., description="Internal demo lead identifier")
    reference_number: str = Field(..., description="Unique generated reference code (e.g. SBL-202611-A8F2)")
    business_name: str
    contact_name: str
    email: EmailStr
    phone: str
    location: str
    sector: str
    services_of_interest: List[str]
    business_requirements: str
    preferred_meeting_datetime: Optional[str]
    timezone: str
    consent: bool
    status: str = Field("Pending", description="Lifecycle status: Pending, Contacted, Qualified, Converted, Rejected")
    estimated_value: str = Field(..., description="Estimated contract value")
    estimated_commission: str = Field(..., description="Calculated affiliate commission")
    affiliate_code: Optional[str]
    notes: Optional[str]
    created_at: str
    is_demo_sample: bool = Field(True, description="Flag indicating simulated demonstration data")


class LeadListResponse(BaseModel):
    """Schema for paginated/filtered list of leads."""

    total: int
    skip: int
    limit: int
    leads: List[LeadResponse]
    disclaimer: str = Field(
        "DEMO DATA: In-memory lead records for demonstration purposes only. Not connected to real financial contracts.",
        description="Notice on demo data nature",
    )
