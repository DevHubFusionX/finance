import { Bell, Settings, Palette, Globe, HelpCircle, Mail } from 'lucide-react';

const ProfileSettings = ({ profile, updateNotifications, updatePreferences }) => {
  if (!profile) return null;

  const handleNotificationChange = (key, value) => {
    const updatedNotifications = {
      ...profile.notifications,
      [key]: value
    };
    updateNotifications(updatedNotifications);
  };

  const handlePreferenceChange = (key, value) => {
    const updatedPreferences = {
      ...profile.preferences,
      [key]: value
    };
    updatePreferences(updatedPreferences);
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notifications
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-primary">Email Notifications</p>
              <p className="text-sm text-secondary">Receive updates via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profile.notifications?.email || false}
                onChange={(e) => handleNotificationChange('email', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-primary">Push Notifications</p>
              <p className="text-sm text-secondary">Receive push notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profile.notifications?.push || false}
                onChange={(e) => handleNotificationChange('push', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-primary">Budget Alerts</p>
              <p className="text-sm text-secondary">Get notified when approaching budget limits</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profile.notifications?.budgetAlerts || false}
                onChange={(e) => handleNotificationChange('budgetAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-primary">Goal Reminders</p>
              <p className="text-sm text-secondary">Reminders about your financial goals</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profile.notifications?.goalReminders || false}
                onChange={(e) => handleNotificationChange('goalReminders', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div data-tour="preferences" className="bg-surface border border-light rounded-xl p-6 shadow-finance">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Preferences
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-primary flex items-center">
              <Palette className="w-4 h-4 mr-1" />
              Theme
            </label>
            <select
              value={profile.preferences?.theme || 'light'}
              onChange={(e) => handlePreferenceChange('theme', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-primary flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              Language
            </label>
            <select
              value={profile.preferences?.language || 'en'}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Date Format</label>
            <select
              value={profile.preferences?.dateFormat || 'MM/DD/YYYY'}
              onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Number Format</label>
            <select
              value={profile.preferences?.numberFormat || 'US'}
              onChange={(e) => handlePreferenceChange('numberFormat', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
            >
              <option value="US">US (1,234.56)</option>
              <option value="EU">EU (1.234,56)</option>
              <option value="IN">IN (1,23,456.78)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Support */}
      <div data-tour="support" className="bg-surface border border-light rounded-xl p-6 shadow-finance">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
          <HelpCircle className="w-5 h-5 mr-2" />
          Support & Help
        </h3>
        
        <div className="space-y-4">
          <button className="w-full text-left p-4 rounded-lg border border-light hover:border-accent/50 transition-all">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-accent" />
              <div>
                <h4 className="font-medium text-primary">Contact Support</h4>
                <p className="text-sm text-secondary">Get help with your account or report issues</p>
              </div>
            </div>
          </button>
          
          <button className="w-full text-left p-4 rounded-lg border border-light hover:border-accent/50 transition-all">
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-5 h-5 text-info" />
              <div>
                <h4 className="font-medium text-primary">Help Center</h4>
                <p className="text-sm text-secondary">Browse FAQs and troubleshooting guides</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;