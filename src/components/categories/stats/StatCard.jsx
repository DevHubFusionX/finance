const StatCard = ({ stat }) => {
  const { label, value, icon: Icon, color } = stat;

  const colorClasses = {
    success: 'bg-success/10 text-success',
    danger: 'bg-danger/10 text-danger',
    accent: 'bg-accent/10 text-accent',
    info: 'bg-info/10 text-info'
  };

  return (
    <div className="bg-surface border border-light rounded-xl p-4 shadow-finance hover:shadow-finance-lg transition-finance group">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 ${colorClasses[color]?.split(' ')[0] || 'bg-accent/10'} group-hover:scale-110 transition-finance`}>
        <Icon className={`w-5 h-5 ${colorClasses[color]?.split(' ')[1] || 'text-accent'}`} />
      </div>
      <div className="text-2xl font-bold text-primary text-center mb-1">{value}</div>
      <div className="text-xs text-secondary text-center">{label}</div>
    </div>
  );
};

export default StatCard;