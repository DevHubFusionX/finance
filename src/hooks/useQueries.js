import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { financeAPI } from '../services';

// Query Keys
export const QUERY_KEYS = {
  transactions: ['transactions'],
  categories: ['categories']
};

// Transactions
export const useTransactions = () => {
  return useQuery({
    queryKey: QUERY_KEYS.transactions,
    queryFn: financeAPI.getTransactions
  });
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: financeAPI.createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories });
      queryClient.invalidateQueries({ queryKey: ['insights'] });
    }
  });
};

// Categories
export const useCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: financeAPI.getCategories
  });
};

// Insights
export const useInsights = (timeframe = '30d') => {
  return useQuery({
    queryKey: ['insights', timeframe],
    queryFn: () => financeAPI.getInsights(timeframe)
  });
};

// Budgets
export const useBudgets = () => {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: financeAPI.getBudgets
  });
};

export const useAddBudget = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: financeAPI.createBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    }
  });
};

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => financeAPI.updateBudget(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    }
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: financeAPI.deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    }
  });
};

// Categories mutations
export const useAddCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: financeAPI.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories });
    }
  });
};