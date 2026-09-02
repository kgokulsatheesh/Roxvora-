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


class CustomerAddress(BaseModel):
    label: str = "Home"
    full_name: str
    phone: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    postal_code: str
    country: str = "India"
    is_default: bool = False


class CustomerModel(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    first_name: str
    last_name: str
    email: str
    hashed_password: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None
    addresses: List[CustomerAddress] = []
    is_active: bool = True
    is_verified: bool = False
    email_verified_at: Optional[datetime] = None
    wishlist: List[PyObjectId] = []
    total_orders: int = 0
    total_spent: float = 0.0
    last_login: Optional[datetime] = None
    provider: Optional[str] = None   # google | facebook | local
    provider_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
