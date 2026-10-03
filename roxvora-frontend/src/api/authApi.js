import axiosInstance from './axiosInstance';

export const authApi = {
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  register: (userData) => axiosInstance.post('/auth/register', userData),
  logout: () => axiosInstance.post('/auth/logout'),
  forgotPassword: (email) => axiosInstance.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => axiosInstance.post('/auth/reset-password', { token, password }),
  verifyEmail: (token) => axiosInstance.post('/auth/verify-email', { token }),
  resendVerification: (email) => axiosInstance.post('/auth/resend-verification', { email }),
  getProfile: () => axiosInstance.get('/auth/me'),
  updateProfile: (data) => axiosInstance.put('/auth/me', data),
  changePassword: (data) => axiosInstance.put('/auth/change-password', data),
  socialLogin: (provider, token) => axiosInstance.post(`/auth/social/${provider}`, { token }),
};