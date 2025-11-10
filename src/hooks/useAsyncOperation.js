import { useState, useCallback } from 'react';
import { useErrorStore } from '../store/errorStore';

export const useAsyncOperation = () => {
  const [loading, setLoading] = useState(false);
  const { addError } = useErrorStore();

  const execute = useCallback(async (operation, errorMessage = 'Operation failed') => {
    try {
      setLoading(true);
      const result = await operation();
      return result;
    } catch (error) {
      console.error('Async operation failed:', error);
      addError({
        message: errorMessage,
        details: error.message,
        type: 'error'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [addError]);

  return { execute, loading };
};