from datetime import datetime
from typing import Optional
from bson import ObjectId
from app.core.database import get_database
from app.schemas.coupon import CouponCreate, CouponUpdate, CouponValidateRequest
from app.utils.pagination import PaginationParams, paginate


class CouponService:

    @staticmethod
    async def list_coupons(
        params: PaginationParams,
        search: Optional[str] = None,
        is_active: Optional[bool] = None,
    ) -> dict:
        db = get_database()
        query = {}
        if search:
            query["$or"] = [
                {"code": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}},
            ]
        if is_active is not None:
            query["is_active"] = is_active
        return await paginate(db["coupons"], query, params, sort_field="created_at", sort_direction=-1)

    @staticmethod
    async def get_coupon_by_id(coupon_id: str) -> Optional[dict]:
        db = get_database()
        coupon = await db["coupons"].find_one({"_id": ObjectId(coupon_id)})
        if not coupon:
            return None
        coupon["id"] = str(coupon.pop("_id"))
        return coupon

    @staticmethod
    async def get_coupon_by_code(code: str) -> Optional[dict]:
        db = get_database()
        coupon = await db["coupons"].find_one({"code": code.upper()})
        if not coupon:
            return None
        coupon["id"] = str(coupon.pop("_id"))
        return coupon

    @staticmethod
    async def create_coupon(payload: CouponCreate) -> dict:
        db = get_database()
        data = payload.dict()
        data["code"] = data["code"].upper()
        data["used_count"] = 0
        data["created_at"] = datetime.utcnow()
        data["updated_at"] = datetime.utcnow()
        # Convert string IDs to ObjectId
        data["applicable_categories"] = [ObjectId(i) for i in data.get("applicable_categories", [])]
        data["applicable_products"] = [ObjectId(i) for i in data.get("applicable_products", [])]
        data["excluded_products"] = [ObjectId(i) for i in data.get("excluded_products", [])]
        result = await db["coupons"].insert_one(data)
        return await CouponService.get_coupon_by_id(str(result.inserted_id))

    @staticmethod
    async def update_coupon(coupon_id: str, payload: CouponUpdate) -> Optional[dict]:
        db = get_database()
        data = payload.dict(exclude_none=True)
        if not data:
            return await CouponService.get_coupon_by_id(coupon_id)
        data["updated_at"] = datetime.utcnow()
        for field in ("applicable_categories", "applicable_products", "excluded_products"):
            if field in data:
                data[field] = [ObjectId(i) for i in data[field]]
        result = await db["coupons"].update_one(
            {"_id": ObjectId(coupon_id)},
            {"$set": data},
        )
        if result.matched_count == 0:
            return None
        return await CouponService.get_coupon_by_id(coupon_id)

    @staticmethod
    async def delete_coupon(coupon_id: str) -> bool:
        db = get_database()
        result = await db["coupons"].delete_one({"_id": ObjectId(coupon_id)})
        return result.deleted_count > 0

    @staticmethod
    async def toggle_status(coupon_id: str) -> Optional[dict]:
        db = get_database()
        coupon = await db["coupons"].find_one({"_id": ObjectId(coupon_id)})
        if not coupon:
            return None
        new_status = not coupon.get("is_active", True)
        await db["coupons"].update_one(
            {"_id": ObjectId(coupon_id)},
            {"$set": {"is_active": new_status, "updated_at": datetime.utcnow()}},
        )
        return await CouponService.get_coupon_by_id(coupon_id)

    @staticmethod
    async def validate_coupon(payload: CouponValidateRequest) -> dict:
        coupon = await CouponService.get_coupon_by_code(payload.code)
        now = datetime.utcnow()

        if not coupon:
            return {"valid": False, "discount_amount": 0.0, "message": "Invalid coupon code"}
        if not coupon.get("is_active"):
            return {"valid": False, "discount_amount": 0.0, "message": "This coupon is inactive"}
        if coupon.get("starts_at") and now < coupon["starts_at"]:
            return {"valid": False, "discount_amount": 0.0, "message": "Coupon is not yet active"}
        if coupon.get("expires_at") and now > coupon["expires_at"]:
            return {"valid": False, "discount_amount": 0.0, "message": "Coupon has expired"}
        if coupon.get("usage_limit") and coupon["used_count"] >= coupon["usage_limit"]:
            return {"valid": False, "discount_amount": 0.0, "message": "Coupon usage limit reached"}
        if payload.order_amount < coupon.get("minimum_order_amount", 0):
            return {
                "valid": False,
                "discount_amount": 0.0,
                "message": f"Minimum order amount is ₹{coupon['minimum_order_amount']}",
            }

        # Calculate discount
        if coupon["discount_type"] == "percentage":
            discount = (payload.order_amount * coupon["discount_value"]) / 100
            max_discount = coupon.get("maximum_discount")
            if max_discount:
                discount = min(discount, max_discount)
        else:
            discount = coupon["discount_value"]

        discount = round(min(discount, payload.order_amount), 2)
        return {"valid": True, "discount_amount": discount, "message": "Coupon applied", "coupon": coupon}
