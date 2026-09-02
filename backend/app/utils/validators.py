import re
from typing import Optional


def is_valid_email(email: str) -> bool:
    """Check whether an email address is syntactically valid."""
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return bool(re.match(pattern, email))


def is_valid_phone(phone: str) -> bool:
    """Check whether a phone number contains 7–15 digits (international-friendly)."""
    pattern = r"^\+?[0-9]{7,15}$"
    return bool(re.match(pattern, phone.replace(" ", "").replace("-", "")))


def is_valid_slug(slug: str) -> bool:
    """Slugs must be lowercase, alphanumeric, with hyphens only."""
    pattern = r"^[a-z0-9]+(?:-[a-z0-9]+)*$"
    return bool(re.match(pattern, slug))


def is_strong_password(password: str) -> bool:
    """
    Password must be at least 8 characters and contain:
    - at least one uppercase letter
    - at least one lowercase letter
    - at least one digit
    """
    if len(password) < 8:
        return False
    if not re.search(r"[A-Z]", password):
        return False
    if not re.search(r"[a-z]", password):
        return False
    if not re.search(r"\d", password):
        return False
    return True


def slugify(text: str) -> str:
    """Convert a plain text string into a URL-friendly slug."""
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text


def sanitize_string(value: str, max_length: Optional[int] = None) -> str:
    """Strip leading/trailing whitespace and optionally truncate."""
    value = value.strip()
    if max_length and len(value) > max_length:
        value = value[:max_length]
    return value


def is_valid_hex_color(color: str) -> bool:
    """Validate a hex color string like #fff or #ffffff."""
    pattern = r"^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$"
    return bool(re.match(pattern, color))


def is_valid_object_id(value: str) -> bool:
    """Check whether a string is a valid MongoDB ObjectId."""
    from bson import ObjectId
    return ObjectId.is_valid(value)
