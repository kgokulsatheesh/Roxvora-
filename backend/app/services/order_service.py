from datetime import datetime
from typing import Optional
from bson import ObjectId
from app.core.database import get_database
from app.schemas.order import OrderStatusUpdate, OrderPaymentUpdate
from app.utils.pagination import PaginationParams, paginate


class OrderService:

    @staticmethod
    async def list_orders(
        params: PaginationParams,
        search: Optional[str] = None,
        order_status: Optional[str] = None,
        payment_status: Optional[str] = None,
        payment_method: Optional[str] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc",
    ) -> dict:
        db = get_database()
        query = {}
        if search:
            query["$or"] = [
                {"order_number": {"$regex": search, "$options": "i"}},
                {"customer_email": {"$regex": search, "$options": "i"}},
                {"customer_name": {"$regex": search, "$options": "i"}},
            ]
        if order_status:
            query["order_status"] = order_status
        if payment_status:
            query["payment_status"] = payment_status
        if payment_method:
            query["payment_method"] = payment_method

        direction = -1 if sort_order == "desc" else 1
        return await paginate(db["orders"], query, params, sort_field=sort_by, sort_direction=direction)

    @staticmethod
    async def get_order_by_id(order_id: str) -> Optional[dict]:
        db = get_database()
        order = await db["orders"].find_one({"_id": ObjectId(order_id)})
        if not order:
            return None
        order["id"] = str(order.pop("_id"))
        if order.get("customer_id"):
            order["customer_id"] = str(order["customer_id"])
        for item in order.get("items", []):
            if item.get("product_id"):
                item["product_id"] = str(item["product_id"])
        return order

    @staticmethod
    async def update_order_status(order_id: str, payload: OrderStatusUpdate) -> Optional[dict]:
        db = get_database()
        history_entry = {
            "status": payload.order_status,
            "notes": payload.notes,
            "timestamp": datetime.utcnow(),
        }
        update_data = {
            "order_status": payload.order_status,
            "updated_at": datetime.utcnow(),
        }
        if payload.tracking_number:
            update_data["tracking_number"] = payload.tracking_number

        result = await db["orders"].update_one(
            {"_id": ObjectId(order_id)},
            {
                "$set": update_data,
                "$push": {"status_history": history_entry},
            },
        )
        if result.matched_count == 0:
            return None
        return await OrderService.get_order_by_id(order_id)

    @staticmethod
    async def update_payment_status(order_id: str, payload: OrderPaymentUpdate) -> Optional[dict]:
        db = get_database()
        update_data = {
            "payment_status": payload.payment_status,
            "updated_at": datetime.utcnow(),
        }
        if payload.payment_id:
            update_data["payment_id"] = payload.payment_id

        result = await db["orders"].update_one(
            {"_id": ObjectId(order_id)},
            {"$set": update_data},
        )
        if result.matched_count == 0:
            return None
        return await OrderService.get_order_by_id(order_id)

    @staticmethod
    async def export_orders_csv(
        order_status: Optional[str] = None,
        payment_status: Optional[str] = None,
    ) -> list:
        db = get_database()
        query = {}
        if order_status:
            query["order_status"] = order_status
        if payment_status:
            query["payment_status"] = payment_status

        orders = await db["orders"].find(query).sort("created_at", -1).to_list(None)
        rows = []
        for o in orders:
            rows.append({
                "order_number": o.get("order_number"),
                "customer_name": o.get("customer_name"),
                "customer_email": o.get("customer_email"),
                "total": o.get("total"),
                "order_status": o.get("order_status"),
                "payment_status": o.get("payment_status"),
                "payment_method": o.get("payment_method"),
                "created_at": str(o.get("created_at")),
            })
        return rows
