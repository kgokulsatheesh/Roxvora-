import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../../../store/slices/authSlice';

/**
 * ProtectedRoute — redirects unauthenticated users to /login.
 * Preserves the intended destination so the login page can redirect back after auth.
 */
export const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

/**
 * AdminRoute — redirects non-admin users.
 * In dev mode (no backend), allows access if authenticated.
 * Once a real role system exists, check user.role === 'admin'.
 */
export const AdminRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If the user is authenticated but not an admin, redirect to home.
    // During development (no backend), skip the role check if user has no role set.
    if (user && user.role && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
