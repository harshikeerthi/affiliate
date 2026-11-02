import sys
import os
import unittest

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from fastapi.testclient import TestClient
from app.main import app


class TestServicesAPI(unittest.TestCase):
    """Test suite for promotional services catalog."""

    def setUp(self):
        self.client = TestClient(app)

    def test_list_services_returns_catalog(self):
        """Test GET /api/v1/services returns catalog with commissions and cookie durations."""
        response = self.client.get("/api/v1/services")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertGreaterEqual(data["total"], 5)
        services = data["services"]

        service_ids = [s["id"] for s in services]
        self.assertIn("srv-whatsapp-automation", service_ids)
        self.assertIn("srv-website-building", service_ids)
        self.assertIn("srv-seo", service_ids)
        self.assertIn("srv-google-ads", service_ids)
        self.assertIn("srv-meta-ads", service_ids)

        for s in services:
            self.assertIn("commission_rate", s)
            self.assertIn("cookie_duration", s)
            self.assertIsInstance(s["features"], list)


if __name__ == "__main__":
    unittest.main()
