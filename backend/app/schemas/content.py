from datetime import datetime
from typing import Optional
from pydantic import BaseModel


# --- Banner Schemas ---

class BannerCreate(BaseModel):
    title: str
    subtitle: Optional[str] = None
    image: str
    link: Optional[str] = None
    position: str = "hero"  # hero | sidebar | popup | category
    is_active: bool = True
    sort_order: int = 0
    starts_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None


class BannerUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    image: Optional[str] = None
    link: Optional[str] = None
    position: Optional[str] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None
    starts_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None


class BannerResponse(BaseModel):
    id: str
    title: str
    subtitle: Optional[str] = None
    image: str
    link: Optional[str] = None
    position: str
    is_active: bool
    sort_order: int
    starts_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# --- Page Schemas ---

class PageCreate(BaseModel):
    title: str
    slug: str
    content: str
    is_active: bool = True
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None


class PageUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    is_active: Optional[bool] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None


class PageResponse(BaseModel):
    id: str
    title: str
    slug: str
    content: str
    is_active: bool
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# --- Announcement Schemas ---

class AnnouncementCreate(BaseModel):
    message: str
    link: Optional[str] = None
    link_text: Optional[str] = None
    background_color: str = "#000000"
    text_color: str = "#ffffff"
    is_active: bool = True
    starts_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None


class AnnouncementUpdate(BaseModel):
    message: Optional[str] = None
    link: Optional[str] = None
    link_text: Optional[str] = None
    background_color: Optional[str] = None
    text_color: Optional[str] = None
    is_active: Optional[bool] = None
    starts_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None


class AnnouncementResponse(BaseModel):
    id: str
    message: str
    link: Optional[str] = None
    link_text: Optional[str] = None
    background_color: str
    text_color: str
    is_active: bool
    starts_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
