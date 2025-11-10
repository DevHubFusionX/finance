import { Download, Loader2 } from 'lucide-react';

const ReportPreview = ({ reportData, dateRange, onExport, isGenerating }) => {
  if (isGenerating) {
    return (
      <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
          <span className="ml-3 text-secondary">Generating report...</span>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
        <div className="text-center py-12">
          <p className="text-secondary">No report data available. Generate a report to see results.</p>
        </div>
      </div>
    );
  }
  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary">Report Preview</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onExport('pdf')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-danger text-surface shadow-finance hover:shadow-finance-lg transition-finance"
          >
            <Download className="w-4 h-4" />
            <span>PDF</span>
          </button>
          <button
            onClick={() => onExport('csv')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-info text-surface shadow-finance hover:shadow-finance-lg transition-finance"
          >
            <Download className="w-4 h-4" />
            <span>CSV</span>
          </button>
          <button
            onClick={() => onExport('json')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-accent text-surface shadow-finance hover:shadow-finance-lg transition-finance"
          >
            <Download className="w-4 h-4" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {reportData.totalSpending !== undefined ? (
          // Spending report cards
          <>
            <div className="p-4 bg-danger/10 rounded-lg border border-danger/20">
              <h4 className="text-sm font-medium mb-1 text-secondary">Total Spending</h4>
              <p className="text-2xl font-bold text-danger">
                ${(reportData.totalSpending || 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-info/10 rounded-lg border border-info/20">
              <h4 className="text-sm font-medium mb-1 text-secondary">Daily Average</h4>
              <p className="text-2xl font-bold text-info">
                ${(reportData.dailyAverage || 0).toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="text-sm font-medium mb-1 text-secondary">Avg Transaction</h4>
              <p className="text-2xl font-bold text-accent">
                ${(reportData.avgSpending || 0).toFixed(2)}
              </p>
            </div>
          </>
        ) : reportData.totalIncome !== undefined && reportData.totalExpenses === undefined ? (
          // Income report cards
          <>
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <h4 className="text-sm font-medium mb-1 text-secondary">Total Income</h4>
              <p className="text-2xl font-bold text-success">
                ${(reportData.totalIncome || 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-info/10 rounded-lg border border-info/20">
              <h4 className="text-sm font-medium mb-1 text-secondary">Daily Average</h4>
              <p className="text-2xl font-bold text-info">
                ${(reportData.dailyAverage || 0).toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="text-sm font-medium mb-1 text-secondary">Avg Transaction</h4>
              <p className="text-2xl font-bold text-accent">
                ${(reportData.avgIncome || 0).toFixed(2)}
              </p>
            </div>
          </>
        ) : reportData.totalBudgeted !== undefined ? (
          // Budget report cards
          <>
            <div className="p-4 bg-info/10 rounded-lg border border-info/20">
              <h4 className="text-sm font-medium mb-1 text-secondary">Total Budgeted</h4>
              <p className="text-2xl font-bold text-info">
                ${(reportData.totalBudgeted || 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-danger/10 rounded-lg border border-danger/20">
              <h4 className="text-sm font-medium mb-1 text-secondary">Total Spent</h4>
              <p className="text-2xl font-bold text-danger">
                ${(reportData.totalSpent || 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <h4 className="text-sm font-medium mb-1 text-secondary">Remaining</h4>
              <p className="text-2xl font-bold text-success">
                ${(reportData.totalRemaining || 0).toLocaleString()}
              </p>
            </div>
          </>
        ) : (
          // Standard report cards
          <>
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <h4 className="text-sm font-medium mb-1 text-secondary">Total Income</h4>
              <p className="text-2xl font-bold text-success">
                ${(reportData.totalIncome || 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-danger/10 rounded-lg border border-danger/20">
              <h4 className="text-sm font-medium mb-1 text-secondary">Total Expenses</h4>
              <p className="text-2xl font-bold text-danger">
                ${(reportData.totalExpenses || 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="text-sm font-medium mb-1 text-secondary">Net Savings</h4>
              <p className="text-2xl font-bold text-accent">
                ${(reportData.netSavings || 0).toLocaleString()}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Report Details */}
      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-light">
          <span className="text-secondary">Report Period</span>
          <span className="font-medium text-primary">
            {dateRanges.find(r => r.value === dateRange)?.label}
          </span>
        </div>
        {reportData.totalBudgeted !== undefined ? (
          // Budget report details
          <>
            <div className="flex justify-between items-center py-3 border-b border-light">
              <span className="text-secondary">Budget Performance</span>
              <span className="font-medium text-primary">{(reportData.overallPercentage || 0).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-light">
              <span className="text-secondary">Over Budget</span>
              <span className="font-medium text-danger">{reportData.overBudgetCount || 0} budgets</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-secondary">On Track</span>
              <span className="font-medium text-success">{reportData.onTrackCount || 0} budgets</span>
            </div>
          </>
        ) : (
          // Standard report details
          <>
            <div className="flex justify-between items-center py-3 border-b border-light">
              <span className="text-secondary">
                {reportData.topSpendingCategory ? 'Top Spending Category' : 
                 reportData.topIncomeCategory ? 'Top Income Category' : 'Top Category'}
              </span>
              <span className="font-medium text-primary">
                {reportData.topCategory || reportData.topSpendingCategory || reportData.topIncomeCategory || 'None'}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-light">
              <span className="text-secondary">Total Transactions</span>
              <span className="font-medium text-primary">{reportData.transactionCount || 0}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-secondary">Average Transaction</span>
              <span className="font-medium text-primary">
                ${(reportData.avgTransaction || 0).toFixed(2)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportPreview;