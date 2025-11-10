import { Calendar, Award, User, Shield } from 'lucide-react';

const ProfileStats = ({ stats = [] }) => {
  const defaultStats = [
    { label: 'Days Active', value: '342', icon: Calendar },
    { label: 'Goals Achieved', value: '12', icon: Award },
    { label: 'Transactions', value: '1,247', icon: User },
    { label: 'Savings Rate', value: '23%', icon: Shield }
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <div className="mt-6 bg-surface border border-light rounded-xl p-6 shadow-finance">
      <h3 className="text-lg font-semibold mb-4 text-primary">Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        {displayStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent" />
            <div className="text-xl font-bold text-primary">{stat.value}</div>
            <div className="text-xs text-secondary">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;