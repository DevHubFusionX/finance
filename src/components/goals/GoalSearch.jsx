import { Search, Filter } from 'lucide-react';

const GoalSearch = ({ searchTerm, onSearchChange, filterStatus, onFilterChange }) => {
  return (
    <div className="bg-surface border border-light rounded-xl p-4 shadow-finance">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-accent" />
          <input
            type="text"
            placeholder="Search goals..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent transition-finance"
          />
        </div>
        <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg border border-light">
          <Filter className="w-4 h-4 text-accent" />
          <select
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value)}
            className="bg-transparent text-primary focus:outline-none cursor-pointer"
          >
            <option value="all">All Goals</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GoalSearch;