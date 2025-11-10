import { Edit3, Trash2 } from 'lucide-react';
import { useCurrency } from '../../../hooks/useCurrency';

const BudgetItem = ({ budget, onEdit, onDelete }) => {
  const { formatAmount } = useCurrency();
  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-danger';
    if (percentage >= 80) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance hover:shadow-finance-lg transition-finance">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 rounded-full bg-accent"></div>
          <h3 className="text-lg font-semibold text-primary">{budget.name}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onEdit(budget)}
            className="p-2 rounded-lg hover:bg-background transition-finance"
          >
            <Edit3 className="w-4 h-4 text-secondary" />
          </button>
          <button 
            onClick={() => onDelete(budget._id || budget.id)}
            className="p-2 rounded-lg hover:bg-background transition-finance"
          >
            <Trash2 className="w-4 h-4 text-danger" />
          </button>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-secondary">
            {formatAmount(budget.spent || 0)} of {formatAmount(budget.amount || 0)}
          </span>
          <span className={`font-medium ${
            ((budget.spent / budget.amount) * 100 || 0) >= 100 ? 'text-danger' : 
            ((budget.spent / budget.amount) * 100 || 0) >= 80 ? 'text-warning' : 'text-success'
          }`}>
            {((budget.spent / budget.amount) * 100 || 0).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-background rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${getProgressColor((budget.spent / budget.amount) * 100 || 0)}`}
            style={{ width: `${Math.min((budget.spent / budget.amount) * 100 || 0, 100)}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-secondary">
        {(budget.amount - budget.spent) > 0 
          ? `${formatAmount(budget.amount - budget.spent)} remaining`
          : `${formatAmount(Math.abs(budget.amount - budget.spent))} over budget`
        }
      </p>
    </div>
  );
};

export default BudgetItem;