from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel


class CouponCreate(BaseModel):
    code: str
    description: Optional[str] = None
    discount_type: str = "percentage"  # percentage | fixed
    discount_value: float
    minimum_order_amount: float = 0.0
    maximum_discount: Optional[float] = None
    usage_limit: Optional[int] = None
    usage_limit_per_user: int = 1
    applicable_categories: List[str] = []
    applicable_products: List[str] = []
    excluded_products: List[str] = []
    is_active: bool = True
    starts_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None


class CouponUpdate(BaseModel):
    description: Optional[str] = None
    discount_type: Optional[str] = None
    discount_value: Optional[float] = None
    minimum_order_amount: Optional[float] = None
    maximum_discount: Optional[float] = None
    usage_limit: Optional[int] = None
    usage_limit_per_user: Optional[int] = None
    applicable_categories: Optional[List[str]] = None
    applicable_products: Optional[List[str]] = None
    excluded_products: Optional[List[str]] = None
    is_active: Optional[bool] = None
    starts_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None


class CouponResponse(BaseModel):
    id: str
    code: str
    description: Optional[str] = None
    discount_type: str
    discount_value: float
    minimum_order_amount: float
    maximum_discount: Optional[float] = None
    usage_limit: Optional[int] = None
    usage_limit_per_user: int
    used_count: int
    is_active: bool
    starts_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CouponValidateRequest(BaseModel):
    code: str
    order_amount: float
    customer_id: Optional[str] = None


class CouponValidateResponse(BaseModel):
    valid: bool
    discount_amount: float = 0.0
    message: str
    coupon: Optional[CouponResponse] = None
