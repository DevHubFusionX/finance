import apiClient from '../utils/apiClient';

export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),
  verifyOTP: (email, otp) => apiClient.post('/auth/verify-otp', { email, otp }),
  resendOTP: (email) => apiClient.post('/auth/resend-otp', { email }),
  logout: () => apiClient.post('/auth/logout'),
  refreshToken: () => apiClient.post('/auth/refresh'),
  forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => apiClient.post(`/auth/reset-password/${token}`, { password }),
  getProfile: () => apiClient.get('/auth/profile')
};

export const transactionAPI = {
  getAll: (params) => apiClient.get('/transactions', { params }),
  create: (data) => apiClient.post('/transactions', data),
  update: (id, data) => apiClient.put(`/transactions/${id}`, data),
  delete: (id) => apiClient.delete(`/transactions/${id}`)
};

export const categoryAPI = {
  getAll: () => apiClient.get('/categories'),
  create: (data) => apiClient.post('/categories', data),
  update: (id, data) => apiClient.put(`/categories/${id}`, data),
  delete: (id) => apiClient.delete(`/categories/${id}`)
};

export const budgetAPI = {
  getAll: () => apiClient.get('/budgets'),
  create: (data) => apiClient.post('/budgets', data),
  update: (id, data) => apiClient.put(`/budgets/${id}`, data),
  delete: (id) => apiClient.delete(`/budgets/${id}`)
};

export const insightsAPI = {
  get: (timeframe) => apiClient.get('/insights', { params: { timeframe } }),
  forecast: (data) => apiClient.post('/insights/forecast', data)
};