import { PieChart } from 'lucide-react';

const CategoryChart = ({ categoryData }) => {
  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
      <div className="flex items-center space-x-2 mb-6">
        <PieChart className="w-5 h-5 text-accent" />
        <h3 className="text-xl font-bold text-primary">Spending by Category</h3>
      </div>
      {categoryData.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <PieChart className="w-8 h-8 text-accent" />
          </div>
          <p className="text-secondary">No category data available</p>
        </div>
      ) : (
        <div className="space-y-3">
          {categoryData.map((category, index) => (
            <div key={category.name} className="p-4 bg-background rounded-lg border border-light hover:border-accent transition-finance group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-accent group-hover:scale-125 transition-finance`}></div>
                  <span className="text-primary font-semibold">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-primary font-bold">${category.amount.toFixed(2)}</div>
                  <div className="text-xs text-secondary">{category.percentage}%</div>
                </div>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-accent transition-all"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryChart;