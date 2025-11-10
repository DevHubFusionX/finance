import { Calendar, Filter } from 'lucide-react';

const AnalyticsFilters = ({ 
  dateRange, 
  onDateRangeChange, 
  category, 
  onCategoryChange,
  categories 
}) => {
  return (
    <div className="bg-surface border border-light rounded-xl p-4 shadow-finance">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg border border-light">
          <Calendar className="w-4 h-4 text-accent" />
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="bg-transparent text-primary focus:outline-none cursor-pointer"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="365d">Last year</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg border border-light">
          <Filter className="w-4 h-4 text-accent" />
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-transparent text-primary focus:outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsFilters;