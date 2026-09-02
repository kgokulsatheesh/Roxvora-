from fastapi import APIRouter, HTTPException, Query, status
from typing import Optional
from app.schemas.customer import CustomerUpdate
from app.services.customer_service import CustomerService
from app.utils.response import success_response
from app.utils.pagination import PaginationParams

router = APIRouter()


@router.get("/")
async def list_customers(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    is_active: Optional[bool] = None,
    sort_by: str = "created_at",
    sort_order: str = "desc",
):
    """List all customers with filters and pagination."""
    params = PaginationParams(page=page, limit=limit)
    result = await CustomerService.list_customers(
        params=params,
        search=search,
        is_active=is_active,
        sort_by=sort_by,
        sort_order=sort_order,
    )
    return success_response(data=result, message="Customers fetched successfully")


@router.get("/{customer_id}")
async def get_customer(customer_id: str):
    """Get a single customer by ID."""
    customer = await CustomerService.get_customer_by_id(customer_id)
    if not customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found")
    return success_response(data=customer, message="Customer fetched successfully")


@router.get("/{customer_id}/orders")
async def get_customer_orders(
    customer_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
):
    """Get order history for a specific customer."""
    params = PaginationParams(page=page, limit=limit)
    result = await CustomerService.get_customer_orders(customer_id, params)
    return success_response(data=result, message="Customer orders fetched successfully")


@router.put("/{customer_id}")
async def update_customer(customer_id: str, payload: CustomerUpdate):
    """Update customer details."""
    customer = await CustomerService.update_customer(customer_id, payload)
    if not customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found")
    return success_response(data=customer, message="Customer updated successfully")


@router.patch("/{customer_id}/toggle-status")
async def toggle_customer_status(customer_id: str):
    """Block or unblock a customer account."""
    customer = await CustomerService.toggle_status(customer_id)
    if not customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found")
    return success_response(data=customer, message="Customer status updated")
