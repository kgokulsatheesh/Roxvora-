from fastapi import APIRouter, Depends
from app.services.dashboard_service import DashboardService
from app.utils.response import success_response

router = APIRouter()


@router.get("/stats")
async def get_dashboard_stats():
    """Get high-level dashboard stats: revenue, orders, customers, products."""
    stats = await DashboardService.get_stats()
    return success_response(data=stats, message="Dashboard stats fetched successfully")


@router.get("/recent-orders")
async def get_recent_orders(limit: int = 10):
    """Get the most recent orders for the dashboard overview."""
    orders = await DashboardService.get_recent_orders(limit=limit)
    return success_response(data=orders, message="Recent orders fetched successfully")


@router.get("/revenue-chart")
async def get_revenue_chart(period: str = "7d"):
    """
    Get revenue chart data.
    period: 7d | 30d | 90d | 1y
    """
    chart_data = await DashboardService.get_revenue_chart(period=period)
    return success_response(data=chart_data, message="Revenue chart data fetched successfully")


@router.get("/top-products")
async def get_top_products(limit: int = 5):
    """Get best-selling products for the dashboard."""
    products = await DashboardService.get_top_products(limit=limit)
    return success_response(data=products, message="Top products fetched successfully")


@router.get("/low-stock")
async def get_low_stock_products(limit: int = 10):
    """Get products that are running low on stock."""
    products = await DashboardService.get_low_stock_products(limit=limit)
    return success_response(data=products, message="Low stock products fetched successfully")
