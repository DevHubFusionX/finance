import { TrendingUp, Calendar } from 'lucide-react';

const TrendsChart = ({ monthlyTrends }) => {
  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-5 h-5 text-accent" />
        <h3 className="text-xl font-bold text-primary">Monthly Trends</h3>
      </div>
      {monthlyTrends.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-accent" />
          </div>
          <p className="text-secondary">No trend data available</p>
        </div>
      ) : (
        <div className="space-y-3">
          {monthlyTrends.map((month) => (
            <div key={month.month} className="p-4 bg-background rounded-lg border border-light hover:border-accent transition-finance">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-primary">{month.month}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-success/5 rounded-lg p-3 border border-success/20">
                  <div className="text-xs text-secondary mb-1">Income</div>
                  <div className="font-bold text-success">${month.income.toLocaleString()}</div>
                </div>
                <div className="bg-danger/5 rounded-lg p-3 border border-danger/20">
                  <div className="text-xs text-secondary mb-1">Expenses</div>
                  <div className="font-bold text-danger">${month.expenses.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendsChart;