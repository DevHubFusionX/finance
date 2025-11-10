import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Filter, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFinanceStore } from '../store';
import { formatCurrency } from '../utils';

const AdvancedAnalytics = () => {
  const { 
    getMonthlyTrends, 
    getCategoryInsights, 
    getSpendingForecast,
    getTransactionsByDateRange 
  } = useFinanceStore();
  
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const monthlyTrends = getMonthlyTrends();
  const categoryInsights = getCategoryInsights();
  const forecast = getSpendingForecast();
  const filteredTransactions = getTransactionsByDateRange(dateRange.start, dateRange.end);

  return (
    <div className="space-y-8">
      {/* Date Range Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-background border border-accent/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-primary flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Date Range Filter
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="w-full px-4 py-2 border border-accent/20 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="w-full px-4 py-2 border border-accent/20 rounded-lg focus:outline-none"
            />
          </div>
        </div>
        <p className="text-sm text-accent mt-2">
          Showing {filteredTransactions.length} transactions in selected range
        </p>
      </motion.div>

      {/* Monthly Trends Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-background border border-accent/10 rounded-2xl p-6"
      >
        <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Monthly Trends
        </h3>
        {monthlyTrends.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" opacity={0.2} />
                <XAxis dataKey="month" stroke="#4A5568" />
                <YAxis stroke="#4A5568" />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="net" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center py-8 text-accent">No data available for trends</p>
        )}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Spending Forecast */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-background border border-accent/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Spending Forecast
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-accent/5 rounded-xl">
              <p className="text-sm text-accent mb-1">Daily Average</p>
              <p className="text-xl font-bold text-primary">{formatCurrency(forecast.dailyAverage)}</p>
            </div>
            <div className="p-4 bg-gold/10 rounded-xl">
              <p className="text-sm text-accent mb-1">Monthly Forecast</p>
              <p className="text-xl font-bold text-primary">{formatCurrency(forecast.monthlyForecast)}</p>
            </div>
            <div className="p-4 bg-rust/10 rounded-xl">
              <p className="text-sm text-accent mb-1">Yearly Forecast</p>
              <p className="text-xl font-bold text-primary">{formatCurrency(forecast.yearlyForecast)}</p>
            </div>
          </div>
        </motion.div>

        {/* Category Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-background border border-accent/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-primary mb-4">Category Insights</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {categoryInsights.slice(0, 5).map((category) => (
              <div key={category.id} className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{backgroundColor: category.color}}
                  />
                  <div>
                    <p className="font-medium text-primary">{category.name}</p>
                    <p className="text-xs text-accent">{category.count} transactions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{formatCurrency(category.total)}</p>
                  <p className="text-xs text-accent">Avg: {formatCurrency(category.avgPerTransaction)}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;