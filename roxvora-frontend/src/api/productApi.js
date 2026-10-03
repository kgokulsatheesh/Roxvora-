import axiosInstance from './axiosInstance';

export const productApi = {
  getAll: (params) => axiosInstance.get('/products', { params }),
  getById: (id) => axiosInstance.get(`/products/${id}`),
  getBySlug: (slug) => axiosInstance.get(`/products/slug/${slug}`),
  getFeatured: (limit = 8) => axiosInstance.get('/products/featured', { params: { limit } }),
  getNewArrivals: (limit = 8) => axiosInstance.get('/products/new-arrivals', { params: { limit } }),
  getBestSellers: (limit = 8) => axiosInstance.get('/products/best-sellers', { params: { limit } }),
  getRelated: (id, limit = 4) => axiosInstance.get(`/products/${id}/related`, { params: { limit } }),
  create: (data) => axiosInstance.post('/products', data),
  update: (id, data) => axiosInstance.put(`/products/${id}`, data),
  delete: (id) => axiosInstance.delete(`/products/${id}`),
  uploadImages: (id, formData) => axiosInstance.post(`/products/${id}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteImage: (id, imageId) => axiosInstance.delete(`/products/${id}/images/${imageId}`),
  updateStock: (id, quantity, action) => axiosInstance.patch(`/products/${id}/stock`, { quantity, action }),
};