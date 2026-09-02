from fastapi import APIRouter, HTTPException, Query, status
from typing import Optional
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse
from app.services.category_service import CategoryService
from app.utils.response import success_response
from app.utils.pagination import PaginationParams

router = APIRouter()


@router.get("/")
async def list_categories(
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=200),
    search: Optional[str] = None,
    is_active: Optional[bool] = None,
    parent_id: Optional[str] = None,
):
    """List all categories with optional filters."""
    params = PaginationParams(page=page, limit=limit)
    result = await CategoryService.list_categories(
        params=params,
        search=search,
        is_active=is_active,
        parent_id=parent_id,
    )
    return success_response(data=result, message="Categories fetched successfully")


@router.get("/tree")
async def get_category_tree():
    """Get categories as a nested tree structure."""
    tree = await CategoryService.get_category_tree()
    return success_response(data=tree, message="Category tree fetched successfully")


@router.get("/{category_id}")
async def get_category(category_id: str):
    """Get a single category by ID."""
    category = await CategoryService.get_category_by_id(category_id)
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    return success_response(data=category, message="Category fetched successfully")


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_category(payload: CategoryCreate):
    """Create a new category."""
    category = await CategoryService.create_category(payload)
    return success_response(data=category, message="Category created successfully")


@router.put("/{category_id}")
async def update_category(category_id: str, payload: CategoryUpdate):
    """Update an existing category."""
    category = await CategoryService.update_category(category_id, payload)
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    return success_response(data=category, message="Category updated successfully")


@router.delete("/{category_id}")
async def delete_category(category_id: str):
    """Delete a category by ID."""
    deleted = await CategoryService.delete_category(category_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    return success_response(message="Category deleted successfully")


@router.patch("/{category_id}/toggle-status")
async def toggle_category_status(category_id: str):
    """Toggle a category's active/inactive status."""
    category = await CategoryService.toggle_status(category_id)
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    return success_response(data=category, message="Category status updated")
