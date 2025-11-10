import { useState } from 'react';
import { Plus, Tag } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { CategoryList, CategoryForm, CategoryStats } from '../components/categories';
import CategorySearch from '../components/categories/CategorySearch';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { TourGuide, TourPrompt } from '../components/tour';
import { categoriesTour } from '../data/tourConfigs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { financeAPI } from '../services';

const Categories = () => {
  const queryClient = useQueryClient();
  const { data: allCategories = [], isLoading: loading } = useQuery({
    queryKey: ['categories'],
    queryFn: financeAPI.getCategories
  });
  
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const createMutation = useMutation({
    mutationFn: financeAPI.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      setShowForm(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => financeAPI.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      setShowForm(false);
      setEditingCategory(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: financeAPI.deleteCategory,
    onSuccess: () => queryClient.invalidateQueries(['categories']),
    onError: (error) => {
      alert(error.response?.data?.error || 'Failed to delete category');
    }
  });
  
  const categories = allCategories.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && cat.type === filterType;
  });

  const handleSubmit = (data) => {
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory._id, data });
    } else {
      createMutation.mutate(data);
    }
  };
  
  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };
  
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteMutation.mutate(id);
    }
  };

  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-surface border-b border-light px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="w-7 h-7 text-accent" />
                  <h1 className="text-2xl sm:text-3xl font-bold text-primary">Categories</h1>
                </div>
                <p className="text-sm sm:text-base text-secondary">Organize your transactions with custom categories for better tracking.</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center justify-center space-x-2 bg-accent text-surface px-6 py-3 rounded-lg font-medium shadow-finance hover:shadow-finance-lg transition-finance w-full sm:w-auto"
              >
                <Plus className="w-5 h-5" />
                <span>Add Category</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          <TourPrompt 
            tourName="categories"
            title="Categories Management Guide"
            description="Learn how to organize your transactions with custom categories."
          />
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner text="Loading categories..." />
            </div>
          ) : (
            <>
              <div data-tour="category-stats">
                <CategoryStats categories={allCategories} />
              </div>

              <CategorySearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterType={filterType}
                onFilterChange={setFilterType}
              />

              <div data-tour="category-list" className="space-y-6">
                <CategoryList 
                  categories={expenseCategories} 
                  type="expense" 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
                
                <CategoryList 
                  categories={incomeCategories} 
                  type="income" 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
              </div>
            </>
          )}
        </div>
      </div>

      <CategoryForm
        isOpen={showForm}
        editingCategory={editingCategory}
        onSubmit={handleSubmit}
        onClose={() => {
          setShowForm(false);
          setEditingCategory(null);
        }}
      />
      <TourGuide tourConfig={categoriesTour} />
    </DashboardLayout>
  );
};

export default Categories;