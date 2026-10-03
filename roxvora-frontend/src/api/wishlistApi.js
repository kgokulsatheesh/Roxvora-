import axiosInstance from './axiosInstance';

export const wishlistApi = {
  get: () => axiosInstance.get('/wishlist'),
  add: (productId) => axiosInstance.post('/wishlist', { productId }),
  remove: (productId) => axiosInstance.delete(`/wishlist/${productId}`),
  clear: () => axiosInstance.delete('/wishlist'),
  moveToCart: (productId) => axiosInstance.post(`/wishlist/${productId}/move-to-cart`),
  check: (productId) => axiosInstance.get(`/wishlist/check/${productId}`),
};