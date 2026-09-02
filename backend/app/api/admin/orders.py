from fastapi import APIRouter, HTTPException, Query, status
from typing import Optional
from app.schemas.order import OrderStatusUpdate, OrderPaymentUpdate
from app.services.order_service import OrderService
from app.utils.response import success_response
from app.utils.pagination import PaginationParams

router = APIRouter()


@router.get("/")
async def list_orders(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    order_status: Optional[str] = None,
    payment_status: Optional[str] = None,
    payment_method: Optional[str] = None,
    sort_by: str = "created_at",
    sort_order: str = "desc",
):
    """List all orders with filters and pagination."""
    params = PaginationParams(page=page, limit=limit)
    result = await OrderService.list_orders(
        params=params,
        search=search,
        order_status=order_status,
        payment_status=payment_status,
        payment_method=payment_method,
        sort_by=sort_by,
        sort_order=sort_order,
    )
    return success_response(data=result, message="Orders fetched successfully")


@router.get("/{order_id}")
async def get_order(order_id: str):
    """Get a single order by ID."""
    order = await OrderService.get_order_by_id(order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return success_response(data=order, message="Order fetched successfully")


@router.patch("/{order_id}/status")
async def update_order_status(order_id: str, payload: OrderStatusUpdate):
    """Update the fulfillment status of an order."""
    order = await OrderService.update_order_status(order_id, payload)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return success_response(data=order, message="Order status updated successfully")


@router.patch("/{order_id}/payment")
async def update_payment_status(order_id: str, payload: OrderPaymentUpdate):
    """Update the payment status of an order."""
    order = await OrderService.update_payment_status(order_id, payload)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return success_response(data=order, message="Payment status updated successfully")


@router.get("/export/csv")
async def export_orders_csv(
    order_status: Optional[str] = None,
    payment_status: Optional[str] = None,
):
    """Export orders to CSV."""
    csv_data = await OrderService.export_orders_csv(
        order_status=order_status,
        payment_status=payment_status,
    )
    return success_response(data=csv_data, message="Orders exported successfully")
