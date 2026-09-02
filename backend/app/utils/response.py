from typing import Any, Optional


def success_response(
    data: Any = None,
    message: str = "Success",
    status_code: int = 200,
) -> dict:
    """Standard success response envelope."""
    response = {
        "success": True,
        "message": message,
        "status_code": status_code,
    }
    if data is not None:
        response["data"] = data
    return response


def error_response(
    message: str = "An error occurred",
    status_code: int = 400,
    errors: Optional[Any] = None,
) -> dict:
    """Standard error response envelope."""
    response = {
        "success": False,
        "message": message,
        "status_code": status_code,
    }
    if errors is not None:
        response["errors"] = errors
    return response


def paginated_response(
    items: list,
    total: int,
    page: int,
    limit: int,
    message: str = "Data fetched successfully",
) -> dict:
    """Standard paginated response envelope."""
    total_pages = (total + limit - 1) // limit if limit > 0 else 1
    return {
        "success": True,
        "message": message,
        "data": {
            "items": items,
            "pagination": {
                "total": total,
                "page": page,
                "limit": limit,
                "total_pages": total_pages,
                "has_next": page < total_pages,
                "has_prev": page > 1,
            },
        },
    }
