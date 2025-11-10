import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Palette, Database, Trash2, Download } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { financeAPI } from '../../services';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('preferences');
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: financeAPI.getProfile
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: financeAPI.updatePreferences,
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
    }
  });

  const updateNotificationsMutation = useMutation({
    mutationFn: financeAPI.updateNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
    }
  });

  const resetTransactionsMutation = useMutation({
    mutationFn: financeAPI.resetTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
      alert('All transactions have been deleted');
    }
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <LoadingSpinner text="Loading settings..." />
        </div>
      </DashboardLayout>
    );
  }

  const tabs = [
    { id: 'preferences', name: 'Preferences', icon: Palette },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'data', name: 'Data', icon: Database }
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <div className="bg-surface border-b border-light px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center space-x-3 mb-2">
              <SettingsIcon className="w-7 h-7 text-accent" />
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">Settings</h1>
            </div>
            <p className="text-sm sm:text-base text-secondary">Customize your dashboard experience</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Tabs */}
          <div className="flex space-x-2 mb-6 border-b border-light">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 font-medium transition-finance border-b-2 ${
                  activeTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-secondary hover:text-primary'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-surface border border-light rounded-xl p-6 sm:p-8 shadow-finance">
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div>
                    <h4 className="font-medium text-primary">Dark Mode</h4>
                    <p className="text-sm text-secondary">Switch between light and dark themes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDarkMode}
                      onChange={(e) => setIsDarkMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-light peer-focus:ring-2 peer-focus:ring-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Currency</label>
                  <select
                    value={profile?.currency || 'USD'}
                    onChange={(e) => updatePreferencesMutation.mutate({ currency: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-light rounded-lg text-primary focus:border-accent focus:ring-1 focus:ring-accent transition-finance"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Timezone</label>
                  <select
                    value={profile?.timezone || 'UTC'}
                    onChange={(e) => updatePreferencesMutation.mutate({ timezone: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-light rounded-lg text-primary focus:border-accent focus:ring-1 focus:ring-accent transition-finance"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Language</label>
                  <select
                    value={profile?.language || 'en'}
                    onChange={(e) => updatePreferencesMutation.mutate({ language: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-light rounded-lg text-primary focus:border-accent focus:ring-1 focus:ring-accent transition-finance"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div>
                    <h4 className="font-medium text-primary">Email Notifications</h4>
                    <p className="text-sm text-secondary">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile?.notifications?.email || false}
                      onChange={(e) => updateNotificationsMutation.mutate({ email: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-light peer-focus:ring-2 peer-focus:ring-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div>
                    <h4 className="font-medium text-primary">Budget Alerts</h4>
                    <p className="text-sm text-secondary">Get notified when approaching budget limits</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile?.notifications?.budgetAlerts || false}
                      onChange={(e) => updateNotificationsMutation.mutate({ budgetAlerts: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-light peer-focus:ring-2 peer-focus:ring-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div>
                    <h4 className="font-medium text-primary">Goal Reminders</h4>
                    <p className="text-sm text-secondary">Reminders for financial goals</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile?.notifications?.goalReminders || false}
                      onChange={(e) => updateNotificationsMutation.mutate({ goalReminders: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-light peer-focus:ring-2 peer-focus:ring-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-6">
                <div className="p-6 bg-danger/10 border border-danger/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Trash2 className="w-5 h-5 text-danger mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary mb-2">Delete All Transactions</h4>
                      <p className="text-sm text-secondary mb-4">
                        This will permanently delete all your transactions. This action cannot be undone.
                      </p>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete all transactions? This cannot be undone.')) {
                            resetTransactionsMutation.mutate();
                          }
                        }}
                        disabled={resetTransactionsMutation.isPending}
                        className="flex items-center space-x-2 bg-danger text-surface px-4 py-2 rounded-lg shadow-finance hover:shadow-finance-lg transition-finance disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>{resetTransactionsMutation.isPending ? 'Deleting...' : 'Delete All Transactions'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-info/10 border border-info/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Download className="w-5 h-5 text-info mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary mb-2">Export Data</h4>
                      <p className="text-sm text-secondary mb-4">
                        Download all your financial data in CSV or JSON format.
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => alert('CSV export coming soon')}
                          className="flex items-center space-x-2 bg-info text-surface px-4 py-2 rounded-lg shadow-finance hover:shadow-finance-lg transition-finance"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export CSV</span>
                        </button>
                        <button
                          onClick={() => alert('JSON export coming soon')}
                          className="flex items-center space-x-2 bg-accent text-surface px-4 py-2 rounded-lg shadow-finance hover:shadow-finance-lg transition-finance"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export JSON</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;