from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.api.v1.api import api_router
from app.api.v1.endpoints.health import get_health


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan context for server startup and shutdown."""
    print(f"[STARTUP] {settings.PROJECT_NAME} (v{settings.VERSION}) starting on {settings.HOST}:{settings.PORT}")
    print(f"[CORS] Allowed local frontend origins: {settings.BACKEND_CORS_ORIGINS}")
    print("[STORAGE] In-Memory Demo Storage active. Data resets on server restart.")
    yield
    print(f"[SHUTDOWN] {settings.PROJECT_NAME} shutting down gracefully")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=(
        "Backend API foundation for the sBLOOM Affiliate Portal.\n\n"
        "### Architecture & Demo Limitations:\n"
        "- **In-Memory Storage**: Current endpoints operate on temporary in-memory collections.\n"
        "- **Database Deferred**: Supabase integration is scheduled for Phase 2.\n"
        "- **Password Handling**: Passwords are salted and hashed (PBKDF2-SHA256), never stored in plain text.\n"
        "- **Local CORS**: Restricted to local frontend origins (`http://localhost:5173`, `http://127.0.0.1:5173`)."
    ),
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS Middleware restricted strictly to local frontend origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin).rstrip("/") for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["*"],
    )

# Include v1 API router (/api/v1/...)
app.include_router(api_router, prefix=settings.API_V1_STR)


# Top-level GET /health endpoint requested
@app.get("/health", tags=["Health"], summary="Top-Level Health Check Endpoint")
def root_health():
    """Top-level health check endpoint."""
    return get_health()


# Welcome endpoint at root
@app.get("/", tags=["Root"])
def root_info():
    """Root metadata and documentation navigation."""
    return JSONResponse(
        content={
            "app": settings.PROJECT_NAME,
            "status": "online",
            "version": settings.VERSION,
            "docs_url": "/docs",
            "health_endpoint": "/health",
            "api_v1_endpoints": {
                "health": f"{settings.API_V1_STR}/health",
                "affiliates_register_demo": f"{settings.API_V1_STR}/affiliates/register-demo",
                "affiliates_me": f"{settings.API_V1_STR}/affiliates/me",
                "leads": f"{settings.API_V1_STR}/leads",
                "services": f"{settings.API_V1_STR}/services",
            },
            "storage_mode": settings.STORAGE_MODE,
            "database_connected": settings.DATABASE_CONNECTED,
        }
    )
