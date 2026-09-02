from datetime import datetime
from typing import Optional, List
from bson import ObjectId
from app.core.database import get_database
from app.schemas.content import (
    BannerCreate, BannerUpdate,
    PageCreate, PageUpdate,
    AnnouncementCreate, AnnouncementUpdate,
)


def _serialize(doc: dict) -> dict:
    """Convert _id to id string."""
    if doc:
        doc["id"] = str(doc.pop("_id"))
    return doc


class ContentService:

    # --- Banners ---

    @staticmethod
    async def list_banners(position: Optional[str] = None, is_active: Optional[bool] = None) -> List[dict]:
        db = get_database()
        query = {}
        if position:
            query["position"] = position
        if is_active is not None:
            query["is_active"] = is_active
        banners = await db["banners"].find(query).sort("sort_order", 1).to_list(None)
        return [_serialize(b) for b in banners]

    @staticmethod
    async def create_banner(payload: BannerCreate) -> dict:
        db = get_database()
        data = payload.dict()
        data["created_at"] = datetime.utcnow()
        data["updated_at"] = datetime.utcnow()
        result = await db["banners"].insert_one(data)
        banner = await db["banners"].find_one({"_id": result.inserted_id})
        return _serialize(banner)

    @staticmethod
    async def update_banner(banner_id: str, payload: BannerUpdate) -> Optional[dict]:
        db = get_database()
        data = payload.dict(exclude_none=True)
        if not data:
            banner = await db["banners"].find_one({"_id": ObjectId(banner_id)})
            return _serialize(banner) if banner else None
        data["updated_at"] = datetime.utcnow()
        result = await db["banners"].update_one({"_id": ObjectId(banner_id)}, {"$set": data})
        if result.matched_count == 0:
            return None
        banner = await db["banners"].find_one({"_id": ObjectId(banner_id)})
        return _serialize(banner)

    @staticmethod
    async def delete_banner(banner_id: str) -> bool:
        db = get_database()
        result = await db["banners"].delete_one({"_id": ObjectId(banner_id)})
        return result.deleted_count > 0

    # --- Pages ---

    @staticmethod
    async def list_pages(is_active: Optional[bool] = None) -> List[dict]:
        db = get_database()
        query = {}
        if is_active is not None:
            query["is_active"] = is_active
        pages = await db["pages"].find(query).sort("title", 1).to_list(None)
        return [_serialize(p) for p in pages]

    @staticmethod
    async def get_page_by_id(page_id: str) -> Optional[dict]:
        db = get_database()
        page = await db["pages"].find_one({"_id": ObjectId(page_id)})
        return _serialize(page) if page else None

    @staticmethod
    async def create_page(payload: PageCreate) -> dict:
        db = get_database()
        data = payload.dict()
        data["created_at"] = datetime.utcnow()
        data["updated_at"] = datetime.utcnow()
        result = await db["pages"].insert_one(data)
        page = await db["pages"].find_one({"_id": result.inserted_id})
        return _serialize(page)

    @staticmethod
    async def update_page(page_id: str, payload: PageUpdate) -> Optional[dict]:
        db = get_database()
        data = payload.dict(exclude_none=True)
        if not data:
            return await ContentService.get_page_by_id(page_id)
        data["updated_at"] = datetime.utcnow()
        result = await db["pages"].update_one({"_id": ObjectId(page_id)}, {"$set": data})
        if result.matched_count == 0:
            return None
        return await ContentService.get_page_by_id(page_id)

    @staticmethod
    async def delete_page(page_id: str) -> bool:
        db = get_database()
        result = await db["pages"].delete_one({"_id": ObjectId(page_id)})
        return result.deleted_count > 0

    # --- Announcements ---

    @staticmethod
    async def list_announcements(is_active: Optional[bool] = None) -> List[dict]:
        db = get_database()
        query = {}
        if is_active is not None:
            query["is_active"] = is_active
        announcements = await db["announcements"].find(query).sort("created_at", -1).to_list(None)
        return [_serialize(a) for a in announcements]

    @staticmethod
    async def create_announcement(payload: AnnouncementCreate) -> dict:
        db = get_database()
        data = payload.dict()
        data["created_at"] = datetime.utcnow()
        data["updated_at"] = datetime.utcnow()
        result = await db["announcements"].insert_one(data)
        announcement = await db["announcements"].find_one({"_id": result.inserted_id})
        return _serialize(announcement)

    @staticmethod
    async def update_announcement(announcement_id: str, payload: AnnouncementUpdate) -> Optional[dict]:
        db = get_database()
        data = payload.dict(exclude_none=True)
        if not data:
            doc = await db["announcements"].find_one({"_id": ObjectId(announcement_id)})
            return _serialize(doc) if doc else None
        data["updated_at"] = datetime.utcnow()
        result = await db["announcements"].update_one({"_id": ObjectId(announcement_id)}, {"$set": data})
        if result.matched_count == 0:
            return None
        doc = await db["announcements"].find_one({"_id": ObjectId(announcement_id)})
        return _serialize(doc)

    @staticmethod
    async def delete_announcement(announcement_id: str) -> bool:
        db = get_database()
        result = await db["announcements"].delete_one({"_id": ObjectId(announcement_id)})
        return result.deleted_count > 0
