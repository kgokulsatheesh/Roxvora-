import axiosInstance from './axiosInstance';

export const categoryApi = {
  getAll: (params) => axiosInstance.get('/categories', { params }),
  getById: (id) => axiosInstance.get(`/categories/${id}`),
  getBySlug: (slug) => axiosInstance.get(`/categories/slug/${slug}`),
  getTree: () => axiosInstance.get('/categories/tree'),
  create: (data) => axiosInstance.post('/categories', data),
  update: (id, data) => axiosInstance.put(`/categories/${id}`, data),
  delete: (id) => axiosInstance.delete(`/categories/${id}`),
  reorder: (categories) => axiosInstance.put('/categories/reorder', { categories }),
};