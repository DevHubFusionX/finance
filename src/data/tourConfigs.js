export const dashboardTour = {
  name: 'dashboard',
  steps: [
    {
      target: '[data-tour="stats"]',
      title: 'Financial Overview',
      content: 'Here you can see your key financial metrics at a glance - total balance, income, expenses, and savings rate. These update in real-time as you add transactions.'
    },
    {
      target: '[data-tour="add-transaction"]',
      title: 'Add Transactions',
      content: 'Click this floating button anytime to quickly add a new transaction. You can also add transactions from the Recent Transactions section.'
    },
    {
      target: '[data-tour="recent-transactions"]',
      title: 'Recent Transactions',
      content: 'View your latest transactions here. You can edit, delete, or categorize them. Click "Add Transaction" to create new ones.'
    },
    {
      target: '[data-tour="insights"]',
      title: 'AI Insights',
      content: 'Get personalized financial insights and recommendations based on your spending patterns. Our AI analyzes your data to help you make better decisions.'
    },
    {
      target: '[data-tour="quick-actions"]',
      title: 'Quick Actions',
      content: 'Access common tasks quickly - set budgets, import data, view analytics, or export your financial data.'
    }
  ]
};

export const budgetTour = {
  name: 'budget',
  steps: [
    {
      target: '[data-tour="budget-overview"]',
      title: 'Budget Overview',
      content: 'See all your budgets at a glance with progress bars showing how much you\'ve spent versus your limits.'
    },
    {
      target: '[data-tour="add-budget"]',
      title: 'Create Budget',
      content: 'Click here to create a new budget. Set monthly limits for different categories to track your spending.'
    },
    {
      target: '[data-tour="budget-alerts"]',
      title: 'Budget Alerts',
      content: 'Get notified when you\'re approaching or exceeding your budget limits. You can customize alert thresholds.'
    }
  ]
};

export const goalsTour = {
  name: 'goals',
  steps: [
    {
      target: '[data-tour="goals-list"]',
      title: 'Financial Goals',
      content: 'Track your financial goals here. Set targets for savings, debt payoff, or major purchases.'
    },
    {
      target: '[data-tour="add-goal"]',
      title: 'Create Goal',
      content: 'Click to create a new financial goal. Set target amounts, deadlines, and track your progress.'
    },
    {
      target: '[data-tour="goal-progress"]',
      title: 'Track Progress',
      content: 'Monitor your progress towards each goal with visual progress bars and milestone tracking.'
    }
  ]
};

export const reportsTour = {
  name: 'reports',
  steps: [
    {
      target: '[data-tour="report-types"]',
      title: 'Report Types',
      content: 'Choose from different report types - summary, detailed, category analysis, or monthly trends.'
    },
    {
      target: '[data-tour="report-filters"]',
      title: 'Filter Options',
      content: 'Customize your reports with date ranges and category filters to get exactly the insights you need.'
    },
    {
      target: '[data-tour="export-options"]',
      title: 'Export Data',
      content: 'Export your reports as PDF or CSV files for sharing with accountants or for your records.'
    }
  ]
};

export const categoriesTour = {
  name: 'categories',
  steps: [
    {
      target: '[data-tour="category-stats"]',
      title: 'Category Statistics',
      content: 'View statistics about your categories including transaction counts and spending totals.'
    },
    {
      target: '[data-tour="category-list"]',
      title: 'Manage Categories',
      content: 'View, edit, and delete your transaction categories. Organize your spending with custom categories.'
    },
    {
      target: '[data-tour="add-category"]',
      title: 'Add Category',
      content: 'Create new categories to better organize your transactions. Choose colors and types (income/expense).'
    }
  ]
};

export const analyticsTour = {
  name: 'analytics',
  steps: [
    {
      target: '[data-tour="analytics-overview"]',
      title: 'Analytics Overview',
      content: 'Get a comprehensive view of your financial data with key metrics and trends at a glance.'
    },
    {
      target: '[data-tour="spending-trends"]',
      title: 'Spending Trends',
      content: 'Analyze your spending patterns over time with interactive charts and visualizations.'
    },
    {
      target: '[data-tour="category-breakdown"]',
      title: 'Category Analysis',
      content: 'See how your money is distributed across different categories with detailed breakdowns.'
    },
    {
      target: '[data-tour="time-filters"]',
      title: 'Time Period Filters',
      content: 'Customize your analysis by selecting different time periods and date ranges.'
    }
  ]
};

export const profileTour = {
  name: 'profile',
  steps: [
    {
      target: '[data-tour="profile-info"]',
      title: 'Profile Information',
      content: 'View and edit your personal information, currency preferences, and account settings.'
    },
    {
      target: '[data-tour="notifications"]',
      title: 'Notification Settings',
      content: 'Customize your notification preferences for budget alerts, goal reminders, and more.'
    },
    {
      target: '[data-tour="preferences"]',
      title: 'App Preferences',
      content: 'Adjust app settings like theme, language, date format, and number formatting.'
    },
    {
      target: '[data-tour="support"]',
      title: 'Help & Support',
      content: 'Access help resources and contact support if you need assistance with your account.'
    }
  ]
};