import { Calendar, Filter } from 'lucide-react';

const ReportFilters = ({ dateRange, selectedCategories, categories, onDateRangeChange, onCategoriesChange }) => {
  
  return (
    <div className="bg-surface border border-light rounded-xl p-4 shadow-finance">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg border border-light flex-1">
          <Calendar className="w-4 h-4 text-accent" />
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="bg-transparent text-primary focus:outline-none cursor-pointer w-full"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="365d">Last year</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg border border-light">
          <Filter className="w-4 h-4 text-accent" />
          <span className="text-sm text-primary">All Categories</span>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;