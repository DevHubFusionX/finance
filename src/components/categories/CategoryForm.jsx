import { useState, useEffect } from 'react';

const CategoryForm = ({ isOpen, editingCategory, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
    color: '#8B5CF6',
    icon: 'Tag'
  });

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name || '',
        type: editingCategory.type || 'expense',
        color: editingCategory.color || '#8B5CF6',
        icon: editingCategory.icon || 'Tag'
      });
    } else {
      setFormData({
        name: '',
        type: 'expense',
        color: '#8B5CF6',
        icon: 'Tag'
      });
    }
  }, [editingCategory, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/30 backdrop-blur-sm">
      <div className="w-full max-w-md bg-surface border border-light rounded-xl p-8 shadow-finance-lg">
        <h3 className="text-2xl font-bold mb-6 text-primary">
          {editingCategory ? 'Edit Category' : 'Create Category'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Category Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent transition-finance"
              placeholder="e.g., Groceries"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'expense' })}
                className={`py-3 px-4 rounded-lg border transition-finance ${
                  formData.type === 'expense'
                    ? 'bg-danger/10 border-danger text-danger font-semibold'
                    : 'border-light text-secondary hover:bg-background'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'income' })}
                className={`py-3 px-4 rounded-lg border transition-finance ${
                  formData.type === 'income'
                    ? 'bg-success/10 border-success text-success font-semibold'
                    : 'border-light text-secondary hover:bg-background'
                }`}
              >
                Income
              </button>
            </div>
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
              {editingCategory ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;