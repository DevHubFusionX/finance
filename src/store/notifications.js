import { create } from 'zustand';

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  
  addNotification: (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };
    set(state => ({
      notifications: [newNotification, ...state.notifications]
    }));
  },
  
  markAsRead: (id) => {
    set(state => ({
      notifications: state.notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      )
    }));
  },
  
  removeNotification: (id) => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }));
  },

  markAllAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, read: true }))
    }));
  },

  clearAllNotifications: () => {
    set({ notifications: [] });
  },

  getNotificationsByType: (type) => {
    return get().notifications.filter(n => n.type === type);
  },
  
  getUnreadCount: () => {
    const { notifications } = get();
    return notifications.filter(n => !n.read).length;
  },
  
  checkBudgetAlerts: (budgetProgress) => {
    budgetProgress.forEach(budget => {
      if (budget.percentage >= 90 && budget.percentage < 100) {
        get().addNotification({
          type: 'warning',
          title: 'Budget Alert',
          message: `You've spent ${budget.percentage.toFixed(1)}% of your ${budget.categoryName} budget`,
          category: 'budget'
        });
      } else if (budget.percentage >= 100) {
        get().addNotification({
          type: 'error',
          title: 'Budget Exceeded',
          message: `You've exceeded your ${budget.categoryName} budget by ${(budget.percentage - 100).toFixed(1)}%`,
          category: 'budget'
        });
      }
    });
  },
  
  checkGoalDeadlines: (goals) => {
    goals.forEach(goal => {
      const deadline = new Date(goal.targetDate);
      const today = new Date();
      const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
      
      if (daysLeft <= 7 && daysLeft > 0 && goal.currentAmount < goal.targetAmount) {
        get().addNotification({
          type: 'info',
          title: 'Goal Deadline Approaching',
          message: `${goal.title} deadline is in ${daysLeft} days`,
          category: 'goal'
        });
      }
    });
  }
}));