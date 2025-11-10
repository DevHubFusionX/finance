import { TrendingUp, TrendingDown, Tag, BarChart3 } from 'lucide-react';
import StatCard from './stats/StatCard';

const CategoryStats = ({ categories }) => {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');
  const customCategories = categories.filter(c => !c.isDefault);

  const stats = [
    { label: 'Total', value: categories.length, icon: Tag, color: 'accent' },
    { label: 'Expense', value: expenseCategories.length, icon: TrendingDown, color: 'danger' },
    { label: 'Income', value: incomeCategories.length, icon: TrendingUp, color: 'success' },
    { label: 'Custom', value: customCategories.length, icon: BarChart3, color: 'info' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
};

export default CategoryStats;