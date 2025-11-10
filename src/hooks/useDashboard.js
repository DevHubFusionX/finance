import { useState, useMemo, useEffect } from 'react';
import {
  TrendingUp,
  DollarSign,
  Target,
  BarChart3,
  Download,
} from 'lucide-react';
import { useAsyncOperation } from './useAsyncOperation';
import { useFinanceStore } from '../store';

const useDashboard = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [transactionType, setTransactionType] = useState('all');
  const { execute, loading } = useAsyncOperation();

  const {
    transactions,
    getTotalIncome,
    getTotalExpenses,
    getBalance,
    initialize,
    fetchTransactions,
    fetchCategories,
  } = useFinanceStore();

  const rawStats = [
    {
      label: 'Total Balance',
      value: '$12,847.50',
      icon: DollarSign,
      change: '+5.2%',
      positive: true,
    },
    {
      label: 'Monthly Income',
      value: '$4,250.00',
      icon: TrendingUp,
      change: '+12.3%',
      positive: true,
    },
    {
      label: 'Monthly Expenses',
      value: '$2,840.75',
      icon: BarChart3,
      change: '-3.1%',
      positive: true,
    },
    {
      label: 'Savings Goal',
      value: '68%',
      icon: Target,
      change: 'On track',
      positive: true,
    },
  ];

  // Get transactions from store
  const rawTransactions = transactions || [];

  const actions = [
    { id: 'budget', label: 'Set Budget Goal' },
    { id: 'import', label: 'Import CSV Data' },
    { id: 'export', label: 'Export Data', icon: Download },
    { id: 'analytics', label: 'View Analytics' },
    { id: 'refresh', label: 'Reset All Data' },
  ];

  const filteredTransactions = useMemo(() => {
    let filtered = rawTransactions;

    if (transactionType !== 'all') {
      filtered = filtered.filter(t => t.type === transactionType);
    }

    // Apply date range filter
    const now = new Date();
    const days = { '7d': 7, '30d': 30, '90d': 90 };
    const cutoffDate = new Date(now);
    cutoffDate.setDate(cutoffDate.getDate() - (days[dateRange] || 30));

    filtered = filtered.filter(t => new Date(t.date) >= cutoffDate);

    return filtered;
  }, [rawTransactions, transactionType, dateRange]);

  const handleActionClick = actionId => {
    switch (actionId) {
      case 'budget':
        window.location.href = '/budget';
        break;
      case 'import':
        importCSV();
        break;
      case 'export':
        exportData();
        break;
      case 'analytics':
        window.location.href = '/analytics';
        break;
      case 'refresh':
        execute(async () => {
          // Clear backend data
          await fetch('http://localhost:3001/api/transactions', {
            method: 'DELETE',
          });
          // Clear frontend cache
          localStorage.removeItem('finance-store');
          window.location.reload();
        }, 'Failed to reset data');
        break;
    }
  };

  const importCSV = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async e => {
      const file = e.target.files[0];
      if (file) {
        await execute(async () => {
          // Simple CSV parsing - in production, use a proper CSV parser
          const text = await file.text();
          const lines = text.split('\n');
          const headers = lines[0].split(',');

          // Expected format: date,type,amount,category,description
          for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length >= 4) {
              const transaction = {
                date: values[0]?.trim(),
                type: values[1]?.trim(),
                amount: parseFloat(values[2]?.trim()),
                category: values[3]?.trim(),
                description: values[4]?.trim() || '',
              };

              if (transaction.date && transaction.type && transaction.amount) {
                await fetch('http://localhost:3001/api/transactions', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(transaction),
                });
              }
            }
          }

          await refreshData();
        }, 'Failed to import CSV');
      }
    };
    input.click();
  };

  useEffect(() => {
    execute(() => initialize(), 'Failed to load dashboard data');
  }, [execute, initialize]);

  const stats = useMemo(() => {
    const income = getTotalIncome();
    const expenses = getTotalExpenses();
    const balance = getBalance();
    const savingsRate =
      income > 0 ? (((income - expenses) / income) * 100).toFixed(1) : 0;

    return [
      {
        label: 'Total Balance',
        value: balance.toFixed(2),
        icon: DollarSign,
        change: balance >= 0 ? '+' : '-',
        positive: balance >= 0,
        isAmount: true,
      },
      {
        label: 'Monthly Income',
        value: income.toFixed(2),
        icon: TrendingUp,
        change: `${income > 0 ? '+' : ''}${income.toFixed(2)}`,
        positive: income > 0,
        isAmount: true,
      },
      {
        label: 'Monthly Expenses',
        value: expenses.toFixed(2),
        icon: BarChart3,
        change: `-${expenses.toFixed(2)}`,
        positive: false,
        isAmount: true,
      },
      {
        label: 'Savings Rate',
        value: `${savingsRate}%`,
        icon: Target,
        change: savingsRate > 20 ? 'Good' : 'Low',
        positive: savingsRate > 20,
        isAmount: false,
      },
    ];
  }, [getTotalIncome, getTotalExpenses, getBalance]);

  const exportData = async () => {
    await execute(async () => {
      const data = {
        stats,
        transactions: filteredTransactions,
        insights,
        dateRange,
        exportedAt: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-data-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'Failed to export data');
  };

  const refreshData = async () => {
    await execute(async () => {
      await Promise.all([fetchTransactions(), fetchCategories()]);
    }, 'Failed to refresh data');
  };

  return {
    stats,
    transactions: filteredTransactions,
    actions,
    dateRange,
    setDateRange,
    transactionType,
    setTransactionType,
    handleActionClick,
    refreshData,
    loading,
  };
};

export default useDashboard;
