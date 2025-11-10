import { Search, Filter } from 'lucide-react';

const CategorySearch = ({ searchTerm, onSearchChange, filterType, onFilterChange }) => {
  return (
    <div className="bg-surface border border-light rounded-xl p-4 shadow-finance">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-accent" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent transition-finance"
          />
        </div>
        <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg border border-light">
          <Filter className="w-4 h-4 text-accent" />
          <select
            value={filterType}
            onChange={(e) => onFilterChange(e.target.value)}
            className="bg-transparent text-primary focus:outline-none cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategorySearch;