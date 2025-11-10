const NotificationsTab = ({ settings, setSettings }) => {
  const notifications = [
    {
      key: 'notifications',
      title: 'Push Notifications',
      description: 'Receive notifications in your browser'
    },
    {
      key: 'emailAlerts',
      title: 'Email Alerts',
      description: 'Get weekly financial summaries via email'
    },
    {
      key: 'budgetAlerts',
      title: 'Budget Alerts',
      description: 'Alert when approaching budget limits'
    }
  ];

  return (
    <div className="space-y-6">
      {notifications.map(({ key, title, description }) => (
        <div key={key} className="flex items-center justify-between p-4 bg-background rounded-lg border border-light">
          <div>
            <h4 className="font-medium text-primary">{title}</h4>
            <p className="text-sm text-secondary">{description}</p>
          </div>
          <input
            type="checkbox"
            checked={settings[key]}
            onChange={(e) => setSettings({...settings, [key]: e.target.checked})}
            className="rounded text-accent focus:ring-accent"
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationsTab;