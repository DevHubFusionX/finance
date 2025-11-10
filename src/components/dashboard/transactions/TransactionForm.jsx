import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useCategories, useAddTransaction } from '../../../hooks/useQueries';
import LoadingSpinner from '../../common/LoadingSpinner';

const TransactionForm = ({ isOpen, onClose }) => {
  const { data: categories = [] } = useCategories();
  const addTransactionMutation = useAddTransaction();
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    categoryName: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Initialize categoryName when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !formData.categoryName) {
      const expenseCategory = categories.find(c => c.type === 'expense');
      const initialName = expenseCategory?.name || categories[0]?.name;

      setFormData(prev => ({
        ...prev,
        categoryName: initialName
      }));
    }
  }, [categories, formData.categoryName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const category = categories.find(c => c.name === formData.categoryName);
    const transactionData = {
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.categoryName,
      description: formData.description,
      date: formData.date
    };
    
    try {
      await addTransactionMutation.mutateAsync(transactionData);
      setFormData({
        type: 'expense',
        amount: '',
        categoryName: categories.find(c => c.type === 'expense')?.name || '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      onClose();
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/50">
      <div className="w-full max-w-md bg-surface border border-light rounded-xl p-6 shadow-finance-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-primary">Add Transaction</h3>
          <button onClick={onClose} className="p-1 hover:bg-accent/10 rounded">
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['expense', 'income'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    const filteredCategories = categories.filter(c => c.type === type);
                    setFormData({
                      ...formData, 
                      type,
                      categoryName: filteredCategories[0]?.name || categories[0]?.name || ''
                    });
                  }}
                  className={`p-2 rounded-lg border transition-finance capitalize ${
                    formData.type === type
                      ? 'bg-accent text-surface border-accent'
                      : 'bg-background text-primary border-light hover:border-accent'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Amount</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full px-3 py-2 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Category</label>
            <select
              value={formData.categoryName}
              onChange={(e) => {
                setFormData({...formData, categoryName: e.target.value});
              }}
              className="w-full px-3 py-2 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
            >
              {categories
                .filter(c => c.type === formData.type)
                .map((category, index) => (
                  <option key={`${category.name}-${index}`} value={category.name}>{category.name}</option>
                ))
              }
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Description</label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-3 py-2 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 rounded-lg border border-light text-secondary hover:bg-background transition-finance"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={addTransactionMutation.isPending}
              className="flex-1 py-2 px-4 rounded-lg bg-accent text-surface shadow-finance hover:shadow-finance-lg transition-finance disabled:opacity-50"
            >
              {addTransactionMutation.isPending ? <LoadingSpinner size="sm" text="" /> : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;