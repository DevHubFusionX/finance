import { Calendar, Filter, RefreshCw, Download } from 'lucide-react';

const DashboardFilters = ({ 
  dateRange, 
  onDateRangeChange, 
  transactionType, 
  onTransactionTypeChange,
  onRefresh 
}) => {
  const handleExport = () => {
    alert('Export functionality coming soon!');
  };

  return (
    <div className="bg-surface border border-light rounded-xl p-4 mb-6 shadow-finance">
      <div className="flex flex-wrap items-center justify-between gap-4">
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
              value={transactionType}
              onChange={(e) => onTransactionTypeChange(e.target.value)}
              className="bg-transparent text-primary focus:outline-none cursor-pointer"
            >
              <option value="all">All Transactions</option>
              <option value="income">Income Only</option>
              <option value="expense">Expenses Only</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-background border border-light text-primary hover:bg-accent/10 hover:border-accent transition-finance"
            title="Export data"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          
          <button
            onClick={onRefresh}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-accent text-surface hover:shadow-finance-lg transition-finance"
            title="Refresh data"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilters;