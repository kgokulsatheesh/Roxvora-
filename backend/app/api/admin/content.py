from fastapi import APIRouter, HTTPException, Query, status
from typing import Optional
from app.schemas.content import (
    BannerCreate, BannerUpdate,
    PageCreate, PageUpdate,
    AnnouncementCreate, AnnouncementUpdate,
)
from app.services.content_service import ContentService
from app.utils.response import success_response
from app.utils.pagination import PaginationParams

router = APIRouter()


# --- Banners ---

@router.get("/banners")
async def list_banners(
    position: Optional[str] = None,
    is_active: Optional[bool] = None,
):
    """List all banners, optionally filtered by position or status."""
    banners = await ContentService.list_banners(position=position, is_active=is_active)
    return success_response(data=banners, message="Banners fetched successfully")


@router.post("/banners", status_code=status.HTTP_201_CREATED)
async def create_banner(payload: BannerCreate):
    """Create a new banner."""
    banner = await ContentService.create_banner(payload)
    return success_response(data=banner, message="Banner created successfully")


@router.put("/banners/{banner_id}")
async def update_banner(banner_id: str, payload: BannerUpdate):
    """Update an existing banner."""
    banner = await ContentService.update_banner(banner_id, payload)
    if not banner:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Banner not found")
    return success_response(data=banner, message="Banner updated successfully")


@router.delete("/banners/{banner_id}")
async def delete_banner(banner_id: str):
    """Delete a banner."""
    deleted = await ContentService.delete_banner(banner_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Banner not found")
    return success_response(message="Banner deleted successfully")


# --- Pages ---

@router.get("/pages")
async def list_pages(is_active: Optional[bool] = None):
    """List all static pages."""
    pages = await ContentService.list_pages(is_active=is_active)
    return success_response(data=pages, message="Pages fetched successfully")


@router.get("/pages/{page_id}")
async def get_page(page_id: str):
    """Get a single static page by ID."""
    page = await ContentService.get_page_by_id(page_id)
    if not page:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Page not found")
    return success_response(data=page, message="Page fetched successfully")


@router.post("/pages", status_code=status.HTTP_201_CREATED)
async def create_page(payload: PageCreate):
    """Create a new static page."""
    page = await ContentService.create_page(payload)
    return success_response(data=page, message="Page created successfully")


@router.put("/pages/{page_id}")
async def update_page(page_id: str, payload: PageUpdate):
    """Update an existing static page."""
    page = await ContentService.update_page(page_id, payload)
    if not page:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Page not found")
    return success_response(data=page, message="Page updated successfully")


@router.delete("/pages/{page_id}")
async def delete_page(page_id: str):
    """Delete a static page."""
    deleted = await ContentService.delete_page(page_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Page not found")
    return success_response(message="Page deleted successfully")


# --- Announcements ---

@router.get("/announcements")
async def list_announcements(is_active: Optional[bool] = None):
    """List all announcement bar entries."""
    announcements = await ContentService.list_announcements(is_active=is_active)
    return success_response(data=announcements, message="Announcements fetched successfully")


@router.post("/announcements", status_code=status.HTTP_201_CREATED)
async def create_announcement(payload: AnnouncementCreate):
    """Create a new announcement."""
    announcement = await ContentService.create_announcement(payload)
    return success_response(data=announcement, message="Announcement created successfully")


@router.put("/announcements/{announcement_id}")
async def update_announcement(announcement_id: str, payload: AnnouncementUpdate):
    """Update an existing announcement."""
    announcement = await ContentService.update_announcement(announcement_id, payload)
    if not announcement:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Announcement not found")
    return success_response(data=announcement, message="Announcement updated successfully")


@router.delete("/announcements/{announcement_id}")
async def delete_announcement(announcement_id: str):
    """Delete an announcement."""
    deleted = await ContentService.delete_announcement(announcement_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Announcement not found")
    return success_response(message="Announcement deleted successfully")
