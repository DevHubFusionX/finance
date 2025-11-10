const BudgetStatCard = ({ icon: Icon, value, label, color }) => {
  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
      <Icon className={`w-8 h-8 mb-4 text-${color}`} />
      <h3 className="text-2xl font-bold mb-1 text-primary">{value}</h3>
      <p className="text-secondary">{label}</p>
    </div>
  );
};

export default BudgetStatCard;