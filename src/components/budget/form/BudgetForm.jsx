const BudgetForm = ({ 
  isOpen, 
  formData, 
  editingBudget, 
  categories, 
  onSubmit, 
  onClose, 
  onChange 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/50">
      <div className="w-full max-w-md bg-surface border border-light rounded-xl p-8 shadow-finance-lg">
        <h3 className="text-2xl font-bold mb-6 text-primary">
          {editingBudget ? 'Edit Budget' : 'Add New Budget'}
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Budget Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => onChange({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
              placeholder="e.g., Monthly Food Budget"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Budget Amount</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.amount}
              onChange={(e) => onChange({...formData, amount: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
              placeholder="Enter budget amount"
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
              {editingBudget ? 'Update' : 'Add'} Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;