from typing import Optional
from fastapi import APIRouter, Query
from app.schemas.service import ServiceListResponse, ClientListResponse
from app.services.service_catalog import get_all_services_with_clients
from app.services.client_catalog import (
    get_all_clients,
    get_clients_by_category,
    get_clients_by_service,
    VALID_CATEGORIES,
)

router = APIRouter()


@router.get(
    "",
    response_model=ServiceListResponse,
    summary="List Promotional Services",
    description="Returns the catalog of sBLOOM services available for affiliate promotion, with commission rates, categories, and verified client businesses.",
)
def list_services() -> ServiceListResponse:
    """Retrieve sBLOOM service catalog for affiliate promotion."""
    services = get_all_services_with_clients()
    return ServiceListResponse(
        total=len(services),
        categories=VALID_CATEGORIES,
        services=services,
    )


@router.get(
    "/clients",
    response_model=ClientListResponse,
    summary="List Verified Client Businesses",
    description="Returns verified client and business references across Healthcare, Education, and Professional Services.",
)
def list_clients(
    category: Optional[str] = Query(None, description="Filter by category (Healthcare, Education, Professional Services)"),
    service_id: Optional[str] = Query(None, description="Filter by related service ID"),
) -> ClientListResponse:
    """Retrieve verified client businesses with website URLs."""
    if service_id:
        clients = get_clients_by_service(service_id)
    elif category:
        clients = get_clients_by_category(category)
    else:
        clients = get_all_clients()

    return ClientListResponse(
        total=len(clients),
        categories=VALID_CATEGORIES,
        clients=clients,
    )

