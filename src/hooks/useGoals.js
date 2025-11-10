import { useState, useCallback, useEffect } from 'react';
// import { financeAPI } from '../services';
import { useAsyncOperation } from './useAsyncOperation';

const useGoals = () => {
  const [goals, setGoals] = useState([]);
  const { execute, loading } = useAsyncOperation();

  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    targetAmount: '', 
    targetDate: '', 
    category: 'savings' 
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const categories = [
    { value: 'savings', label: 'Savings' },
    { value: 'travel', label: 'Travel' },
    { value: 'tech', label: 'Technology' },
    { value: 'home', label: 'Home' },
    { value: 'education', label: 'Education' }
  ];

  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'completed') return matchesSearch && goal.currentAmount >= goal.targetAmount;
    if (filterStatus === 'active') return matchesSearch && goal.currentAmount < goal.targetAmount;
    if (filterStatus === 'overdue') {
      const today = new Date();
      const deadline = new Date(goal.targetDate);
      return matchesSearch && deadline < today && goal.currentAmount < goal.targetAmount;
    }
    
    return matchesSearch;
  });

  const fetchGoals = useCallback(async () => {
    // Mock goals data
    const mockGoals = [
      { id: 1, title: 'Emergency Fund', targetAmount: 5000, currentAmount: 2500, targetDate: '2024-12-31', category: 'savings' },
      { id: 2, title: 'Vacation', targetAmount: 2000, currentAmount: 800, targetDate: '2024-06-30', category: 'travel' }
    ];
    setGoals(mockGoals);
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const addGoal = useCallback(async (goalData) => {
    await execute(
      () => financeAPI.createGoal(goalData),
      'Failed to create goal'
    );
    await fetchGoals();
  }, [execute, fetchGoals]);

  const updateGoal = useCallback(async (id, goalData) => {
    await execute(
      () => financeAPI.updateGoal(id, goalData),
      'Failed to update goal'
    );
    await fetchGoals();
  }, [execute, fetchGoals]);

  const deleteGoal = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await execute(
        () => financeAPI.deleteGoal(id),
        'Failed to delete goal'
      );
      await fetchGoals();
    }
  }, [execute, fetchGoals]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (editingGoal) {
      updateGoal(editingGoal.id, formData);
    } else {
      addGoal(formData);
    }
    setFormData({ title: '', targetAmount: '', targetDate: '', category: 'savings' });
    setShowForm(false);
    setEditingGoal(null);
  }, [formData, editingGoal, addGoal, updateGoal]);

  const handleEdit = useCallback((goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      targetAmount: goal.targetAmount,
      targetDate: goal.targetDate,
      category: goal.category
    });
    setShowForm(true);
  }, []);

  const handleAdd = useCallback(() => {
    setEditingGoal(null);
    setFormData({ title: '', targetAmount: '', targetDate: '', category: 'savings' });
    setShowForm(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowForm(false);
    setEditingGoal(null);
    setFormData({ title: '', targetAmount: '', targetDate: '', category: 'savings' });
  }, []);

  return {
    goals: filteredGoals,
    allGoals: goals,
    showForm,
    editingGoal,
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
    deleteGoal,
    loading
  };
};

export default useGoals;