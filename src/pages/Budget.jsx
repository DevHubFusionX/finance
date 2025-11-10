import { useState } from 'react';
import { Plus, TrendingUp, AlertCircle, CheckCircle, Edit2, Trash2 } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useBudgets, useAddBudget, useUpdateBudget, useDeleteBudget } from '../hooks/useQueries';
import { TourGuide, TourPrompt } from '../components/tour';
import { budgetTour } from '../data/tourConfigs';
import { useCurrency } from '../hooks/useCurrency';

const Budget = () => {
  const { data: budgets = [], isLoading } = useBudgets();
  const addBudget = useAddBudget();
  const updateBudget = useUpdateBudget();
  const deleteBudget = useDeleteBudget();
  const { formatAmount } = useCurrency();
  
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    period: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const totalBudgeted = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
  const totalRemaining = totalBudgeted - totalSpent;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBudget) {
        await updateBudget.mutateAsync({ id: editingBudget._id, data: formData });
      } else {
        await addBudget.mutateAsync(formData);
      }
      setShowForm(false);
      setEditingBudget(null);
      setFormData({ name: '', amount: '', period: 'monthly', startDate: new Date().toISOString().split('T')[0], endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] });
    } catch (error) {
      console.error('Failed to save budget:', error);
    }
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setFormData({
      name: budget.name,
      amount: budget.amount.toString(),
      period: budget.period,
      startDate: new Date(budget.startDate).toISOString().split('T')[0],
      endDate: new Date(budget.endDate).toISOString().split('T')[0]
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this budget?')) {
      await deleteBudget.mutateAsync(id);
    }
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 100) return 'text-danger';
    if (percentage >= 80) return 'text-warning';
    return 'text-success';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-danger';
    if (percentage >= 80) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-surface border-b border-light px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Budget Management</h1>
                <p className="text-sm sm:text-base text-secondary">Track your spending and stay on budget</p>
              </div>
              <button
                data-tour="add-budget"
                onClick={() => setShowForm(true)}
                className="flex items-center justify-center space-x-2 bg-accent text-surface px-6 py-3 rounded-lg shadow-finance hover:shadow-finance-lg transition-finance w-full sm:w-auto"
              >
                <Plus className="w-5 h-5" />
                <span>New Budget</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <TourPrompt 
            tourName="budget"
            title="Budget Management Guide"
            description="Learn how to create and track your budgets effectively."
          />
          
          {/* Overview Cards */}
          <div data-tour="budget-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-surface rounded-xl p-4 sm:p-6 shadow-finance border border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary text-xs sm:text-sm">Total Budgeted</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary mt-1">{formatAmount(totalBudgeted)}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-info/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-info" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl p-4 sm:p-6 shadow-finance border border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary text-xs sm:text-sm">Total Spent</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary mt-1">{formatAmount(totalSpent)}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-danger/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-danger" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl p-4 sm:p-6 shadow-finance border border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary text-xs sm:text-sm">Remaining</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary mt-1">{formatAmount(totalRemaining)}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
                </div>
              </div>
            </div>
          </div>

          {/* Budget List */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-secondary">Loading budgets...</p>
            </div>
          ) : budgets.length === 0 ? (
            <div className="bg-surface rounded-xl p-8 sm:p-12 text-center shadow-finance border border-light">
              <p className="text-secondary mb-4">No budgets yet. Create your first budget to start tracking.</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-accent text-surface px-6 py-3 rounded-lg shadow-finance hover:shadow-finance-lg transition-finance"
              >
                Create Budget
              </button>
            </div>
          ) : (
            <div data-tour="budget-alerts" className="grid gap-4 sm:gap-6">
              {budgets.map((budget) => {
                const percentage = budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0;
                return (
                  <div key={budget._id} className="bg-surface rounded-xl p-4 sm:p-6 shadow-finance border border-light hover:shadow-finance-lg transition-finance">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-primary">{budget.name}</h3>
                        <p className="text-sm text-secondary mt-1">{budget.period} budget</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(budget)}
                          className="p-2 hover:bg-background rounded-lg transition-finance"
                        >
                          <Edit2 className="w-4 h-4 text-secondary" />
                        </button>
                        <button
                          onClick={() => handleDelete(budget._id)}
                          className="p-2 hover:bg-danger/10 rounded-lg transition-finance"
                        >
                          <Trash2 className="w-4 h-4 text-danger" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary">
                          {formatAmount(budget.spent)} of {formatAmount(budget.amount)}
                        </span>
                        <span className={`font-semibold ${getStatusColor(percentage)}`}>
                          {percentage.toFixed(1)}%
                        </span>
                      </div>

                      <div className="w-full bg-background rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all ${getProgressColor(percentage)}`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>

                      <p className="text-sm text-secondary">
                        {budget.remaining > 0
                          ? `${formatAmount(budget.remaining)} remaining`
                          : `${formatAmount(Math.abs(budget.remaining))} over budget`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <TourGuide tourConfig={budgetTour} />

      {/* Budget Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-primary/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-xl p-6 sm:p-8 max-w-md w-full shadow-finance-lg border border-light">
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-6">{editingBudget ? 'Edit Budget' : 'New Budget'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Budget Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent transition-finance"
                  placeholder="e.g., Monthly Groceries"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent transition-finance"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Period</label>
                <select
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent transition-finance"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingBudget(null);
                  }}
                  className="flex-1 px-4 py-3 border border-light rounded-lg text-secondary hover:bg-background transition-finance"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-accent text-surface rounded-lg shadow-finance hover:shadow-finance-lg transition-finance"
                >
                  {editingBudget ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Budget;
