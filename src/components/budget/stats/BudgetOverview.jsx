import { Target, TrendingUp, AlertCircle } from 'lucide-react';
import BudgetStatCard from './BudgetStatCard';

const BudgetOverview = ({ budgets }) => {
  const totalBudgeted = budgets.reduce((sum, b) => sum + b.budgeted, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const overBudgetCount = budgets.filter(b => b.percentage > 100).length;

  const stats = [
    { icon: Target, value: `$${totalBudgeted.toLocaleString()}`, label: 'Total Budget', color: 'accent' },
    { icon: TrendingUp, value: `$${totalSpent.toLocaleString()}`, label: 'Total Spent', color: 'info' },
    { icon: AlertCircle, value: overBudgetCount, label: 'Over Budget', color: 'warning' }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <BudgetStatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default BudgetOverview;