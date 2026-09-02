from datetime import datetime, timedelta
from typing import List
from app.core.database import get_database


class DashboardService:

    @staticmethod
    async def get_stats() -> dict:
        db = get_database()

        # Aggregate counts and totals in parallel
        total_orders = await db["orders"].count_documents({})
        total_customers = await db["customers"].count_documents({})
        total_products = await db["products"].count_documents({})

        revenue_pipeline = [
            {"$match": {"payment_status": "paid"}},
            {"$group": {"_id": None, "total": {"$sum": "$total"}}},
        ]
        revenue_result = await db["orders"].aggregate(revenue_pipeline).to_list(1)
        total_revenue = revenue_result[0]["total"] if revenue_result else 0.0

        # Stats for the current month
        start_of_month = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        monthly_orders = await db["orders"].count_documents({"created_at": {"$gte": start_of_month}})
        monthly_revenue_result = await db["orders"].aggregate([
            {"$match": {"payment_status": "paid", "created_at": {"$gte": start_of_month}}},
            {"$group": {"_id": None, "total": {"$sum": "$total"}}},
        ]).to_list(1)
        monthly_revenue = monthly_revenue_result[0]["total"] if monthly_revenue_result else 0.0

        return {
            "total_revenue": total_revenue,
            "total_orders": total_orders,
            "total_customers": total_customers,
            "total_products": total_products,
            "monthly_orders": monthly_orders,
            "monthly_revenue": monthly_revenue,
        }

    @staticmethod
    async def get_recent_orders(limit: int = 10) -> List[dict]:
        db = get_database()
        cursor = db["orders"].find().sort("created_at", -1).limit(limit)
        orders = await cursor.to_list(limit)
        for order in orders:
            order["id"] = str(order.pop("_id"))
        return orders

    @staticmethod
    async def get_revenue_chart(period: str = "7d") -> List[dict]:
        db = get_database()
        period_map = {"7d": 7, "30d": 30, "90d": 90, "1y": 365}
        days = period_map.get(period, 7)
        start_date = datetime.utcnow() - timedelta(days=days)

        pipeline = [
            {"$match": {"payment_status": "paid", "created_at": {"$gte": start_date}}},
            {
                "$group": {
                    "_id": {
                        "year": {"$year": "$created_at"},
                        "month": {"$month": "$created_at"},
                        "day": {"$dayOfMonth": "$created_at"},
                    },
                    "revenue": {"$sum": "$total"},
                    "orders": {"$sum": 1},
                }
            },
            {"$sort": {"_id.year": 1, "_id.month": 1, "_id.day": 1}},
        ]
        result = await db["orders"].aggregate(pipeline).to_list(None)
        return [
            {
                "date": f"{r['_id']['year']}-{r['_id']['month']:02d}-{r['_id']['day']:02d}",
                "revenue": r["revenue"],
                "orders": r["orders"],
            }
            for r in result
        ]

    @staticmethod
    async def get_top_products(limit: int = 5) -> List[dict]:
        db = get_database()
        cursor = db["products"].find(
            {"is_active": True},
            {"name": 1, "thumbnail": 1, "price": 1, "sold_count": 1, "stock": 1},
        ).sort("sold_count", -1).limit(limit)
        products = await cursor.to_list(limit)
        for p in products:
            p["id"] = str(p.pop("_id"))
        return products

    @staticmethod
    async def get_low_stock_products(limit: int = 10) -> List[dict]:
        db = get_database()
        pipeline = [
            {"$match": {"is_active": True, "$expr": {"$lte": ["$stock", "$low_stock_threshold"]}}},
            {"$project": {"name": 1, "thumbnail": 1, "sku": 1, "stock": 1, "low_stock_threshold": 1}},
            {"$limit": limit},
        ]
        products = await db["products"].aggregate(pipeline).to_list(limit)
        for p in products:
            p["id"] = str(p.pop("_id"))
        return products
