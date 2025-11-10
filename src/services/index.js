import apiClient from '../utils/apiClient';

export const financeAPI = {
  // Authentication
  async signup (userData) {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  async login (credentials) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  async getAuthProfile () {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  async verifyOTP (data) {
    const response = await apiClient.post('/auth/verify-otp', data);
    return response.data;
  },

  async resendOTP (data) {
    const response = await apiClient.post('/auth/resend-otp', data);
    return response.data;
  },

  // Profile Management
  async getProfile () {
    const response = await apiClient.get('/profile');
    return response.data;
  },

  async updateProfile (profile) {
    const response = await apiClient.put('/profile', profile);
    return response.data;
  },

  async updateAvatar (avatar) {
    const response = await apiClient.put('/profile/avatar', { avatar });
    return response.data;
  },

  async updateNotifications (notifications) {
    const response = await apiClient.put(
      '/profile/notifications',
      notifications
    );
    return response.data;
  },

  async updatePreferences (preferences) {
    const response = await apiClient.put('/profile/preferences', preferences);
    return response.data;
  },

  // Transactions
  async getTransactions () {
    const response = await apiClient.get('/transactions');
    return response.data;
  },

  async createTransaction (transaction) {
    const response = await apiClient.post('/transactions', transaction);
    return response.data;
  },

  async resetTransactions () {
    const response = await apiClient.delete('/transactions');
    return response.data;
  },

  // Categories
  async getCategories () {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  async updateCategory (id, category) {
    const response = await apiClient.put(`/categories/${id}`, category);
    return response.data;
  },

  async deleteCategory (id) {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  },

  // Budgets
  async getBudgets () {
    const response = await apiClient.get('/budgets');
    return response.data;
  },

  async createBudget (budget) {
    const response = await apiClient.post('/budgets', budget);
    return response.data;
  },

  async updateBudget (id, budget) {
    const response = await apiClient.put(`/budgets/${id}`, budget);
    return response.data;
  },

  async deleteBudget (id) {
    const response = await apiClient.delete(`/budgets/${id}`);
    return response.data;
  },

  async createCategory (category) {
    const response = await apiClient.post('/categories', category);
    return response.data;
  },

  // Goals
  async getGoals () {
    const response = await apiClient.get('/goals');
    return response.data;
  },

  async createGoal (goal) {
    const response = await apiClient.post('/goals', goal);
    return response.data;
  },

  async updateGoal (id, goal) {
    const response = await apiClient.put(`/goals/${id}`, goal);
    return response.data;
  },

  async deleteGoal (id) {
    const response = await apiClient.delete(`/goals/${id}`);
    return response.data;
  },

  async updateGoalProgress (id, amount) {
    const response = await apiClient.patch(`/goals/${id}/progress`, { amount });
    return response.data;
  },

  // Insights
  async getInsights (timeframe = '30d') {
    const response = await apiClient.get(`/insights?timeframe=${timeframe}`);
    return response.data;
  },

  // Analytics
  async getAnalytics (timeframe = '30d') {
    const response = await apiClient.get(`/insights?timeframe=${timeframe}`);
    return response.data;
  },

  // Reports
  async generateReport (type = 'summary', timeframe = '30d') {
    const response = await apiClient.get(`/reports?type=${type}&timeframe=${timeframe}`);
    return response.data;
  },

  // Health check
  async healthCheck () {
    const response = await apiClient.get('/health');
    return response.data;
  },
};
