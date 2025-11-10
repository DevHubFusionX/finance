import { useState, useEffect } from 'react';
import { financeAPI } from '../services';
import { useAsyncOperation } from './useAsyncOperation';

export const useInsights = (timeframe = '30d') => {
  const [insights, setInsights] = useState(null);
  const { execute, loading } = useAsyncOperation();

  const fetchInsights = async () => {
    const data = await execute(
      () => financeAPI.getInsights(timeframe),
      'Failed to fetch insights'
    );
    setInsights(data);
  };

  useEffect(() => {
    fetchInsights();
  }, [timeframe]);

  return { insights, loading, refetch: fetchInsights };
};