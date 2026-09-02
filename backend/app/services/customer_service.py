from datetime import datetime
from typing import Optional
from bson import ObjectId
from app.core.database import get_database
from app.schemas.customer import CustomerUpdate
from app.utils.pagination import PaginationParams, paginate


class CustomerService:

    @staticmethod
    async def list_customers(
        params: PaginationParams,
        search: Optional[str] = None,
        is_active: Optional[bool] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc",
    ) -> dict:
        db = get_database()
        query = {}
        if search:
            query["$or"] = [
                {"first_name": {"$regex": search, "$options": "i"}},
                {"last_name": {"$regex": search, "$options": "i"}},
                {"email": {"$regex": search, "$options": "i"}},
                {"phone": {"$regex": search, "$options": "i"}},
            ]
        if is_active is not None:
            query["is_active"] = is_active

        direction = -1 if sort_order == "desc" else 1
        result = await paginate(db["customers"], query, params, sort_field=sort_by, sort_direction=direction)

        # Strip sensitive fields
        for customer in result.get("items", []):
            customer.pop("hashed_password", None)
            customer.pop("wishlist", None)
        return result

    @staticmethod
    async def get_customer_by_id(customer_id: str) -> Optional[dict]:
        db = get_database()
        customer = await db["customers"].find_one({"_id": ObjectId(customer_id)})
        if not customer:
            return None
        customer["id"] = str(customer.pop("_id"))
        customer.pop("hashed_password", None)
        customer["wishlist"] = [str(w) for w in customer.get("wishlist", [])]
        return customer

    @staticmethod
    async def get_customer_orders(customer_id: str, params: PaginationParams) -> dict:
        db = get_database()
        query = {"customer_id": ObjectId(customer_id)}
        return await paginate(db["orders"], query, params, sort_field="created_at", sort_direction=-1)

    @staticmethod
    async def update_customer(customer_id: str, payload: CustomerUpdate) -> Optional[dict]:
        db = get_database()
        data = payload.dict(exclude_none=True)
        if not data:
            return await CustomerService.get_customer_by_id(customer_id)
        data["updated_at"] = datetime.utcnow()
        result = await db["customers"].update_one(
            {"_id": ObjectId(customer_id)},
            {"$set": data},
        )
        if result.matched_count == 0:
            return None
        return await CustomerService.get_customer_by_id(customer_id)

    @staticmethod
    async def toggle_status(customer_id: str) -> Optional[dict]:
        db = get_database()
        customer = await db["customers"].find_one({"_id": ObjectId(customer_id)})
        if not customer:
            return None
        new_status = not customer.get("is_active", True)
        await db["customers"].update_one(
            {"_id": ObjectId(customer_id)},
            {"$set": {"is_active": new_status, "updated_at": datetime.utcnow()}},
        )
        return await CustomerService.get_customer_by_id(customer_id)
