from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel


class ShippingAddressSchema(BaseModel):
    full_name: str
    phone: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    postal_code: str
    country: str = "India"


class OrderItemSchema(BaseModel):
    product_id: str
    product_name: str
    product_image: Optional[str] = None
    sku: Optional[str] = None
    quantity: int
    price: float
    total: float
    variant: Optional[dict] = None


class OrderStatusUpdate(BaseModel):
    order_status: str
    tracking_number: Optional[str] = None
    notes: Optional[str] = None


class OrderPaymentUpdate(BaseModel):
    payment_status: str
    payment_id: Optional[str] = None


class OrderResponse(BaseModel):
    id: str
    order_number: str
    customer_id: Optional[str] = None
    customer_email: str
    customer_name: str
    items: List[OrderItemSchema] = []
    shipping_address: ShippingAddressSchema
    subtotal: float
    discount: float
    shipping_charge: float
    tax: float
    total: float
    coupon_code: Optional[str] = None
    coupon_discount: float
    payment_method: str
    payment_status: str
    payment_id: Optional[str] = None
    order_status: str
    tracking_number: Optional[str] = None
    notes: Optional[str] = None
    status_history: List[dict] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class OrderListResponse(BaseModel):
    id: str
    order_number: str
    customer_name: str
    customer_email: str
    total: float
    order_status: str
    payment_status: str
    payment_method: str
    items_count: int
    created_at: datetime

    class Config:
        from_attributes = True
