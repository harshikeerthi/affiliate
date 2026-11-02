from datetime import datetime, timezone
import time
from typing import Dict, Any, List
from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.core.config import settings

router = APIRouter()

# Record backend startup timestamp
START_TIME = time.time()


class DatabaseInfo(BaseModel):
    connected: bool = Field(False, description="Whether the database is currently connected")
    provider: str = Field("Supabase (Scheduled for Phase 2)", description="Planned database provider")
    status_note: str = Field(
        "Database integration will be connected in Phase 2. Foundation phase runs mock-ready.",
        description="Notice on database status",
    )


class HealthResponse(BaseModel):
    status: str = Field("healthy", description="Overall health status of the service")
    service: str = Field(..., description="Service identifier")
    version: str = Field(..., description="Application version")
    environment: str = Field(..., description="Deployment environment")
    timestamp: str = Field(..., description="Current UTC timestamp (ISO 8601)")
    uptime_seconds: float = Field(..., description="Uptime duration in seconds")
    database: DatabaseInfo = Field(..., description="Database connection status metadata")
    modules_ready: List[str] = Field(..., description="List of initialized architectural modules")
    message: str = Field(..., description="Human-readable status summary")


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health and Readiness Check",
    description="Returns detailed health diagnostics, uptime, and foundation readiness for sBLOOM Affiliate Portal.",
)
def get_health() -> Dict[str, Any]:
    """
    Check if the sBLOOM backend service is running and responsive.
    This endpoint is polled by the frontend portal to display live connectivity.
    """
    now = datetime.now(timezone.utc).isoformat()
    uptime = round(time.time() - START_TIME, 2)

    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "timestamp": now,
        "uptime_seconds": uptime,
        "database": {
            "connected": False,
            "provider": "Supabase (Scheduled for Phase 2)",
            "status_note": "Database integration will be connected in Phase 2. Foundation phase runs mock-ready.",
        },
        "modules_ready": [
            "FastAPI Core Engine",
            "CORS Middleware Configuration",
            "API v1 Routing Architecture",
            "Pydantic v2 Environment Schemas",
            "Health Diagnostics Telemetry",
        ],
        "message": "sBLOOM Affiliate Portal backend is online and operational.",
    }
