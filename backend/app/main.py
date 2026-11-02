from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.api.v1.api import api_router
from app.api.v1.endpoints.health import get_health


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan context for startup and shutdown routines."""
    print(f"[STARTUP] {settings.PROJECT_NAME} (v{settings.VERSION}) starting on {settings.HOST}:{settings.PORT}")
    print(f"[CORS] Allowed origins: {settings.BACKEND_CORS_ORIGINS}")
    yield
    print(f"[SHUTDOWN] {settings.PROJECT_NAME} shutting down gracefully")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend API foundation for the sBLOOM Affiliate Portal.",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Set up Cross-Origin Resource Sharing (CORS)
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin).rstrip("/") for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include v1 API router (e.g. /api/v1/health)
app.include_router(api_router, prefix=settings.API_V1_STR)

# Top-level /health endpoint alias for convenience
@app.get("/health", tags=["Health"], summary="Top-level Health Check Alias")
def top_level_health():
    """Top-level health endpoint alias to /api/v1/health."""
    return get_health()


# Welcome endpoint at root
@app.get("/", tags=["Root"])
def root_info():
    """Returns portal backend metadata and quick documentation links."""
    return JSONResponse(
        content={
            "app": settings.PROJECT_NAME,
            "status": "online",
            "version": settings.VERSION,
            "docs_url": "/docs",
            "health_check_url": f"{settings.API_V1_STR}/health",
            "phase": "Foundation Phase (Database deferred to Phase 2)",
            "brand": "sBLOOM Affiliate Portal",
        }
    )
