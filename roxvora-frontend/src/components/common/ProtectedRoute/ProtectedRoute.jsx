import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '@store/slices/authSlice';

/**
 * AdminRoute — only allows access if the user is authenticated and has the admin role.
 * Redirects unauthenticated users to /login and non-admins to /.
 */
export const AdminRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

/**
 * ProtectedRoute — only allows access if the user is authenticated.
 * Redirects unauthenticated users to /login.
 */
export const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

/**
 * PublicRoute — redirects authenticated users away from public-only pages (e.g. login).
 */
export const PublicRoute = ({ children, redirectTo = '/' }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};
