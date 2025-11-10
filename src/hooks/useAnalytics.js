import { useState, useMemo, useEffect } from 'react';
import { TrendingUp, DollarSign, PieChart, BarChart3 } from 'lucide-react';
import { financeAPI } from '../services';
import { useAsyncOperation } from './useAsyncOperation';

const useAnalytics = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [category, setCategory] = useState('all');
  const [analyticsData, setAnalyticsData] = useState(null);
  const { execute, loading } = useAsyncOperation();

  const fetchAnalytics = async () => {
    const data = await execute(
      () => financeAPI.getAnalytics(dateRange, category),
      'Failed to fetch analytics data'
    );
    setAnalyticsData(data);
  };

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange, category]);

  // Refresh analytics when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchAnalytics();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const insights = useMemo(() => {
    if (!analyticsData) return [];
    
    return [
      { label: 'Total Income', value: `$${(analyticsData.totalIncome || 0).toLocaleString()}`, icon: TrendingUp, color: 'text-success' },
      { label: 'Total Expenses', value: `$${(analyticsData.totalExpenses || 0).toLocaleString()}`, icon: DollarSign, color: 'text-danger' },
      { label: 'Net Savings', value: `$${(analyticsData.netSavings || 0).toLocaleString()}`, icon: BarChart3, color: 'text-accent' },
      { label: 'Transactions', value: (analyticsData.transactionCount || 0).toString(), icon: PieChart, color: 'text-info' }
    ];
  }, [analyticsData]);

  const categoryData = useMemo(() => {
    if (!analyticsData?.topCategories) return [];
    
    return analyticsData.topCategories.map(cat => ({
      name: cat.name,
      amount: cat.amount,
      percentage: Math.round(cat.percentage),
      color: 'bg-accent'
    }));
  }, [analyticsData]);

  const monthlyTrends = useMemo(() => {
    if (!analyticsData) return [];
    
    // Generate mock monthly data since we don't have it yet
    return [
      { month: 'Jan', income: analyticsData.totalIncome || 0, expenses: analyticsData.totalExpenses || 0 },
      { month: 'Feb', income: (analyticsData.totalIncome || 0) * 0.9, expenses: (analyticsData.totalExpenses || 0) * 0.8 },
      { month: 'Mar', income: (analyticsData.totalIncome || 0) * 1.1, expenses: (analyticsData.totalExpenses || 0) * 1.2 }
    ];
  }, [analyticsData]);

  const aiInsights = useMemo(() => {
    if (!analyticsData) return [];
    
    const insights = [];
    
    if ((analyticsData.netSavings || 0) > 0) {
      insights.push({
        type: 'positive',
        title: '✅ Positive Savings',
        message: `Great job! You saved $${(analyticsData.netSavings || 0).toLocaleString()} this period.`,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      });
    }
    
    if (analyticsData.topCategories?.length > 0) {
      const top = analyticsData.topCategories[0];
      insights.push({
        type: 'info',
        title: '📊 Top Spending Category',
        message: `${top.name} represents ${Math.round(top.percentage)}% of your expenses.`,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      });
    }
    
    return insights;
  }, [analyticsData]);

  const categories = ['Food & Dining', 'Transportation', 'Entertainment', 'Shopping', 'Utilities'];

  const exportData = () => {
    const data = {
      dateRange,
      category,
      ...filteredData,
      aiInsights,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${dateRange}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    insights,
    categoryData,
    monthlyTrends,
    aiInsights,
    dateRange,
    setDateRange,
    category,
    setCategory,
    categories,
    exportData,
    loading,
    refreshData: fetchAnalytics
  };
};



export default useAnalytics;