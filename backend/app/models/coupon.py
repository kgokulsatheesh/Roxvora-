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


class CouponModel(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    code: str
    description: Optional[str] = None
    discount_type: str = "percentage"  # percentage | fixed
    discount_value: float
    minimum_order_amount: float = 0.0
    maximum_discount: Optional[float] = None
    usage_limit: Optional[int] = None
    usage_limit_per_user: int = 1
    used_count: int = 0
    applicable_categories: List[PyObjectId] = []
    applicable_products: List[PyObjectId] = []
    excluded_products: List[PyObjectId] = []
    is_active: bool = True
    starts_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
