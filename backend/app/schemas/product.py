from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel


class ProductVariantSchema(BaseModel):
    size: Optional[str] = None
    color: Optional[str] = None
    sku: Optional[str] = None
    stock: int = 0
    price_modifier: float = 0.0


class ProductCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    short_description: Optional[str] = None
    price: float
    compare_price: Optional[float] = None
    cost_price: Optional[float] = None
    category_id: Optional[str] = None
    images: List[str] = []
    thumbnail: Optional[str] = None
    variants: List[ProductVariantSchema] = []
    tags: List[str] = []
    sku: Optional[str] = None
    stock: int = 0
    low_stock_threshold: int = 5
    is_active: bool = True
    is_featured: bool = False
    weight: Optional[float] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = None
    price: Optional[float] = None
    compare_price: Optional[float] = None
    cost_price: Optional[float] = None
    category_id: Optional[str] = None
    images: Optional[List[str]] = None
    thumbnail: Optional[str] = None
    variants: Optional[List[ProductVariantSchema]] = None
    tags: Optional[List[str]] = None
    sku: Optional[str] = None
    stock: Optional[int] = None
    low_stock_threshold: Optional[int] = None
    is_active: Optional[bool] = None
    is_featured: Optional[bool] = None
    weight: Optional[float] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None


class ProductResponse(BaseModel):
    id: str
    name: str
    slug: str
    description: Optional[str] = None
    short_description: Optional[str] = None
    price: float
    compare_price: Optional[float] = None
    category_id: Optional[str] = None
    images: List[str] = []
    thumbnail: Optional[str] = None
    variants: List[ProductVariantSchema] = []
    tags: List[str] = []
    sku: Optional[str] = None
    stock: int
    is_active: bool
    is_featured: bool
    rating: float
    review_count: int
    sold_count: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
