import { Target } from 'lucide-react';
import GoalCard from './GoalCard';

const GoalGrid = ({ goals, onEdit, onDelete }) => {
  if (goals.length === 0) {
    return (
      <div className="bg-surface rounded-xl p-12 text-center shadow-finance border border-light">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">No goals yet</h3>
        <p className="text-secondary">Start by creating your first financial goal</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {goals.map((goal) => (
        <GoalCard
          key={goal._id || goal.id}
          goal={goal}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default GoalGrid;