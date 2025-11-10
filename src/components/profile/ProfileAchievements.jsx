import { Award } from 'lucide-react';

const ProfileAchievements = ({ achievements = [] }) => {
  const defaultAchievements = [
    { title: 'First Goal Completed', description: 'Completed your first financial goal', date: '2023-03-15', earned: true },
    { title: 'Consistent Tracker', description: 'Tracked expenses for 30 consecutive days', date: '2023-04-20', earned: true },
    { title: 'Budget Master', description: 'Stayed within budget for 3 months', date: '2023-07-10', earned: true },
    { title: 'Savings Champion', description: 'Saved $10,000 in total', date: null, earned: false }
  ];

  const displayAchievements = achievements.length > 0 ? achievements : defaultAchievements;

  return (
    <div className="bg-surface border border-light rounded-xl p-8 shadow-finance">
      <h3 className="text-xl font-semibold mb-6 text-primary">Achievements</h3>
      <div className="space-y-4">
        {displayAchievements.map((achievement) => (
          <div
            key={achievement.title}
            className={`flex items-center space-x-4 p-4 rounded-lg ${
              achievement.earned ? 'bg-success/10 border border-success/20' : 'bg-background border border-light opacity-50'
            }`}
          >
            <div className={`p-3 rounded-full ${
              achievement.earned ? 'bg-success' : 'bg-secondary'
            }`}>
              <Award className="w-6 h-6 text-surface" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-primary">{achievement.title}</h4>
              <p className="text-sm text-secondary">{achievement.description}</p>
              {achievement.earned && achievement.date && (
                <p className="text-xs mt-1 text-success">
                  Earned on {new Date(achievement.date).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAchievements;