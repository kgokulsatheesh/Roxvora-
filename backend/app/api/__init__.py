from fastapi import APIRouter
from app.api.auth import routes as auth_routes
from app.api.admin import (
    dashboard,
    products,
    categories,
    orders,
    customers,
    offers,
    content,
    settings,
)

api_router = APIRouter()

# Auth routes
api_router.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])

# Admin routes
api_router.include_router(dashboard.router, prefix="/admin/dashboard", tags=["Admin - Dashboard"])
api_router.include_router(products.router, prefix="/admin/products", tags=["Admin - Products"])
api_router.include_router(categories.router, prefix="/admin/categories", tags=["Admin - Categories"])
api_router.include_router(orders.router, prefix="/admin/orders", tags=["Admin - Orders"])
api_router.include_router(customers.router, prefix="/admin/customers", tags=["Admin - Customers"])
api_router.include_router(offers.router, prefix="/admin/offers", tags=["Admin - Offers"])
api_router.include_router(content.router, prefix="/admin/content", tags=["Admin - Content"])
api_router.include_router(settings.router, prefix="/admin/settings", tags=["Admin - Settings"])
