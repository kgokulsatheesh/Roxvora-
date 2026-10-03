import axiosInstance from './axiosInstance';

export const cartApi = {
  get: () => axiosInstance.get('/cart'),
  add: (item) => axiosInstance.post('/cart', item),
  update: (itemId, quantity) => axiosInstance.put(`/cart/${itemId}`, { quantity }),
  remove: (itemId) => axiosInstance.delete(`/cart/${itemId}`),
  clear: () => axiosInstance.delete('/cart'),
  applyCoupon: (code) => axiosInstance.post('/cart/coupon', { code }),
  removeCoupon: () => axiosInstance.delete('/cart/coupon'),
  getShipping: (address) => axiosInstance.post('/cart/shipping', address),
};