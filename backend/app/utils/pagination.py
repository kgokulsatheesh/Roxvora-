from dataclasses import dataclass
from typing import Any, Optional
from motor.motor_asyncio import AsyncIOMotorCollection


@dataclass
class PaginationParams:
    page: int = 1
    limit: int = 20

    @property
    def skip(self) -> int:
        return (self.page - 1) * self.limit


async def paginate(
    collection: AsyncIOMotorCollection,
    query: dict,
    params: PaginationParams,
    sort_field: str = "created_at",
    sort_direction: int = -1,
    projection: Optional[dict] = None,
) -> dict:
    """
    Generic pagination helper for any MongoDB collection.
    Returns a dict with items list and pagination metadata.
    """
    total = await collection.count_documents(query)

    cursor = collection.find(query, projection)
    cursor = cursor.sort(sort_field, sort_direction)
    cursor = cursor.skip(params.skip).limit(params.limit)

    items = await cursor.to_list(params.limit)

    # Serialize ObjectId fields
    for item in items:
        if "_id" in item:
            item["id"] = str(item.pop("_id"))
        for key, value in list(item.items()):
            from bson import ObjectId
            if isinstance(value, ObjectId):
                item[key] = str(value)

    total_pages = (total + params.limit - 1) // params.limit if params.limit > 0 else 1

    return {
        "items": items,
        "pagination": {
            "total": total,
            "page": params.page,
            "limit": params.limit,
            "total_pages": total_pages,
            "has_next": params.page < total_pages,
            "has_prev": params.page > 1,
        },
    }
