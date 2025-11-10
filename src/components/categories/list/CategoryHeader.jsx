import { Tag } from 'lucide-react';

const CategoryHeader = ({ type, count }) => {
  const config = {
    expense: { color: 'danger', label: 'Expense Categories' },
    income: { color: 'success', label: 'Income Categories' }
  };

  const { color, label } = config[type];

  return (
    <div className="flex items-center space-x-2 mb-6">
      <Tag className={`w-6 h-6 text-${color}`} />
      <h3 className="text-xl font-bold text-primary">{label}</h3>
      <span className={`text-sm px-2 py-1 rounded-full bg-${color}/10 text-${color}`}>
        {count}
      </span>
    </div>
  );
};

export default CategoryHeader;