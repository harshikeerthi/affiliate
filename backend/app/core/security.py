import hashlib
import os

# ==============================================================================
# DEMO SECURITY & STORAGE DISCLAIMER:
# ------------------------------------------------------------------------------
# This module is part of the temporary demo scaffold.
# 1. Passwords are never stored in plain text; they are hashed with PBKDF2-HMAC-SHA256
#    using a per-user random salt.
# 2. This is NOT a production authentication system or token authority.
# 3. All registered demo accounts reside in volatile server memory only and will reset
#    when the server process terminates.
# 4. Production authentication and persistent storage will be integrated with Supabase
#    in Phase 2.
# ==============================================================================

DEMO_AUTH_DISCLAIMER = (
    "Demo In-Memory Authentication: Credentials are used for demonstration only. "
    "Passwords are salted and hashed with PBKDF2-SHA256 and never stored in plain text. "
    "Do not use production or sensitive personal passwords."
)


def hash_password(password: str) -> str:
    """Hashes a password with a fresh random salt using PBKDF2-HMAC-SHA256."""
    salt = os.urandom(16)
    key = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100_000)
    return f"{salt.hex()}:{key.hex()}"


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plain password against the stored salt:hash string."""
    try:
        salt_hex, key_hex = hashed_password.split(":")
        salt = bytes.fromhex(salt_hex)
        expected_key = bytes.fromhex(key_hex)
        key = hashlib.pbkdf2_hmac("sha256", plain_password.encode("utf-8"), salt, 100_000)
        return hashlib.sha256(key).digest() == hashlib.sha256(expected_key).digest()
    except Exception:
        return False
