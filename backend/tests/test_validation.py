import sys
import os
import unittest

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from fastapi.testclient import TestClient
from app.main import app


class TestValidationErrors(unittest.TestCase):
    """Test suite verifying strict Pydantic input validation and 422 error responses."""

    def setUp(self):
        self.client = TestClient(app)

    def test_lead_missing_required_fields_fails(self):
        """Test that submitting an empty lead payload returns 422 with field details."""
        response = self.client.post("/api/v1/leads", json={})
        self.assertEqual(response.status_code, 422)
        errors = response.json().get("detail", [])
        field_names = [e["loc"][-1] for e in errors]
        self.assertIn("business_name", field_names)
        self.assertIn("contact_name", field_names)
        self.assertIn("email", field_names)
        self.assertIn("phone", field_names)

    def test_lead_invalid_email_format_fails(self):
        """Test that an invalid email string triggers a 422 validation error."""
        payload = {
            "business_name": "Acme Corp",
            "contact_name": "John Doe",
            "email": "not-a-valid-email-string",
            "phone": "+91 98765 43210",
            "location": "Bengaluru",
            "sector": "Retail",
            "services_of_interest": ["srv-workflow-automation"],
            "business_requirements": "Valid business requirements description.",
            "consent": True,
        }
        response = self.client.post("/api/v1/leads", json=payload)
        self.assertEqual(response.status_code, 422)
        self.assertIn("email", str(response.json()))

    def test_lead_consent_false_fails(self):
        """Test that consent=False triggers validation error."""
        payload = {
            "business_name": "Acme Corp",
            "contact_name": "John Doe",
            "email": "john@acme.com",
            "phone": "+91 98765 43210",
            "location": "Bengaluru",
            "sector": "Retail",
            "services_of_interest": ["srv-workflow-automation"],
            "business_requirements": "Valid business requirements description.",
            "consent": False,
        }
        response = self.client.post("/api/v1/leads", json=payload)
        self.assertEqual(response.status_code, 422)
        self.assertIn("consent", str(response.json()).lower())

    def test_lead_empty_services_fails(self):
        """Test that an empty services list fails validation."""
        payload = {
            "business_name": "Acme Corp",
            "contact_name": "John Doe",
            "email": "john@acme.com",
            "phone": "+91 98765 43210",
            "location": "Bengaluru",
            "sector": "Retail",
            "services_of_interest": [],
            "business_requirements": "Valid business requirements description.",
            "consent": True,
        }
        response = self.client.post("/api/v1/leads", json=payload)
        self.assertEqual(response.status_code, 422)

    def test_lead_requirements_too_short_fails(self):
        """Test that requirements shorter than 10 characters fail."""
        payload = {
            "business_name": "Acme Corp",
            "contact_name": "John Doe",
            "email": "john@acme.com",
            "phone": "+91 98765 43210",
            "location": "Bengaluru",
            "sector": "Retail",
            "services_of_interest": ["srv-workflow-automation"],
            "business_requirements": "Short",  # < 10 chars
            "consent": True,
        }
        response = self.client.post("/api/v1/leads", json=payload)
        self.assertEqual(response.status_code, 422)

    def test_affiliate_short_password_fails(self):
        """Test that affiliate password under 6 characters fails."""
        payload = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "phone": "+91 98765 11111",
            "password": "123",  # < 6 chars
            "consent": True,
        }
        response = self.client.post("/api/v1/affiliates/register-demo", json=payload)
        self.assertEqual(response.status_code, 422)


if __name__ == "__main__":
    unittest.main()
