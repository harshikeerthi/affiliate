import sys
import os
import unittest
import uuid

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from fastapi.testclient import TestClient
from app.main import app


class TestAffiliatesAPI(unittest.TestCase):
    """Test suite for demo affiliate registration and profile management."""

    def setUp(self):
        self.client = TestClient(app)

    def test_register_demo_affiliate_success(self):
        """Test successful registration of a demo affiliate."""
        random_slug = uuid.uuid4().hex[:6]
        payload = {
            "name": f"Tester {random_slug}",
            "email": f"tester_{random_slug}@example.com",
            "phone": "+91 98111 22233",
            "password": "SecurePassword123",
            "category": "Tech & Digital Creators",
            "payout_upi": "tester@okaxis",
            "consent": True,
        }
        response = self.client.post("/api/v1/affiliates/register-demo", json=payload)
        self.assertEqual(response.status_code, 201)
        data = response.json()

        self.assertEqual(data["name"], payload["name"])
        self.assertEqual(data["email"], payload["email"])
        self.assertTrue(data["referral_code"].startswith("SBLOOM-"))
        self.assertNotIn("password", data)
        self.assertNotIn("password_hash", data)
        self.assertIn("DEMO ACCOUNT", data["disclaimer"])

    def test_register_duplicate_email_fails(self):
        """Test that registering an existing email returns 400."""
        random_slug = uuid.uuid4().hex[:6]
        payload = {
            "name": "First User",
            "email": f"duplicate_{random_slug}@example.com",
            "phone": "+91 98111 00000",
            "password": "password123",
            "consent": True,
        }
        # First registration succeeds
        res1 = self.client.post("/api/v1/affiliates/register-demo", json=payload)
        self.assertEqual(res1.status_code, 201)

        # Second registration with identical email fails
        res2 = self.client.post("/api/v1/affiliates/register-demo", json=payload)
        self.assertEqual(res2.status_code, 400)
        self.assertIn("already registered", res2.json()["detail"])

    def test_get_current_affiliate_profile(self):
        """Test GET /api/v1/affiliates/me returns default demo profile."""
        response = self.client.get("/api/v1/affiliates/me")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["id"], "aff-demo-01")
        self.assertEqual(data["referral_code"], "SBLOOM-HARSHI-78")
        self.assertEqual(data["role"], "affiliate")

    def test_patch_affiliate_profile(self):
        """Test PATCH /api/v1/affiliates/me updates profile fields."""
        update_payload = {
            "name": "Harshitha Updated",
            "payout_upi": "harshitha.new@okhdfcbank",
            "notification_whatsapp": False,
        }
        response = self.client.patch("/api/v1/affiliates/me", json=update_payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["name"], "Harshitha Updated")
        self.assertEqual(data["payout_upi"], "harshitha.new@okhdfcbank")
        self.assertFalse(data["notification_whatsapp"])


if __name__ == "__main__":
    unittest.main()
