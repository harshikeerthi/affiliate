"""
sBLOOM Affiliate Portal - Local Backend Runner
Run this script to start the FastAPI server with live reloading:
    python run.py
"""
import sys
import os

# Add the directory containing run.py to sys.path so 'app' is importable
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

import uvicorn
from app.core.config import settings

if __name__ == "__main__":
    print(f"[START] Starting {settings.PROJECT_NAME}...")
    print(f"[DOCS] Swagger Docs available at: http://{settings.HOST}:{settings.PORT}/docs")
    print(f"[HEALTH] Health endpoint: http://{settings.HOST}:{settings.PORT}/api/v1/health")
    
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.RELOAD,
        log_level="info",
    )
