import { Zap } from 'lucide-react';
import ActionButton from './ActionButton';

const QuickActions = ({ actions, onActionClick }) => {
  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-bold text-primary">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <ActionButton 
            key={index} 
            action={action} 
            onClick={() => onActionClick(action.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;