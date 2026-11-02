from datetime import datetime, timezone
import time
from fastapi import APIRouter
from app.core.config import settings
from app.schemas.health import HealthResponse

router = APIRouter()

START_TIME = time.time()


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health and Diagnostics Telemetry",
    description="Returns backend uptime, environment, in-memory storage mode, and Phase 2 database disclaimer.",
)
def get_health() -> HealthResponse:
    """Check service health and in-memory demo status."""
    now = datetime.now(timezone.utc).isoformat()
    uptime = round(time.time() - START_TIME, 2)

    return HealthResponse(
        status="healthy",
        service=settings.PROJECT_NAME,
        version=settings.VERSION,
        environment=settings.ENVIRONMENT,
        timestamp=now,
        uptime_seconds=uptime,
        storage_mode=settings.STORAGE_MODE,
        database_connected=settings.DATABASE_CONNECTED,
        storage_notice="DEMO IN-MEMORY STORAGE: All state is kept in memory and resets on server restart. No real database (Supabase) is connected in this phase.",
        modules_ready=[
            "FastAPI Core Engine",
            "Affiliate Management API",
            "Leads Referral Pipeline",
            "Services & Commission Catalog",
            "In-Memory Session Store",
            "CORS & Security Middleware",
        ],
        message="sBLOOM Affiliate Portal backend is running smoothly in demo mode.",
    )

