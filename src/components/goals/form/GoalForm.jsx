import { useState, useEffect } from 'react';

const GoalForm = ({ isOpen, editingGoal, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: 'Savings',
    priority: 'medium',
    description: ''
  });

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        name: editingGoal.name || '',
        targetAmount: editingGoal.targetAmount || '',
        currentAmount: editingGoal.currentAmount || '',
        deadline: editingGoal.deadline ? new Date(editingGoal.deadline).toISOString().split('T')[0] : '',
        category: editingGoal.category || 'Savings',
        priority: editingGoal.priority || 'medium',
        description: editingGoal.description || ''
      });
    } else {
      setFormData({
        name: '',
        targetAmount: '',
        currentAmount: '',
        deadline: '',
        category: 'Savings',
        priority: 'medium',
        description: ''
      });
    }
  }, [editingGoal, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/30 backdrop-blur-sm">
      <div className="w-full max-w-md bg-surface border border-light rounded-xl p-8 shadow-finance-lg">
        <h3 className="text-2xl font-bold mb-6 text-primary">
          {editingGoal ? 'Edit Goal' : 'Create New Goal'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Goal Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent transition-finance"
              placeholder="e.g., Emergency Fund"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">Target Amount</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.targetAmount}
                onChange={(e) => setFormData({...formData, targetAmount: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent transition-finance"
                placeholder="10000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">Current Amount</label>
              <input
                type="number"
                step="0.01"
                value={formData.currentAmount}
                onChange={(e) => setFormData({...formData, currentAmount: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent transition-finance"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Deadline</label>
            <input
              type="date"
              required
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent transition-finance"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent transition-finance"
              >
                <option value="Savings">Savings</option>
                <option value="Investment">Investment</option>
                <option value="Debt">Debt Payoff</option>
                <option value="Purchase">Purchase</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent transition-finance"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent transition-finance"
              placeholder="Add notes about this goal..."
              rows="3"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-lg border border-light text-secondary hover:bg-background transition-finance"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-lg bg-accent text-surface shadow-finance hover:shadow-finance-lg transition-finance"
            >
              {editingGoal ? 'Update' : 'Create'} Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;