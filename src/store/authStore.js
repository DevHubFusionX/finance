import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '../utils/apiClient';
import { handleApiError } from '../utils/errorHandler';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Initialize auth state
      initializeAuth: () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (token && user) {
          try {
            set({
              token,
              user: JSON.parse(user),
              isAuthenticated: true
            });
          } catch (error) {
            console.error('Failed to parse stored user data:', error);
            get().logout();
          }
        }
      },

      // Login
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiClient.post('/auth/login', credentials);
          const { user, tokens } = response.data;
          
          localStorage.setItem('token', tokens.accessToken);
          localStorage.setItem('user', JSON.stringify(user));
          
          set({
            user,
            token: tokens.accessToken,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          return { success: true };
        } catch (error) {
          const errorInfo = handleApiError(error);
          set({
            isLoading: false,
            error: errorInfo.message
          });
          return { success: false, error: errorInfo.message };
        }
      },

      // Register
      register: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiClient.post('/auth/register', userData);
          set({ isLoading: false, error: null });
          return { success: true, data: response.data };
        } catch (error) {
          const errorInfo = handleApiError(error);
          set({
            isLoading: false,
            error: errorInfo.message
          });
          return { success: false, error: errorInfo.message };
        }
      },

      // Verify OTP
      verifyOTP: async (email, otp) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiClient.post('/auth/verify-otp', { email, otp });
          const { user, tokens } = response.data;
          
          localStorage.setItem('token', tokens.accessToken);
          localStorage.setItem('user', JSON.stringify(user));
          
          set({
            user,
            token: tokens.accessToken,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          return { success: true };
        } catch (error) {
          const errorInfo = handleApiError(error);
          set({
            isLoading: false,
            error: errorInfo.message
          });
          return { success: false, error: errorInfo.message };
        }
      },

      // Logout
      logout: async () => {
        try {
          await apiClient.post('/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null
          });
        }
      },

      // Refresh token
      refreshToken: async () => {
        try {
          const response = await apiClient.post('/auth/refresh');
          const { tokens } = response.data;
          
          localStorage.setItem('token', tokens.accessToken);
          set({ token: tokens.accessToken });
          
          return { success: true };
        } catch (error) {
          console.error('Token refresh failed:', error);
          get().logout();
          return { success: false };
        }
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Update user
      updateUser: (userData) => {
        const updatedUser = { ...get().user, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        set({ user: updatedUser });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

export { useAuthStore };