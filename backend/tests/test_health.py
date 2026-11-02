import sys
import os
import unittest

# Ensure backend root is in sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from fastapi.testclient import TestClient
from app.main import app


class TestHealthEndpoint(unittest.TestCase):
    """Test health diagnostics and root endpoints."""

    def setUp(self):
        self.client = TestClient(app)

    def test_root_endpoint_metadata(self):
        """Verify root / returns 200 and docs link."""
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "online")
        self.assertIn("/docs", data.get("docs_url", ""))
        self.assertEqual(data.get("storage_mode"), "in_memory_temporary")

    def test_top_level_health_endpoint(self):
        """Verify GET /health returns 200 and in-memory storage notice."""
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "healthy")
        self.assertEqual(data["storage_mode"], "in_memory_temporary")
        self.assertFalse(data["database_connected"])
        self.assertIn("IN-MEMORY", data["storage_notice"])

    def test_v1_health_endpoint_alias(self):
        """Verify GET /api/v1/health matches root /health."""
        response = self.client.get("/api/v1/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "healthy")
        self.assertGreaterEqual(data["uptime_seconds"], 0)


if __name__ == "__main__":
    unittest.main()
