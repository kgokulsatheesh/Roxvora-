from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class AdminCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "admin"


class AdminUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None
    avatar: Optional[str] = None


class AdminPasswordChange(BaseModel):
    current_password: str
    new_password: str


class AdminResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    is_active: bool
    avatar: Optional[str] = None
    last_login: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    admin: AdminResponse


class RefreshTokenRequest(BaseModel):
    refresh_token: str
