from typing import List, Optional
from pydantic import BaseModel, Field


class VerifiedClientBusiness(BaseModel):
    """Schema for a verified client or business reference in the catalog."""

    id: str = Field(..., description="Unique client identifier (e.g. client-001)")
    name: str = Field(..., description="Client or business name")
    category: str = Field(..., description="Healthcare, Education, or Professional Services")
    service_id: str = Field(..., description="Related service identifier (e.g. srv-whatsapp-automation)")
    service_name: Optional[str] = Field(None, description="Related service display name")
    website_url: Optional[str] = Field(None, description="Verified business website URL")
    location: Optional[str] = Field(None, description="City / Regional location")
    verified: bool = Field(True, description="Whether the business record and URL are verified")
    source: Optional[str] = Field("Excel workbook source", description="Data provenance note")
    notes: Optional[str] = Field(None, description="Publicly available service notes")


class ServiceItem(BaseModel):
    """Schema for a service offering available for partner promotion."""

    id: str = Field(..., description="Unique service identifier (e.g. srv-whatsapp-automation)")
    name: str = Field(..., description="Service display title")
    category: str = Field(..., description="Market category (Healthcare, Education, Professional Services)")
    tagline: str = Field(..., description="One-line elevator pitch")
    commission_rate: str = Field(..., description="Affiliate commission percentage (e.g. To be confirmed)")
    avg_commission: str = Field(..., description="Average payout per closed client (e.g. Variable per client scope)")
    cookie_duration: str = Field(..., description="Attribution cookie lifetime (e.g. 60 days)")
    description: str = Field(..., description="Detailed value proposition")
    features: List[str] = Field(default_factory=list, description="Key capability bullets")
    clients: List[VerifiedClientBusiness] = Field(default_factory=list, description="Verified client references")


class ServiceListResponse(BaseModel):
    """Response schema for service catalog."""

    total: int
    categories: List[str] = Field(default_factory=list)
    services: List[ServiceItem]


class ClientListResponse(BaseModel):
    """Response schema for verified client business catalog."""

    total: int
    categories: List[str] = Field(default_factory=list)
    clients: List[VerifiedClientBusiness]

