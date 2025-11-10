import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ stat }) => {
  const { label, value, icon: Icon, change, positive } = stat;

  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance hover:shadow-finance-lg transition-finance group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-finance ${
          positive ? 'bg-success/10 group-hover:bg-success/20' : 'bg-danger/10 group-hover:bg-danger/20'
        }`}>
          <Icon className={`w-6 h-6 ${positive ? 'text-success' : 'text-danger'}`} />
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium px-2 py-1 rounded-full ${
          positive ? 'text-success bg-success/10' : 'text-danger bg-danger/10'
        }`}>
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-3xl font-bold text-primary mb-1 transition-finance group-hover:text-accent">{value}</h3>
      <p className="text-sm text-secondary">{label}</p>
    </div>
  );
};

export default StatCard;