from typing import List
from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    """Schema for health and diagnostic telemetry."""

    status: str = Field("healthy", description="Service health status")
    service: str = Field(..., description="Service name")
    version: str = Field(..., description="Application version")
    environment: str = Field(..., description="Active runtime environment")
    timestamp: str = Field(..., description="ISO 8601 UTC timestamp")
    uptime_seconds: float = Field(..., description="Seconds since process startup")
    storage_mode: str = Field("in_memory_temporary", description="Current storage backend")
    database_connected: bool = Field(False, description="Whether persistent database is connected")
    storage_notice: str = Field(
        "DEMO IN-MEMORY STORAGE: In-memory store active. Data resets on server restart. Database integration deferred to Phase 2.",
        description="Notice explaining storage limitations",
    )
    modules_ready: List[str] = Field(
        default_factory=list,
        description="List of initialized backend core modules and engines",
    )
    message: str = Field(..., description="Human-readable status summary")

