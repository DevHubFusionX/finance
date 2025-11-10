import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign, Calendar, Tag } from 'lucide-react';
import { useFinanceStore } from '../../store';

const TransactionForm = ({ isOpen, onClose }) => {
  const { addTransaction, categories } = useFinanceStore();
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    categoryId: categories[0]?.id || 1,
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(formData);
    setFormData({ 
      amount: '', 
      description: '', 
      categoryId: categories[0]?.id || 1, 
      type: 'expense', 
      date: new Date().toISOString().split('T')[0] 
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-background rounded-2xl p-8 w-full max-w-md border border-accent/10"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Add Transaction</h2>
          <button onClick={onClose} className="p-2 hover:bg-accent/10 rounded-full transition-colors">
            <X className="w-5 h-5 text-accent" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['expense', 'income'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, type })}
                  className={`p-3 rounded-xl border transition-colors capitalize ${
                    formData.type === type
                      ? 'bg-primary text-background border-primary'
                      : 'bg-accent/5 text-accent border-accent/20 hover:bg-accent/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent" />
              <input
                type="number"
                step="0.01"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-accent/20 rounded-xl focus:border-accent focus:outline-none bg-background text-primary"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Description</label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-accent/20 rounded-xl focus:border-accent focus:outline-none bg-background text-primary"
              placeholder="What was this for?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Category</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent" />
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                className="w-full pl-10 pr-4 py-3 border border-accent/20 rounded-xl focus:border-accent focus:outline-none bg-background text-primary"
              >
                {categories
                  .filter(cat => cat.type === formData.type)
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-accent/20 rounded-xl focus:border-accent focus:outline-none bg-background text-primary"
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-accent/20 text-accent rounded-xl hover:bg-accent/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-primary text-background rounded-xl hover:bg-accent transition-colors"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TransactionForm;