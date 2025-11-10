import { create } from 'zustand';

export const useErrorStore = create((set, get) => ({
  errors: [],
  
  addError: (error) => {
    const errorObj = {
      id: Date.now(),
      message: error.message || 'An unexpected error occurred',
      type: error.type || 'error',
      timestamp: new Date().toISOString(),
      details: error.details || null
    };
    
    set(state => ({
      errors: [errorObj, ...state.errors.slice(0, 9)] // Keep only last 10 errors
    }));
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
      get().removeError(errorObj.id);
    }, 5000);
  },
  
  removeError: (id) => {
    set(state => ({
      errors: state.errors.filter(error => error.id !== id)
    }));
  },
  
  clearErrors: () => {
    set({ errors: [] });
  }
}));