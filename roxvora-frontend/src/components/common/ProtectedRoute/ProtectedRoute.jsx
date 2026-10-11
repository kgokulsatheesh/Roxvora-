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
 * AdminRoute — redirects unauthenticated users and denies users without an
 * explicit admin role. Server-side authorization must protect admin APIs too.
 */
export const AdminRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
