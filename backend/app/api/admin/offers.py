from fastapi import APIRouter, HTTPException, Query, status
from typing import Optional
from app.schemas.coupon import CouponCreate, CouponUpdate, CouponValidateRequest
from app.services.coupon_service import CouponService
from app.utils.response import success_response
from app.utils.pagination import PaginationParams

router = APIRouter()


@router.get("/coupons")
async def list_coupons(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    is_active: Optional[bool] = None,
):
    """List all coupons with optional filters."""
    params = PaginationParams(page=page, limit=limit)
    result = await CouponService.list_coupons(
        params=params,
        search=search,
        is_active=is_active,
    )
    return success_response(data=result, message="Coupons fetched successfully")


@router.get("/coupons/{coupon_id}")
async def get_coupon(coupon_id: str):
    """Get a single coupon by ID."""
    coupon = await CouponService.get_coupon_by_id(coupon_id)
    if not coupon:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Coupon not found")
    return success_response(data=coupon, message="Coupon fetched successfully")


@router.post("/coupons", status_code=status.HTTP_201_CREATED)
async def create_coupon(payload: CouponCreate):
    """Create a new coupon."""
    coupon = await CouponService.create_coupon(payload)
    return success_response(data=coupon, message="Coupon created successfully")


@router.put("/coupons/{coupon_id}")
async def update_coupon(coupon_id: str, payload: CouponUpdate):
    """Update an existing coupon."""
    coupon = await CouponService.update_coupon(coupon_id, payload)
    if not coupon:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Coupon not found")
    return success_response(data=coupon, message="Coupon updated successfully")


@router.delete("/coupons/{coupon_id}")
async def delete_coupon(coupon_id: str):
    """Delete a coupon by ID."""
    deleted = await CouponService.delete_coupon(coupon_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Coupon not found")
    return success_response(message="Coupon deleted successfully")


@router.patch("/coupons/{coupon_id}/toggle-status")
async def toggle_coupon_status(coupon_id: str):
    """Enable or disable a coupon."""
    coupon = await CouponService.toggle_status(coupon_id)
    if not coupon:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Coupon not found")
    return success_response(data=coupon, message="Coupon status updated")


@router.post("/coupons/validate")
async def validate_coupon(payload: CouponValidateRequest):
    """Validate a coupon code against an order amount."""
    result = await CouponService.validate_coupon(payload)
    return success_response(data=result, message="Coupon validated")
