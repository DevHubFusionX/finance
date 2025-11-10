import { Calendar, Edit2, Trash2, CheckCircle, Flag } from 'lucide-react';
import { useCurrency } from '../../../hooks/useCurrency';

const GoalCard = ({ goal, onEdit, onDelete }) => {
  const { formatAmount } = useCurrency();
  const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
  const isCompleted = goal.status === 'completed';
  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);
  const deadline = new Date(goal.deadline);
  const daysLeft = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-success';
    if (progress >= 75) return 'bg-accent';
    if (progress >= 50) return 'bg-info';
    return 'bg-warning';
  };

  const getPriorityColor = (priority) => {
    if (priority === 'high') return 'text-danger bg-danger/10';
    if (priority === 'medium') return 'text-warning bg-warning/10';
    return 'text-info bg-info/10';
  };

  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance hover:shadow-finance-lg hover:border-accent transition-finance relative group">
      {isCompleted && (
        <div className="absolute top-4 right-4">
          <CheckCircle className="w-6 h-6 text-success" />
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full ${getPriorityColor(goal.priority)}`}>
              {goal.priority}
            </span>
            <span className="text-xs text-secondary">{goal.category}</span>
          </div>
          <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-finance">{goal.name}</h3>
          {goal.description && (
            <p className="text-sm text-secondary mt-1 line-clamp-2">{goal.description}</p>
          )}
        </div>
        <div className="flex space-x-1">
          <button 
            onClick={() => onEdit(goal)}
            className="p-2 rounded-lg hover:bg-background transition-finance"
          >
            <Edit2 className="w-4 h-4 text-secondary" />
          </button>
          <button 
            onClick={() => onDelete(goal._id || goal.id)}
            className="p-2 rounded-lg hover:bg-danger/10 transition-finance"
          >
            <Trash2 className="w-4 h-4 text-danger" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-secondary">Progress</span>
          <span className={`font-bold ${
            progress >= 100 ? 'text-success' : 
            progress >= 75 ? 'text-accent' : 'text-info'
          }`}>
            {progress.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-background rounded-full h-3 mb-2">
          <div
            className={`h-3 rounded-full transition-all ${getProgressColor(progress)}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-secondary">{formatAmount(goal.currentAmount)}</span>
          <span className="text-primary font-semibold">{formatAmount(goal.targetAmount)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-light">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4 text-accent" />
          <span className={`text-sm font-medium ${
            daysLeft < 0 ? 'text-danger' : daysLeft < 30 ? 'text-warning' : 'text-secondary'
          }`}>
            {daysLeft < 0 ? 'Overdue' : `${daysLeft} days left`}
          </span>
        </div>
        <span className="text-sm font-bold text-primary">
          {isCompleted ? '✅ Achieved!' : `${formatAmount(remaining)} to go`}
        </span>
      </div>
    </div>
  );
};

export default GoalCard;