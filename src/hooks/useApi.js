import { useState, useCallback } from 'react';
import { handleApiError } from '../utils/errorHandler';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall, options = {}) => {
    const { onSuccess, onError, showLoading = true } = options;
    
    try {
      if (showLoading) setLoading(true);
      setError(null);
      
      const response = await apiCall();
      
      if (onSuccess) onSuccess(response.data);
      return { success: true, data: response.data };
      
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
      
      if (onError) onError(errorInfo);
      return { success: false, error: errorInfo.message };
      
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { execute, loading, error, clearError };
};