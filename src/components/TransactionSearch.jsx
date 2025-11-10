import { useState } from 'react';
import { Search, Filter, Calendar, DollarSign } from 'lucide-react';
import { useFinanceStore } from '../store';
import { formatCurrency } from '../utils';

const TransactionSearch = ({ onFilter }) => {
  const { categories } = useFinanceStore();
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    type: '',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: ''
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      search: '',
      category: '',
      type: '',
      dateFrom: '',
      dateTo: '',
      amountMin: '',
      amountMax: ''
    };
    setFilters(emptyFilters);
    onFilter(emptyFilters);
  };

  return (
    <div className="bg-background border border-accent/10 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-primary flex items-center">
          <Search className="w-5 h-5 mr-2" />
          Search & Filter
        </h3>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-accent hover:text-primary transition-colors flex items-center"
        >
          <Filter className="w-4 h-4 mr-1" />
          {showAdvanced ? 'Hide' : 'Show'} Advanced
        </button>
      </div>

      {/* Basic Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-accent/20 rounded-xl focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Quick Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="px-3 py-2 border border-accent/20 rounded-lg focus:outline-none text-sm"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="px-3 py-2 border border-accent/20 rounded-lg focus:outline-none text-sm"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button
          onClick={clearFilters}
          className="px-3 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm"
        >
          Clear All
        </button>

        <div className="text-sm text-accent flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          Last 30 days
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-accent/10">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Date From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="w-full px-3 py-2 border border-accent/20 rounded-lg focus:outline-none text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Date To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              className="w-full px-3 py-2 border border-accent/20 rounded-lg focus:outline-none text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Min Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-accent" />
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={filters.amountMin}
                onChange={(e) => handleFilterChange('amountMin', e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-accent/20 rounded-lg focus:outline-none text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Max Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-accent" />
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={filters.amountMax}
                onChange={(e) => handleFilterChange('amountMax', e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-accent/20 rounded-lg focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionSearch;