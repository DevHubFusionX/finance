import { useMemo } from 'react';
import { Download, RefreshCw, TrendingUp, DollarSign, BarChart3, PieChart, BarChart2 } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { MetricsOverview, CategoryChart, TrendsChart, AIInsights, AnalyticsFilters } from '../components/analytics';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { TourGuide, TourPrompt } from '../components/tour';
import { analyticsTour } from '../data/tourConfigs';
import { useTransactions, useCategories } from '../hooks/useQueries';
import useAnalytics from '../hooks/useAnalytics';
import { useCurrency } from '../hooks/useCurrency';

const Analytics = () => {
  const {
    dateRange,
    setDateRange,
    category,
    setCategory,
    categories,
    exportData
  } = useAnalytics();
  const { formatAmount } = useCurrency();

  const { data: transactions = [], isLoading: transactionsLoading } = useTransactions();
  const { isLoading: categoriesLoading } = useCategories();
  const isLoading = transactionsLoading || categoriesLoading;

  const analyticsData = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netSavings = income - expenses;
    const savingsRate = income > 0 ? ((netSavings / income) * 100).toFixed(1) : 0;

    return {
      summary: {
        totalIncome: income,
        totalExpenses: expenses,
        netSavings,
        savingsRate,
        transactionCount: transactions.length
      }
    };
  }, [transactions]);

  const refetch = () => window.location.reload();

  const insights = useMemo(() => analyticsData?.summary ? [
    { label: 'Total Income', value: formatAmount(analyticsData.summary.totalIncome), icon: TrendingUp, color: 'success', change: '+' + analyticsData.summary.totalIncome.toFixed(0), positive: true },
    { label: 'Total Expenses', value: formatAmount(analyticsData.summary.totalExpenses), icon: DollarSign, color: 'danger', change: analyticsData.summary.totalExpenses.toFixed(0), positive: false },
    { label: 'Net Savings', value: formatAmount(analyticsData.summary.netSavings), icon: BarChart3, color: 'accent', change: analyticsData.summary.netSavings >= 0 ? 'Positive' : 'Negative', positive: analyticsData.summary.netSavings >= 0 },
    { label: 'Savings Rate', value: `${analyticsData.summary.savingsRate}%`, icon: BarChart2, color: 'info', change: analyticsData.summary.savingsRate + '%', positive: analyticsData.summary.savingsRate > 20 }
  ] : [], [analyticsData, formatAmount]);

  const categoryData = analyticsData?.categoryBreakdown?.map(cat => ({
    name: cat.category,
    amount: cat.total,
    percentage: Math.round(cat.percentage),
    color: 'bg-accent'
  })) || [];

  const monthlyTrends = analyticsData?.monthlyTrends?.map(trend => ({
    month: new Date(trend.month + '-01').toLocaleDateString('en', { month: 'short' }),
    income: trend.income,
    expenses: trend.expenses
  })) || [];

  const aiInsights = useMemo(() => {
    const result = [];
    if (analyticsData?.summary) {
      if (analyticsData.summary.netSavings > 0) {
        result.push({
          type: 'positive',
          title: '✅ Positive Savings',
          message: `Great job! You saved ${formatAmount(analyticsData.summary.netSavings)} this period.`,
          bgColor: 'bg-success/5',
          borderColor: 'border-success/20'
        });
      } else if (analyticsData.summary.netSavings < 0) {
        result.push({
          type: 'warning',
          title: '⚠️ Spending Alert',
          message: `You spent ${formatAmount(Math.abs(analyticsData.summary.netSavings))} more than you earned.`,
          bgColor: 'bg-danger/5',
          borderColor: 'border-danger/20'
        });
      }
      if (analyticsData.summary.savingsRate > 20) {
        result.push({
          type: 'achievement',
          title: '🎯 Excellent Savings Rate',
          message: `Your ${analyticsData.summary.savingsRate}% savings rate is above the recommended 20%.`,
          bgColor: 'bg-info/5',
          borderColor: 'border-info/20'
        });
      }
    }
    return result;
  }, [analyticsData]);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-surface border-b border-light px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-7 h-7 text-accent" />
                  <h1 className="text-2xl sm:text-3xl font-bold text-primary">Analytics</h1>
                </div>
                <p className="text-sm sm:text-base text-secondary">Detailed insights into your financial patterns and trends.</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => refetch()}
                  className="flex items-center space-x-2 bg-background border border-light text-primary px-4 py-2 rounded-lg font-medium hover:bg-accent/10 hover:border-accent transition-finance"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
                <button
                  onClick={exportData}
                  className="flex items-center space-x-2 bg-accent text-surface px-4 py-2 rounded-lg font-medium shadow-finance hover:shadow-finance-lg transition-finance"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          <TourPrompt
            tourName="analytics"
            title="Analytics & Insights Guide"
            description="Discover how to analyze your financial data and gain valuable insights."
          />

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner text="Loading analytics data..." />
            </div>
          ) : (
            <>
              <div data-tour="time-filters">
                <AnalyticsFilters
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                  category={category}
                  onCategoryChange={setCategory}
                  categories={categories}
                />
              </div>

              <div data-tour="analytics-overview">
                <MetricsOverview insights={insights} />
              </div>

              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                <div data-tour="category-breakdown">
                  <CategoryChart categoryData={categoryData} />
                </div>
                <div data-tour="spending-trends">
                  <TrendsChart monthlyTrends={monthlyTrends} />
                </div>
              </div>

              <AIInsights insights={aiInsights} />
            </>
          )}
        </div>
      </div>
      <TourGuide tourConfig={analyticsTour} />
    </DashboardLayout>
  );
};

export default Analytics;