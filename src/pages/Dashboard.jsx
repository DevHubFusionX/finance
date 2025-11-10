import { useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { StatsGrid, RecentTransactions, DashboardFilters } from '../components/dashboard';
import BackendInsights from '../components/dashboard/insights/BackendInsights';
import AIInsights from '../components/dashboard/insights/AIInsights';
import TransactionForm from '../components/dashboard/transactions/TransactionForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorToast from '../components/common/ErrorToast';
import { TourGuide, TourPrompt, WelcomeModal } from '../components/tour';
import { dashboardTour } from '../data/tourConfigs';
import { useTransactions, useCategories, useInsights } from '../hooks/useQueries';
import { useMemo } from 'react';
import { DollarSign, TrendingUp, BarChart3, Target } from 'lucide-react';
import { financeAPI } from '../services';
import { useCurrency } from '../hooks/useCurrency';

const Dashboard = () => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [dateRange, setDateRange] = useState('30d');
  const [transactionType, setTransactionType] = useState('all');
  const { formatAmount } = useCurrency();
  
  const { data: transactions = [], isLoading: transactionsLoading } = useTransactions();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: insights = {}, isLoading: insightsLoading } = useInsights(dateRange);
  
  const loading = transactionsLoading || categoriesLoading || insightsLoading;
  
  const stats = useMemo(() => {
    const { totalIncome = 0, totalExpenses = 0, netSavings = 0, savingsRate = 0 } = insights;
    
    return [
      {
        label: 'Net Savings',
        value: formatAmount(netSavings),
        icon: DollarSign,
        change: netSavings >= 0 ? '+' + netSavings.toFixed(0) + '%' : netSavings.toFixed(0) + '%',
        positive: netSavings >= 0
      },
      {
        label: 'Total Income',
        value: formatAmount(totalIncome),
        icon: TrendingUp,
        change: '+' + totalIncome.toFixed(0),
        positive: true
      },
      {
        label: 'Total Expenses',
        value: formatAmount(totalExpenses),
        icon: BarChart3,
        change: totalExpenses.toFixed(0),
        positive: false
      },
      {
        label: 'Savings Rate',
        value: `${savingsRate}%`,
        icon: Target,
        change: savingsRate.toFixed(0) + '%',
        positive: savingsRate > 20
      }
    ];
  }, [insights, formatAmount]);
  

  
  const refreshData = () => {
    window.location.reload();
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-surface border-b border-light px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">Dashboard</h1>
                <p className="text-sm sm:text-base text-secondary">Welcome back! Here's your financial overview.</p>
              </div>
              <button
                onClick={() => setShowTransactionForm(true)}
                className="flex items-center justify-center space-x-2 bg-accent text-surface px-6 py-3 rounded-lg shadow-finance hover:shadow-finance-lg transition-finance w-full sm:w-auto"
              >
                <Plus className="w-5 h-5" />
                <span>Add Transaction</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          <TourPrompt 
            tourName="dashboard"
            title="Welcome to Your Dashboard!"
            description="Let us show you around your financial dashboard and help you get started."
          />
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner text="Loading dashboard data..." />
            </div>
          ) : (
            <>
              <DashboardFilters
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                transactionType={transactionType}
                onTransactionTypeChange={setTransactionType}
                onRefresh={refreshData}
              />

              <div data-tour="stats">
                <StatsGrid stats={stats} />
              </div>

              <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div className="lg:col-span-2 order-2 lg:order-1" data-tour="recent-transactions">
                  <RecentTransactions 
                    transactions={transactions}
                    onAddTransaction={() => setShowTransactionForm(true)}
                  />
                </div>

                <div className="lg:col-span-1 space-y-4 sm:space-y-6 order-1 lg:order-2">
                  <div data-tour="ai-insights">
                    <AIInsights />
                  </div>
                  <div data-tour="insights">
                    <BackendInsights timeframe={dateRange} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Floating Action Button */}
      <button
        data-tour="add-transaction"
        onClick={() => setShowTransactionForm(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-accent text-surface rounded-full shadow-finance-lg hover:scale-110 transition-finance flex items-center justify-center z-50 lg:hidden"
        title="Add Transaction"
      >
        <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      
      <TransactionForm 
        isOpen={showTransactionForm}
        onClose={() => setShowTransactionForm(false)}
      />
      <TourGuide tourConfig={dashboardTour} />
      <WelcomeModal />
      <ErrorToast />
    </DashboardLayout>
  );
};

export default Dashboard;