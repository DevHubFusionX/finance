import { useState, useCallback, useEffect } from 'react';
import { financeAPI } from '../services';
import { useAsyncOperation } from './useAsyncOperation';

const useBudget = () => {
  const [budgets, setBudgets] = useState([]);
  const { execute, loading } = useAsyncOperation();

  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    amount: '', 
    period: 'monthly',
    categories: [],
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const categories = ['Food & Dining', 'Transportation', 'Entertainment', 'Shopping', 'Utilities'];

  const filteredBudgets = budgets.filter(budget => {
    const matchesSearch = budget.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    
    if (filterStatus === 'all') return matchesSearch;
    const percentage = budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0;
    if (filterStatus === 'on-track') return matchesSearch && percentage < 80;
    if (filterStatus === 'warning') return matchesSearch && percentage >= 80 && percentage < 100;
    if (filterStatus === 'over-budget') return matchesSearch && percentage >= 100;
    
    return matchesSearch;
  });

  const fetchBudgets = useCallback(async () => {
    const data = await execute(
      () => financeAPI.getBudgets(),
      'Failed to fetch budgets'
    );
    setBudgets(data || []);
  }, [execute]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const addBudget = useCallback(async (budgetData) => {
    await execute(
      () => financeAPI.createBudget(budgetData),
      'Failed to create budget'
    );
    await fetchBudgets();
  }, [execute, fetchBudgets]);

  const updateBudget = useCallback(async (id, budgetData) => {
    await execute(
      () => financeAPI.updateBudget(id, budgetData),
      'Failed to update budget'
    );
    await fetchBudgets();
  }, [execute, fetchBudgets]);

  const deleteBudget = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      await execute(
        () => financeAPI.deleteBudget(id),
        'Failed to delete budget'
      );
      await fetchBudgets();
    }
  }, [execute, fetchBudgets]);

  const resetBudget = useCallback((id) => {
    setBudgets(prev => prev.map(budget => 
      budget.id === id ? { ...budget, spent: 0, remaining: budget.budgeted, percentage: 0 } : budget
    ));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (editingBudget) {
      updateBudget(editingBudget.id, formData);
    } else {
      addBudget(formData);
    }
    setFormData({ category: 'Food & Dining', amount: '' });
    setShowForm(false);
    setEditingBudget(null);
  }, [formData, editingBudget, addBudget, updateBudget]);

  const handleEdit = useCallback((budget) => {
    setEditingBudget(budget);
    setFormData({
      name: budget.name || '',
      amount: budget.amount?.toString() || '',
      period: budget.period || 'monthly',
      categories: budget.categories || [],
      startDate: budget.startDate ? new Date(budget.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      endDate: budget.endDate ? new Date(budget.endDate).toISOString().split('T')[0] : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
    setShowForm(true);
  }, []);

  const handleAdd = useCallback(() => {
    setEditingBudget(null);
    setFormData({ 
      name: '', 
      amount: '', 
      period: 'monthly',
      categories: [],
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
    setShowForm(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowForm(false);
    setEditingBudget(null);
    setFormData({ 
      name: '', 
      amount: '', 
      period: 'monthly',
      categories: [],
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  }, []);

  return {
    budgets: filteredBudgets,
    allBudgets: budgets,
    showForm,
    editingBudget,
    formData,
    setFormData,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    categories,
    handleSubmit,
    handleEdit,
    handleAdd,
    handleClose,
    deleteBudget,
    resetBudget,
    loading
  };
};

export default useBudget;