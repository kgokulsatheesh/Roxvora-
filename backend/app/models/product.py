from datetime import datetime
from typing import Optional, List
from bson import ObjectId
from pydantic import BaseModel, Field


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class ProductVariant(BaseModel):
    size: Optional[str] = None
    color: Optional[str] = None
    sku: Optional[str] = None
    stock: int = 0
    price_modifier: float = 0.0


class ProductModel(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str
    slug: str
    description: Optional[str] = None
    short_description: Optional[str] = None
    price: float
    compare_price: Optional[float] = None
    cost_price: Optional[float] = None
    category_id: Optional[PyObjectId] = None
    images: List[str] = []
    thumbnail: Optional[str] = None
    variants: List[ProductVariant] = []
    tags: List[str] = []
    sku: Optional[str] = None
    stock: int = 0
    low_stock_threshold: int = 5
    is_active: bool = True
    is_featured: bool = False
    weight: Optional[float] = None
    dimensions: Optional[dict] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    rating: float = 0.0
    review_count: int = 0
    sold_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
