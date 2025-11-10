import { Target, BarChart3, Tag, Download, Trash2 } from 'lucide-react';

const iconMap = {
  budget: Target,
  analytics: BarChart3,
  categories: Tag,
  export: Download,
  reset: Trash2
};

const ActionButton = ({ action, onClick }) => {
  const { label, id } = action;
  const Icon = iconMap[id];

  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-background rounded-lg hover:bg-accent/10 hover:border-accent transition-finance border border-light group"
    >
      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-accent/20 group-hover:scale-110 transition-finance">
        {Icon && <Icon className="w-5 h-5 text-accent" />}
      </div>
      <span className="text-sm font-medium text-primary text-center">{label}</span>
    </button>
  );
};

export default ActionButton;