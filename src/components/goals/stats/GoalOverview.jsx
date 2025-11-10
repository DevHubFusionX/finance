import { Target, CheckCircle, DollarSign, TrendingUp } from 'lucide-react';
import GoalStatCard from './GoalStatCard';
import { useCurrency } from '../../../hooks/useCurrency';

const GoalOverview = ({ goals }) => {
  const { formatAmount } = useCurrency();
  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const activeGoals = goals.filter(g => g.status === 'active').length;
  const totalSaved = goals.reduce((sum, g) => sum + (g.currentAmount || 0), 0);
  const totalTarget = goals.reduce((sum, g) => sum + (g.targetAmount || 0), 0);
  const overallProgress = totalTarget > 0 ? ((totalSaved / totalTarget) * 100).toFixed(1) : 0;

  const stats = [
    { icon: Target, value: activeGoals, label: 'Active Goals', color: 'accent', change: `${totalGoals} total`, positive: true },
    { icon: CheckCircle, value: completedGoals, label: 'Completed', color: 'success', change: `${((completedGoals/totalGoals)*100 || 0).toFixed(0)}%`, positive: true },
    { icon: DollarSign, value: formatAmount(totalSaved), label: 'Total Saved', color: 'info', change: `${overallProgress}%`, positive: true },
    { icon: TrendingUp, value: formatAmount(totalTarget), label: 'Target Amount', color: 'accent', change: `${formatAmount(totalTarget - totalSaved)} left`, positive: false }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <GoalStatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default GoalOverview;