import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target, DollarSign } from 'lucide-react';
import { useFinanceStore } from '../store';
import { formatCurrency } from '../utils';

const FinancialIntelligence = () => {
  const { 
    transactions, 
    categories, 
    budgets, 
    goals, 
    getTotalIncome, 
    getTotalExpenses, 
    getSpendingForecast,
    getCategoryInsights 
  } = useFinanceStore();

  const [insights, setInsights] = useState([]);

  const generateInsights = () => {
    const newInsights = [];
    const totalIncome = getTotalIncome();
    const totalExpenses = getTotalExpenses();
    const forecast = getSpendingForecast();
    const categoryInsights = getCategoryInsights();

    // Savings Rate Analysis
    if (totalIncome > 0) {
      const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
      if (savingsRate < 20) {
        newInsights.push({
          type: 'warning',
          icon: AlertTriangle,
          title: 'Low Savings Rate',
          message: `You're saving ${savingsRate.toFixed(1)}% of income. Aim for 20%+`,
          action: 'Review expenses and increase savings'
        });
      } else {
        newInsights.push({
          type: 'success',
          icon: TrendingUp,
          title: 'Great Savings Rate',
          message: `You're saving ${savingsRate.toFixed(1)}% of income. Keep it up!`,
          action: 'Consider investing surplus funds'
        });
      }
    }

    // Top Spending Category
    if (categoryInsights.length > 0) {
      const topCategory = categoryInsights[0];
      const percentage = (topCategory.total / totalExpenses) * 100;
      if (percentage > 40) {
        newInsights.push({
          type: 'info',
          icon: Lightbulb,
          title: 'Spending Concentration',
          message: `${topCategory.name} accounts for ${percentage.toFixed(1)}% of expenses`,
          action: 'Consider diversifying spending or finding savings'
        });
      }
    }

    // Budget Performance
    if (budgets.length > 0) {
      const overBudget = budgets.filter(b => {
        const spent = transactions
          .filter(t => t.type === 'expense' && t.categoryId === b.categoryId)
          .reduce((sum, t) => sum + t.amount, 0);
        return spent > b.amount;
      });

      if (overBudget.length > 0) {
        newInsights.push({
          type: 'warning',
          icon: AlertTriangle,
          title: 'Budget Exceeded',
          message: `${overBudget.length} budget${overBudget.length > 1 ? 's' : ''} exceeded`,
          action: 'Review spending patterns and adjust budgets'
        });
      }
    }

    // Goal Progress
    if (goals.length > 0) {
      const achievableGoals = goals.filter(g => {
        const daysLeft = Math.ceil((new Date(g.targetDate) - new Date()) / (1000 * 60 * 60 * 24));
        const needed = g.targetAmount - g.currentAmount;
        const dailyRequired = needed / daysLeft;
        return dailyRequired <= forecast.dailyAverage * 0.3; // 30% of daily spending
      });

      if (achievableGoals.length > 0) {
        newInsights.push({
          type: 'success',
          icon: Target,
          title: 'Goals Within Reach',
          message: `${achievableGoals.length} goal${achievableGoals.length > 1 ? 's' : ''} achievable with current savings`,
          action: 'Stay consistent with your saving habits'
        });
      }
    }

    // Spending Trend
    if (forecast.dailyAverage > 0) {
      const monthlyForecast = forecast.monthlyForecast;
      if (monthlyForecast > totalIncome * 0.8) {
        newInsights.push({
          type: 'warning',
          icon: TrendingUp,
          title: 'High Spending Trend',
          message: `Projected monthly spending: ${formatCurrency(monthlyForecast)}`,
          action: 'Consider reducing discretionary expenses'
        });
      }
    }

    // Investment Opportunity
    const balance = totalIncome - totalExpenses;
    if (balance > 1000) {
      newInsights.push({
        type: 'info',
        icon: DollarSign,
        title: 'Investment Opportunity',
        message: `You have ${formatCurrency(balance)} available for investment`,
        action: 'Consider diversified investment options'
      });
    }

    setInsights(newInsights);
  };

  useEffect(() => {
    generateInsights();
  }, [transactions, budgets, goals]);

  const getIconColor = (type) => {
    switch (type) {
      case 'success': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'info': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'info': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default: return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  return (
    <div className="bg-background dark:bg-gray-800 border border-accent/10 dark:border-gray-700 rounded-2xl p-6">
      <div className="flex items-center mb-6">
        <Brain className="w-6 h-6 mr-3 text-primary dark:text-gray-200" />
        <h3 className="text-xl font-bold text-primary dark:text-gray-200">AI Financial Intelligence</h3>
      </div>

      {insights.length === 0 ? (
        <div className="text-center py-8">
          <Brain className="w-12 h-12 mx-auto mb-4 text-accent dark:text-gray-400 opacity-50" />
          <p className="text-accent dark:text-gray-400">Add more transactions to get personalized insights</p>
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border ${getBgColor(insight.type)}`}
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    className="w-5 h-5 mt-0.5 flex-shrink-0" 
                    style={{ color: getIconColor(insight.type) }} 
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary dark:text-gray-200 mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-accent dark:text-gray-400 mb-2">
                      {insight.message}
                    </p>
                    <p className="text-xs font-medium" style={{ color: getIconColor(insight.type) }}>
                      💡 {insight.action}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-6 p-4 bg-accent/5 dark:bg-gray-700/50 rounded-xl">
        <p className="text-xs text-accent dark:text-gray-400 text-center">
          Insights update automatically as you add transactions and set goals
        </p>
      </div>
    </div>
  );
};

export default FinancialIntelligence;