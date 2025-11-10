import { FileText, TrendingUp, DollarSign, Target } from 'lucide-react';

const ReportTypeSelector = ({ selectedType, onTypeChange }) => {
  const reportTypes = [
    { id: 'summary', name: 'Financial Summary', icon: FileText },
    { id: 'spending', name: 'Spending Analysis', icon: TrendingUp },
    { id: 'income', name: 'Income Report', icon: DollarSign },
    { id: 'budget', name: 'Budget Performance', icon: Target }
  ];

  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
      <h3 className="text-lg font-semibold mb-4 text-primary">Report Type</h3>
      <div className="space-y-2">
        {reportTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-finance ${
              selectedType === type.id 
                ? 'bg-accent text-surface shadow-finance' 
                : 'bg-background text-secondary hover:bg-surface'
            }`}
          >
            <type.icon className="w-5 h-5" />
            <span className="font-medium">{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportTypeSelector;