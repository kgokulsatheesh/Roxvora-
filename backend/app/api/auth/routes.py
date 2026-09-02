from fastapi import APIRouter, HTTPException, Depends, status
from app.schemas.admin import AdminLogin, TokenResponse, RefreshTokenRequest
from app.services.auth_service import AuthService
from app.utils.response import success_response, error_response

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
async def admin_login(payload: AdminLogin):
    """Admin login with email and password."""
    result = await AuthService.login(payload.email, payload.password)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    return result


@router.post("/refresh")
async def refresh_token(payload: RefreshTokenRequest):
    """Refresh access token using a valid refresh token."""
    result = await AuthService.refresh_access_token(payload.refresh_token)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )
    return success_response(data=result, message="Token refreshed successfully")


@router.post("/logout")
async def logout():
    """Logout endpoint (client should discard tokens)."""
    return success_response(message="Logged out successfully")
