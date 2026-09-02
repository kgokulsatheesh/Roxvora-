from datetime import datetime
from typing import Optional, List
from bson import ObjectId
from app.core.database import get_database
from app.schemas.category import CategoryCreate, CategoryUpdate
from app.utils.pagination import PaginationParams, paginate


class CategoryService:

    @staticmethod
    async def list_categories(
        params: PaginationParams,
        search: Optional[str] = None,
        is_active: Optional[bool] = None,
        parent_id: Optional[str] = None,
    ) -> dict:
        db = get_database()
        query = {}
        if search:
            query["name"] = {"$regex": search, "$options": "i"}
        if is_active is not None:
            query["is_active"] = is_active
        if parent_id:
            query["parent_id"] = ObjectId(parent_id)
        return await paginate(db["categories"], query, params, sort_field="sort_order", sort_direction=1)

    @staticmethod
    async def get_category_tree() -> List[dict]:
        """Return all categories as a nested tree."""
        db = get_database()
        all_categories = await db["categories"].find().sort("sort_order", 1).to_list(None)
        for cat in all_categories:
            cat["id"] = str(cat.pop("_id"))
            if cat.get("parent_id"):
                cat["parent_id"] = str(cat["parent_id"])

        # Build tree
        cat_map = {cat["id"]: {**cat, "children": []} for cat in all_categories}
        tree = []
        for cat in cat_map.values():
            pid = cat.get("parent_id")
            if pid and pid in cat_map:
                cat_map[pid]["children"].append(cat)
            else:
                tree.append(cat)
        return tree

    @staticmethod
    async def get_category_by_id(category_id: str) -> Optional[dict]:
        db = get_database()
        category = await db["categories"].find_one({"_id": ObjectId(category_id)})
        if not category:
            return None
        category["id"] = str(category.pop("_id"))
        if category.get("parent_id"):
            category["parent_id"] = str(category["parent_id"])
        return category

    @staticmethod
    async def create_category(payload: CategoryCreate) -> dict:
        db = get_database()
        data = payload.dict()
        data["created_at"] = datetime.utcnow()
        data["updated_at"] = datetime.utcnow()
        data["product_count"] = 0
        if data.get("parent_id"):
            data["parent_id"] = ObjectId(data["parent_id"])
        result = await db["categories"].insert_one(data)
        return await CategoryService.get_category_by_id(str(result.inserted_id))

    @staticmethod
    async def update_category(category_id: str, payload: CategoryUpdate) -> Optional[dict]:
        db = get_database()
        data = payload.dict(exclude_none=True)
        if not data:
            return await CategoryService.get_category_by_id(category_id)
        data["updated_at"] = datetime.utcnow()
        if data.get("parent_id"):
            data["parent_id"] = ObjectId(data["parent_id"])
        result = await db["categories"].update_one(
            {"_id": ObjectId(category_id)},
            {"$set": data},
        )
        if result.matched_count == 0:
            return None
        return await CategoryService.get_category_by_id(category_id)

    @staticmethod
    async def delete_category(category_id: str) -> bool:
        db = get_database()
        result = await db["categories"].delete_one({"_id": ObjectId(category_id)})
        return result.deleted_count > 0

    @staticmethod
    async def toggle_status(category_id: str) -> Optional[dict]:
        db = get_database()
        category = await db["categories"].find_one({"_id": ObjectId(category_id)})
        if not category:
            return None
        new_status = not category.get("is_active", True)
        await db["categories"].update_one(
            {"_id": ObjectId(category_id)},
            {"$set": {"is_active": new_status, "updated_at": datetime.utcnow()}},
        )
        return await CategoryService.get_category_by_id(category_id)
