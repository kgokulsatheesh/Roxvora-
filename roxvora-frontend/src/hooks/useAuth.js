import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser, selectAuthLoading, selectAuthError } from '@store/slices/authSlice';
import { setCredentials, logout, clearError } from '@store/slices/authSlice';
import authApi from '@api/authApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    dispatch(setCredentials(response.data));
    return response.data;
  };

  const register = async (userData) => {
    const response = await authApi.register(userData);
    dispatch(setCredentials(response.data));
    return response.data;
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const updateProfile = async (data) => {
    const response = await authApi.updateProfile(data);
    dispatch(setCredentials({ user: response.data.user, token: user?.token }));
    return response.data;
  };

  const changePassword = async (data) => {
    await authApi.changePassword(data);
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout: logoutUser,
    updateProfile,
    changePassword,
    clearError: clearAuthError,
  };
};