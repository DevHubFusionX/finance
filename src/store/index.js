import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      // State
      transactions: [],
      categories: [],
      loading: false,

      // Actions
      setTransactions: transactions => set({ transactions }),
      setCategories: categories => set({ categories }),
      setLoading: loading => set({ loading }),

      // Computed Values
      getTotalIncome: () => {
        const { transactions } = get();
        return transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
      },

      getTotalExpenses: () => {
        const { transactions } = get();
        return transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
      },

      getBalance: () => {
        const { getTotalIncome, getTotalExpenses } = get();
        return getTotalIncome() - getTotalExpenses();
      },
    }),
    {
      name: 'finance-store',
      partialize: state => ({
        transactions: state.transactions,
        categories: state.categories,
      }),
    }
  )
);
