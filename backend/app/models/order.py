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


class OrderItem(BaseModel):
    product_id: PyObjectId
    product_name: str
    product_image: Optional[str] = None
    sku: Optional[str] = None
    quantity: int
    price: float
    total: float
    variant: Optional[dict] = None


class ShippingAddress(BaseModel):
    full_name: str
    phone: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    postal_code: str
    country: str = "India"


class OrderModel(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    order_number: str
    customer_id: Optional[PyObjectId] = None
    customer_email: str
    customer_name: str
    items: List[OrderItem] = []
    shipping_address: ShippingAddress
    billing_address: Optional[ShippingAddress] = None
    subtotal: float
    discount: float = 0.0
    shipping_charge: float = 0.0
    tax: float = 0.0
    total: float
    coupon_code: Optional[str] = None
    coupon_discount: float = 0.0
    payment_method: str = "cod"   # cod | razorpay | stripe
    payment_status: str = "pending"   # pending | paid | failed | refunded
    payment_id: Optional[str] = None
    order_status: str = "placed"  # placed | confirmed | processing | shipped | delivered | cancelled | returned
    tracking_number: Optional[str] = None
    notes: Optional[str] = None
    status_history: List[dict] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
