import { Calendar, Filter } from 'lucide-react';

const ReportActions = ({ onScheduleReport, onCustomFilters }) => {
  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
      <h3 className="text-lg font-semibold mb-4 text-primary">Quick Actions</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <button 
          onClick={onScheduleReport}
          className="flex items-center space-x-3 p-4 bg-background rounded-lg text-left hover:bg-surface transition-finance border border-light"
        >
          <Calendar className="w-5 h-5 text-info" />
          <div>
            <h4 className="font-medium text-primary">Schedule Report</h4>
            <p className="text-sm text-secondary">Auto-generate monthly reports</p>
          </div>
        </button>
        <button 
          onClick={onCustomFilters}
          className="flex items-center space-x-3 p-4 bg-background rounded-lg text-left hover:bg-surface transition-finance border border-light"
        >
          <Filter className="w-5 h-5 text-warning" />
          <div>
            <h4 className="font-medium text-primary">Custom Filters</h4>
            <p className="text-sm text-secondary">Create advanced report filters</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ReportActions;