import re
import random
from datetime import datetime, timezone
from typing import Optional, Dict, Any
from fastapi import HTTPException, status

from app.schemas.affiliate import (
    AffiliateRegisterRequest,
    AffiliateUpdateRequest,
    AffiliateResponse,
)
from app.core.security import hash_password
from app.services.storage import store


def _generate_referral_code(name: str) -> str:
    """Generates an uppercase referral code based on creator name."""
    clean_name = re.sub(r"[^A-Za-z]", "", name).upper()[:6] or "PARTNER"
    random_suffix = random.randint(10, 99)
    return f"SBLOOM-{clean_name}-{random_suffix}"


def register_demo_affiliate(data: AffiliateRegisterRequest) -> AffiliateResponse:
    """
    Registers a new demo affiliate in memory.
    Note: Passwords are salted & hashed using PBKDF2-SHA256 and never stored plain.
    """
    with store._lock:
        # Check if email is already taken
        for aff in store.affiliates.values():
            if aff["email"].lower() == data.email.lower():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"An affiliate with email '{data.email}' is already registered in demo storage.",
                )

        affiliate_id = f"aff-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}-{random.randint(100, 999)}"
        referral_code = _generate_referral_code(data.name)
        joined_at = datetime.now(timezone.utc).isoformat()

        # Hash password securely
        password_hash = hash_password(data.password)

        new_affiliate: Dict[str, Any] = {
            "id": affiliate_id,
            "name": data.name,
            "email": str(data.email),
            "phone": data.phone,
            "referral_code": referral_code,
            "category": data.category,
            "payout_upi": data.payout_upi,
            "joined_at": joined_at,
            "role": "affiliate",
            "notification_whatsapp": True,
            "notification_email": True,
            "password_hash": password_hash,
        }

        store.affiliates[affiliate_id] = new_affiliate

    return AffiliateResponse(**new_affiliate)


def get_current_demo_affiliate(affiliate_id: Optional[str] = None) -> AffiliateResponse:
    """
    Retrieves the active demo affiliate profile.
    If affiliate_id is provided, looks up by ID or referral_code.
    Otherwise defaults to the first demo partner in memory.
    """
    with store._lock:
        if not store.affiliates:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No demo affiliates currently registered in memory storage.",
            )

        if affiliate_id:
            # Match by ID or referral_code
            for aff in store.affiliates.values():
                if aff["id"] == affiliate_id or aff["referral_code"] == affiliate_id:
                    return AffiliateResponse(**aff)
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Affiliate with ID or code '{affiliate_id}' was not found in demo storage.",
            )

        # Default to the primary demo affiliate
        if "aff-demo-01" in store.affiliates:
            return AffiliateResponse(**store.affiliates["aff-demo-01"])

        # Fallback to the latest
        latest_key = list(store.affiliates.keys())[-1]
        return AffiliateResponse(**store.affiliates[latest_key])


def update_demo_affiliate(updates: AffiliateUpdateRequest, affiliate_id: Optional[str] = None) -> AffiliateResponse:
    """Updates demo affiliate profile settings in memory."""
    with store._lock:
        target_id = affiliate_id or "aff-demo-01"
        if target_id not in store.affiliates:
            # Try to find by latest
            if store.affiliates:
                target_id = list(store.affiliates.keys())[-1]
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="No demo affiliate available to update.",
                )

        aff = store.affiliates[target_id]

        if updates.name is not None:
            aff["name"] = updates.name
        if updates.phone is not None:
            aff["phone"] = updates.phone
        if updates.category is not None:
            aff["category"] = updates.category
        if updates.payout_upi is not None:
            aff["payout_upi"] = updates.payout_upi
        if updates.notification_whatsapp is not None:
            aff["notification_whatsapp"] = updates.notification_whatsapp
        if updates.notification_email is not None:
            aff["notification_email"] = updates.notification_email

        return AffiliateResponse(**aff)
