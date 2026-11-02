from fastapi import APIRouter
from app.api.v1.endpoints import health, affiliates, leads, services

api_router = APIRouter()

# Mount health diagnostics
api_router.include_router(health.router, tags=["Health"])

# Mount affiliate management endpoints
api_router.include_router(affiliates.router, prefix="/affiliates", tags=["Affiliates"])

# Mount lead submission and auditing endpoints
api_router.include_router(leads.router, prefix="/leads", tags=["Leads"])

# Mount promotional service catalog
api_router.include_router(services.router, prefix="/services", tags=["Services"])
