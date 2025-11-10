import { useState } from 'react';
import { Plus, Target } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { GoalOverview, GoalGrid, GoalForm, GoalSearch } from '../components/goals';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { TourGuide, TourPrompt } from '../components/tour';
import { goalsTour } from '../data/tourConfigs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { financeAPI } from '../services';

const Goals = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const queryClient = useQueryClient();

  const { data: goals = [], isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: financeAPI.getGoals
  });

  const createMutation = useMutation({
    mutationFn: financeAPI.createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries(['goals']);
      setShowForm(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => financeAPI.updateGoal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['goals']);
      setShowForm(false);
      setEditingGoal(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: financeAPI.deleteGoal,
    onSuccess: () => queryClient.invalidateQueries(['goals'])
  });

  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || goal.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (data) => {
    if (editingGoal) {
      updateMutation.mutate({ id: editingGoal._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-surface border-b border-light px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-7 h-7 text-accent" />
                  <h1 className="text-2xl sm:text-3xl font-bold text-primary">Financial Goals</h1>
                </div>
                <p className="text-sm sm:text-base text-secondary">Track your progress towards achieving your financial milestones.</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center justify-center space-x-2 bg-accent text-surface px-6 py-3 rounded-lg font-medium shadow-finance hover:shadow-finance-lg transition-finance w-full sm:w-auto"
              >
                <Plus className="w-5 h-5" />
                <span>Add Goal</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          <TourPrompt 
            tourName="goals"
            title="Financial Goals Guide"
            description="Learn how to set and track your financial goals effectively."
          />
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner text="Loading goals..." />
            </div>
          ) : (
            <>
              <div data-tour="goal-progress">
                <GoalOverview goals={goals} />
              </div>

              <GoalSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterStatus={filterStatus}
                onFilterChange={setFilterStatus}
              />

              <div data-tour="goals-list">
                <GoalGrid
                  goals={filteredGoals}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <GoalForm
        isOpen={showForm}
        editingGoal={editingGoal}
        onSubmit={handleSubmit}
        onClose={() => {
          setShowForm(false);
          setEditingGoal(null);
        }}
      />
      <TourGuide tourConfig={goalsTour} />
    </DashboardLayout>
  );
};

export default Goals;