import { BarChart3, PieChart, TrendingUp, DollarSign } from 'lucide-react';

const ReportDetails = ({ reportData, reportType }) => {
  if (!reportData) return null;

  const renderSummaryDetails = () => (
    <div className="space-y-4">
      {reportData.categoryBreakdown && reportData.categoryBreakdown.length > 0 && (
        <div>
          <h4 className="font-semibold mb-3 text-primary flex items-center">
            <PieChart className="w-4 h-4 mr-2 text-accent" />
            Category Breakdown
          </h4>
          <div className="space-y-2">
            {reportData.categoryBreakdown.map((cat) => (
              <div key={cat.name} className="flex justify-between items-center p-4 bg-background rounded-lg border border-light hover:border-accent transition-finance">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <span className="text-primary font-medium">{cat.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">${cat.total.toFixed(2)}</div>
                  <div className="text-xs text-secondary">{cat.count} transactions</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderSpendingReport = () => (
    <div className="space-y-4">
      {reportData.spendingBreakdown && reportData.spendingBreakdown.length > 0 ? (
        <div>
          <h4 className="font-semibold mb-3 text-primary flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-danger" />
            Spending by Category
          </h4>
          <div className="space-y-2">
            {reportData.spendingBreakdown.map((cat) => (
              <div key={cat.name} className="flex justify-between items-center p-4 bg-background rounded-lg border border-light hover:border-danger transition-finance">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-danger"></div>
                  <span className="text-primary font-medium">{cat.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-danger">${cat.total.toFixed(2)}</div>
                  <div className="text-xs text-secondary">{cat.count} transactions</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-secondary py-8">No expense data available</p>
      )}
    </div>
  );

  const renderIncomeReport = () => (
    <div className="space-y-4">
      {reportData.incomeBreakdown && reportData.incomeBreakdown.length > 0 ? (
        <div>
          <h4 className="font-semibold mb-3 text-primary flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-success" />
            Income by Category
          </h4>
          <div className="space-y-2">
            {reportData.incomeBreakdown.map((cat) => (
              <div key={cat.name} className="flex justify-between items-center p-4 bg-background rounded-lg border border-light hover:border-success transition-finance">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-primary font-medium">{cat.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-success">${cat.total.toFixed(2)}</div>
                  <div className="text-xs text-secondary">{cat.count} transactions</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-secondary py-8">No income data available</p>
      )}
    </div>
  );

  const renderBudgetReport = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <BarChart3 className="w-8 h-8 text-accent" />
      </div>
      <h4 className="text-lg font-semibold text-primary mb-2">Budget Report</h4>
      <p className="text-secondary">Budget performance tracking coming soon</p>
    </div>
  );

  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
      <h3 className="text-lg font-semibold mb-4 text-primary">Report Details</h3>
      
      {reportType === 'summary' && renderSummaryDetails()}
      {reportType === 'spending' && renderSpendingReport()}
      {reportType === 'income' && renderIncomeReport()}
      {reportType === 'budget' && renderBudgetReport()}
    </div>
  );
};

export default ReportDetails;
