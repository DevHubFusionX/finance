import { useState, useCallback, useEffect } from 'react';
import { useFinanceStore } from '../store';

const useCategories = () => {
  const { 
    categories: storeCategories, 
    loading, 
    fetchCategories, 
    addCategory: storeAddCategory, 
    updateCategory: storeUpdateCategory, 
    removeCategory: storeRemoveCategory 
  } = useFinanceStore();

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    type: 'expense', 
    color: '#059669' 
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = useCallback(async (categoryData) => {
    await storeAddCategory(categoryData);
  }, [storeAddCategory]);

  const updateCategory = useCallback(async (id, categoryData) => {
    await storeUpdateCategory(id, categoryData);
  }, [storeUpdateCategory]);

  const deleteCategory = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await storeRemoveCategory(id);
    }
  }, [storeRemoveCategory]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData);
      } else {
        await addCategory(formData);
      }
      setFormData({ name: '', type: 'expense', color: '#059669' });
      setShowForm(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to save category:', error);
    }
  }, [formData, editingCategory, addCategory, updateCategory]);

  const handleEdit = useCallback((category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      type: category.type,
      color: category.color
    });
    setShowForm(true);
  }, []);

  const handleAdd = useCallback(() => {
    setEditingCategory(null);
    setFormData({ name: '', type: 'expense', color: '#059669' });
    setShowForm(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({ name: '', type: 'expense', color: '#059669' });
  }, []);

  const filteredCategories = storeCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || category.type === filterType;
    return matchesSearch && matchesType;
  });

  const bulkDeleteCategories = useCallback(async (ids) => {
    if (window.confirm(`Delete ${ids.length} categories?`)) {
      for (const id of ids) {
        await storeRemoveCategory(id);
      }
    }
  }, [storeRemoveCategory]);

  return {
    categories: filteredCategories,
    allCategories: storeCategories,
    showForm,
    editingCategory,
    formData,
    setFormData,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    handleSubmit,
    handleEdit,
    handleAdd,
    handleClose,
    deleteCategory,
    bulkDeleteCategories,
    loading
  };
};

export default useCategories;