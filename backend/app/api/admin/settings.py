from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from app.utils.response import success_response
from app.core.database import get_database
from datetime import datetime

router = APIRouter()


class StoreSettings(BaseModel):
    store_name: Optional[str] = None
    store_email: Optional[str] = None
    store_phone: Optional[str] = None
    store_address: Optional[str] = None
    store_currency: Optional[str] = "INR"
    store_currency_symbol: Optional[str] = "₹"
    store_logo: Optional[str] = None
    store_favicon: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    facebook_url: Optional[str] = None
    instagram_url: Optional[str] = None
    twitter_url: Optional[str] = None
    youtube_url: Optional[str] = None
    free_shipping_threshold: Optional[float] = None
    default_shipping_charge: Optional[float] = None
    tax_rate: Optional[float] = None
    maintenance_mode: Optional[bool] = False


@router.get("/")
async def get_settings():
    """Get all store settings."""
    db = get_database()
    settings_doc = await db["settings"].find_one({"key": "store"})
    if not settings_doc:
        return success_response(data={}, message="No settings found")
    settings_doc["id"] = str(settings_doc.pop("_id"))
    return success_response(data=settings_doc, message="Settings fetched successfully")


@router.put("/")
async def update_settings(payload: StoreSettings):
    """Update store settings."""
    db = get_database()
    data = payload.dict(exclude_none=True)
    data["updated_at"] = datetime.utcnow()
    await db["settings"].update_one(
        {"key": "store"},
        {"$set": data},
        upsert=True,
    )
    return success_response(message="Settings updated successfully")


@router.post("/toggle-maintenance")
async def toggle_maintenance_mode():
    """Toggle store maintenance mode on/off."""
    db = get_database()
    current = await db["settings"].find_one({"key": "store"})
    current_mode = current.get("maintenance_mode", False) if current else False
    await db["settings"].update_one(
        {"key": "store"},
        {"$set": {"maintenance_mode": not current_mode, "updated_at": datetime.utcnow()}},
        upsert=True,
    )
    status_label = "enabled" if not current_mode else "disabled"
    return success_response(
        data={"maintenance_mode": not current_mode},
        message=f"Maintenance mode {status_label}",
    )
