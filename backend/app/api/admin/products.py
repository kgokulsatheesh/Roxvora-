from fastapi import APIRouter, HTTPException, Query, UploadFile, File, status
from typing import Optional, List
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.services.product_service import ProductService
from app.utils.response import success_response, error_response
from app.utils.pagination import PaginationParams

router = APIRouter()


@router.get("/")
async def list_products(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    category_id: Optional[str] = None,
    is_active: Optional[bool] = None,
    is_featured: Optional[bool] = None,
    sort_by: str = "created_at",
    sort_order: str = "desc",
):
    """List all products with filters, search, and pagination."""
    params = PaginationParams(page=page, limit=limit)
    result = await ProductService.list_products(
        params=params,
        search=search,
        category_id=category_id,
        is_active=is_active,
        is_featured=is_featured,
        sort_by=sort_by,
        sort_order=sort_order,
    )
    return success_response(data=result, message="Products fetched successfully")


@router.get("/{product_id}")
async def get_product(product_id: str):
    """Get a single product by ID."""
    product = await ProductService.get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return success_response(data=product, message="Product fetched successfully")


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_product(payload: ProductCreate):
    """Create a new product."""
    product = await ProductService.create_product(payload)
    return success_response(data=product, message="Product created successfully")


@router.put("/{product_id}")
async def update_product(product_id: str, payload: ProductUpdate):
    """Update an existing product."""
    product = await ProductService.update_product(product_id, payload)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return success_response(data=product, message="Product updated successfully")


@router.delete("/{product_id}")
async def delete_product(product_id: str):
    """Delete a product by ID."""
    deleted = await ProductService.delete_product(product_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return success_response(message="Product deleted successfully")


@router.patch("/{product_id}/toggle-status")
async def toggle_product_status(product_id: str):
    """Toggle a product's active/inactive status."""
    product = await ProductService.toggle_status(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return success_response(data=product, message="Product status updated")


@router.post("/{product_id}/images")
async def upload_product_images(product_id: str, files: List[UploadFile] = File(...)):
    """Upload images for a product."""
    urls = await ProductService.upload_images(product_id, files)
    return success_response(data={"urls": urls}, message="Images uploaded successfully")
