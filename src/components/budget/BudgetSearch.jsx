import { Search, Filter } from 'lucide-react';

const BudgetSearch = ({ searchTerm, onSearchChange, filterStatus, onFilterChange }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary" />
        <input
          type="text"
          placeholder="Search budgets..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
        />
      </div>
      <select
        value={filterStatus}
        onChange={(e) => onFilterChange(e.target.value)}
        className="px-4 py-2 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
      >
        <option value="all">All Budgets</option>
        <option value="on-track">On Track</option>
        <option value="warning">Warning</option>
        <option value="over-budget">Over Budget</option>
      </select>
    </div>
  );
};

export default BudgetSearch;