import sys
import os
import unittest

# Ensure backend root is on path for importing 'app'
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from fastapi.testclient import TestClient
from app.main import app


class TestHealthEndpoint(unittest.TestCase):
    """Test suite for FastAPI health check and root endpoints."""

    def setUp(self):
        self.client = TestClient(app)

    def test_root_endpoint_returns_200(self):
        """Test root / metadata endpoint."""
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "online")
        self.assertIn("sBLOOM", data.get("brand", ""))

    def test_v1_health_endpoint_success(self):
        """Test /api/v1/health returns 200 and healthy status."""
        response = self.client.get("/api/v1/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "healthy")
        self.assertEqual(data.get("service"), "sBLOOM Affiliate Portal API")
        self.assertIn("version", data)
        self.assertIn("uptime_seconds", data)
        self.assertGreaterEqual(data["uptime_seconds"], 0)

    def test_top_level_health_alias(self):
        """Test /health top-level alias matches /api/v1/health response."""
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "healthy")

    def test_database_is_not_connected_in_phase_1(self):
        """Verify that database connection is deferred and correctly flagged as not connected."""
        response = self.client.get("/api/v1/health")
        data = response.json()
        db_info = data.get("database", {})
        self.assertFalse(db_info.get("connected"))
        self.assertIn("Phase 2", db_info.get("provider", ""))


if __name__ == "__main__":
    unittest.main()
