from datetime import datetime
from typing import Optional
from app.core.database import get_database
from app.core.security import (
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
)
from bson import ObjectId


class AuthService:

    @staticmethod
    async def login(email: str, password: str) -> Optional[dict]:
        db = get_database()
        admin = await db["admins"].find_one({"email": email.lower()})
        if not admin:
            return None
        if not verify_password(password, admin["hashed_password"]):
            return None
        if not admin.get("is_active", True):
            return None

        # Update last login
        await db["admins"].update_one(
            {"_id": admin["_id"]},
            {"$set": {"last_login": datetime.utcnow()}},
        )

        token_data = {"sub": str(admin["_id"]), "role": admin.get("role", "admin")}
        access_token = create_access_token(token_data)
        refresh_token = create_refresh_token(token_data)

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "admin": {
                "id": str(admin["_id"]),
                "name": admin["name"],
                "email": admin["email"],
                "role": admin.get("role", "admin"),
                "is_active": admin.get("is_active", True),
                "avatar": admin.get("avatar"),
                "last_login": admin.get("last_login"),
                "created_at": admin.get("created_at"),
            },
        }

    @staticmethod
    async def refresh_access_token(refresh_token: str) -> Optional[dict]:
        payload = decode_token(refresh_token)
        if not payload or payload.get("type") != "refresh":
            return None

        admin_id = payload.get("sub")
        db = get_database()
        admin = await db["admins"].find_one({"_id": ObjectId(admin_id)})
        if not admin or not admin.get("is_active", True):
            return None

        token_data = {"sub": str(admin["_id"]), "role": admin.get("role", "admin")}
        new_access_token = create_access_token(token_data)

        return {
            "access_token": new_access_token,
            "token_type": "bearer",
        }

    @staticmethod
    async def get_admin_by_id(admin_id: str) -> Optional[dict]:
        db = get_database()
        admin = await db["admins"].find_one({"_id": ObjectId(admin_id)})
        if not admin:
            return None
        admin["id"] = str(admin.pop("_id"))
        admin.pop("hashed_password", None)
        return admin
