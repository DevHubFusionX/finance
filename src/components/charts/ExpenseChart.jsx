import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFinanceStore } from '../../store';

const ExpenseChart = ({ type = 'pie' }) => {
  const { transactions, categories } = useFinanceStore();

  const expenses = transactions.filter(t => t.type === 'expense');
  
  const categoryData = categories.map(category => {
    const categoryExpenses = expenses.filter(t => t.categoryId === category.id);
    const total = categoryExpenses.reduce((sum, t) => sum + t.amount, 0);
    return {
      id: category.id,
      name: category.name,
      value: total,
      color: category.color
    };
  }).filter(c => c.value > 0);

  const totalExpenses = categoryData.reduce((sum, c) => sum + c.value, 0);
  
  const pieData = categoryData.map(category => ({
    ...category,
    percentage: totalExpenses > 0 ? ((category.value / totalExpenses) * 100).toFixed(1) : 0
  }));



  if (type === 'pie') {
    return (
      <div className="bg-background border border-accent/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-primary mb-4">Spending by Category</h3>
        {pieData.length === 0 ? (
          <div className="text-center py-8 text-accent">
            <p>No expense data to display</p>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="mt-4 space-y-2">
          {pieData.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-primary">{item.name}</span>
              </div>
              <span className="text-accent">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleDateString('en-US', { month: 'short' });
    if (!acc[month]) acc[month] = { month, income: 0, expenses: 0 };
    
    if (transaction.type === 'income') {
      acc[month].income += transaction.amount;
    } else {
      acc[month].expenses += transaction.amount;
    }
    return acc;
  }, {});

  const barData = Object.values(monthlyData);

  return (
    <div className="bg-background border border-accent/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-primary mb-4">Monthly Overview</h3>
      {barData.length === 0 ? (
        <div className="text-center py-8 text-accent">
          <p>No data to display</p>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" opacity={0.2} />
              <XAxis dataKey="month" stroke="#4A5568" />
              <YAxis stroke="#4A5568" />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Bar dataKey="income" fill="#10B981" name="Income" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;