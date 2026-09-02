from datetime import datetime
from typing import Optional, List
from bson import ObjectId
from app.core.database import get_database
from app.schemas.product import ProductCreate, ProductUpdate
from app.utils.pagination import PaginationParams, paginate


class ProductService:

    @staticmethod
    async def list_products(
        params: PaginationParams,
        search: Optional[str] = None,
        category_id: Optional[str] = None,
        is_active: Optional[bool] = None,
        is_featured: Optional[bool] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc",
    ) -> dict:
        db = get_database()
        query = {}
        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"sku": {"$regex": search, "$options": "i"}},
                {"tags": {"$in": [search]}},
            ]
        if category_id:
            query["category_id"] = ObjectId(category_id)
        if is_active is not None:
            query["is_active"] = is_active
        if is_featured is not None:
            query["is_featured"] = is_featured

        direction = -1 if sort_order == "desc" else 1
        return await paginate(db["products"], query, params, sort_field=sort_by, sort_direction=direction)

    @staticmethod
    async def get_product_by_id(product_id: str) -> Optional[dict]:
        db = get_database()
        product = await db["products"].find_one({"_id": ObjectId(product_id)})
        if not product:
            return None
        product["id"] = str(product.pop("_id"))
        if product.get("category_id"):
            product["category_id"] = str(product["category_id"])
        return product

    @staticmethod
    async def create_product(payload: ProductCreate) -> dict:
        db = get_database()
        data = payload.dict()
        data["created_at"] = datetime.utcnow()
        data["updated_at"] = datetime.utcnow()
        data["rating"] = 0.0
        data["review_count"] = 0
        data["sold_count"] = 0
        if data.get("category_id"):
            data["category_id"] = ObjectId(data["category_id"])
        result = await db["products"].insert_one(data)
        return await ProductService.get_product_by_id(str(result.inserted_id))

    @staticmethod
    async def update_product(product_id: str, payload: ProductUpdate) -> Optional[dict]:
        db = get_database()
        data = payload.dict(exclude_none=True)
        if not data:
            return await ProductService.get_product_by_id(product_id)
        data["updated_at"] = datetime.utcnow()
        if data.get("category_id"):
            data["category_id"] = ObjectId(data["category_id"])
        result = await db["products"].update_one(
            {"_id": ObjectId(product_id)},
            {"$set": data},
        )
        if result.matched_count == 0:
            return None
        return await ProductService.get_product_by_id(product_id)

    @staticmethod
    async def delete_product(product_id: str) -> bool:
        db = get_database()
        result = await db["products"].delete_one({"_id": ObjectId(product_id)})
        return result.deleted_count > 0

    @staticmethod
    async def toggle_status(product_id: str) -> Optional[dict]:
        db = get_database()
        product = await db["products"].find_one({"_id": ObjectId(product_id)})
        if not product:
            return None
        new_status = not product.get("is_active", True)
        await db["products"].update_one(
            {"_id": ObjectId(product_id)},
            {"$set": {"is_active": new_status, "updated_at": datetime.utcnow()}},
        )
        return await ProductService.get_product_by_id(product_id)

    @staticmethod
    async def upload_images(product_id: str, files: list) -> List[str]:
        """Save uploaded images to disk and return their URLs."""
        import os, shutil
        upload_dir = "app/uploads/products"
        os.makedirs(upload_dir, exist_ok=True)
        urls = []
        for file in files:
            file_path = f"{upload_dir}/{product_id}_{file.filename}"
            with open(file_path, "wb") as f:
                shutil.copyfileobj(file.file, f)
            urls.append(f"/uploads/products/{product_id}_{file.filename}")

        # Append new image URLs to the product
        db = get_database()
        await db["products"].update_one(
            {"_id": ObjectId(product_id)},
            {"$push": {"images": {"$each": urls}}, "$set": {"updated_at": datetime.utcnow()}},
        )
        return urls
