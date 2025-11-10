const InsightCard = ({ insight }) => {
  const { type, icon: Icon, message, recommendation, color } = insight;

  const colorClasses = {
    success: 'bg-success/10 border-success/20 text-success',
    danger: 'bg-danger/10 border-danger/20 text-danger',
    info: 'bg-info/10 border-info/20 text-info',
    accent: 'bg-accent/10 border-accent/20 text-accent'
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]?.split(' ').slice(1, 3).join(' ') || 'border-light'} bg-background hover:shadow-finance transition-finance group`}>
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses[color]?.split(' ')[0] || 'bg-accent/10'} group-hover:scale-110 transition-finance`}>
          <Icon className={`w-5 h-5 ${colorClasses[color]?.split(' ')[2] || 'text-accent'}`} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">{type}</p>
          <p className="text-primary font-semibold mb-1">{message}</p>
          <p className="text-sm text-secondary">{recommendation}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;