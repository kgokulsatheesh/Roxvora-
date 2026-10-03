import axiosInstance from './axiosInstance';

export const orderApi = {
  getAll: (params) => axiosInstance.get('/orders', { params }),
  getById: (id) => axiosInstance.get(`/orders/${id}`),
  create: (data) => axiosInstance.post('/orders', data),
  cancel: (id) => axiosInstance.post(`/orders/${id}/cancel`),
  return: (id, data) => axiosInstance.post(`/orders/${id}/return`, data),
  track: (id) => axiosInstance.get(`/orders/${id}/track`),
  downloadInvoice: (id) => axiosInstance.get(`/orders/${id}/invoice`, { responseType: 'blob' }),
};