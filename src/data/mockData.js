// Mock data for development and testing
export const mockTransactions = [
  {
    id: 1,
    type: 'expense',
    amount: 45.99,
    category: 'food',
    description: 'Grocery shopping',
    date: '2024-01-15',
  },
  {
    id: 2,
    type: 'expense',
    amount: 12.50,
    category: 'transport',
    description: 'Bus fare',
    date: '2024-01-14',
  },
  {
    id: 3,
    type: 'income',
    amount: 2500.00,
    category: 'salary',
    description: 'Monthly salary',
    date: '2024-01-01',
  },
];

export const mockInsights = {
  totalSpent: 1245.67,
  totalIncome: 2500.00,
  topCategory: 'food',
  forecast: {
    nextMonth: 1300.00,
    confidence: 0.85,
  },
  trends: {
    spending: 'increasing',
    percentage: 12.5,
  },
};