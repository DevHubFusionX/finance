import { Clock, TrendingUp, Target, DollarSign } from 'lucide-react';

const ProfileActivity = ({ activities = [] }) => {
  const defaultActivities = [
    {
      id: 1,
      type: 'goal',
      title: 'Emergency Fund Goal Completed',
      description: 'Reached $5,000 emergency fund target',
      timestamp: '2024-01-15T10:30:00Z',
      icon: Target,
      color: 'success'
    },
    {
      id: 2,
      type: 'transaction',
      title: 'Large Expense Added',
      description: 'Added $1,200 expense for car repair',
      timestamp: '2024-01-14T15:45:00Z',
      icon: DollarSign,
      color: 'warning'
    },
    {
      id: 3,
      type: 'budget',
      title: 'Monthly Budget Updated',
      description: 'Increased dining out budget by $200',
      timestamp: '2024-01-13T09:15:00Z',
      icon: TrendingUp,
      color: 'accent'
    }
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return time.toLocaleDateString();
  };

  return (
    <div className="bg-surface border border-light rounded-xl p-8 shadow-finance">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="w-6 h-6 text-accent" />
        <h3 className="text-xl font-semibold text-primary">Recent Activity</h3>
      </div>

      <div className="space-y-4">
        {displayActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg bg-background border border-light">
            <div className={`p-2 rounded-full bg-${activity.color}`}>
              <activity.icon className="w-5 h-5 text-surface" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-primary mb-1">{activity.title}</h4>
              <p className="text-sm text-secondary mb-2">{activity.description}</p>
              <span className="text-xs text-muted">{getTimeAgo(activity.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-accent hover:text-primary transition-colors">
        View All Activity
      </button>
    </div>
  );
};

export default ProfileActivity;