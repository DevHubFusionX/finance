import { TrendingUp, TrendingDown } from 'lucide-react';

const GoalStatCard = ({ icon: Icon, value, label, color, change, positive }) => {
  const colorClasses = {
    success: 'bg-success/10 text-success',
    danger: 'bg-danger/10 text-danger',
    accent: 'bg-accent/10 text-accent',
    info: 'bg-info/10 text-info'
  };

  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance hover:shadow-finance-lg transition-finance group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]?.split(' ')[0] || 'bg-accent/10'} group-hover:scale-110 transition-finance`}>
          <Icon className={`w-6 h-6 ${colorClasses[color]?.split(' ')[1] || 'text-accent'}`} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full ${
            positive ? 'text-success bg-success/10' : 'text-secondary bg-background'
          }`}>
            {positive && <TrendingUp className="w-3 h-3" />}
            <span>{change}</span>
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold text-primary mb-1 group-hover:text-accent transition-finance">{value}</h3>
      <p className="text-sm text-secondary">{label}</p>
    </div>
  );
};

export default GoalStatCard;