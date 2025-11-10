import { useState } from 'react';
import { Check } from 'lucide-react';

const OverviewTab = ({ settings, setSettings, setSaveStatus }) => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: settings.name, email: settings.email });
  
  const stats = {
    transactions: 247,
    categories: 12,
    budgets: 5,
    goals: 3
  };

  const handleProfileSave = () => {
    setSettings(prev => ({ ...prev, name: profileForm.name, email: profileForm.email }));
    setEditingProfile(false);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-surface rounded-lg border border-light">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-primary">Profile Information</h4>
          <button
            onClick={() => setEditingProfile(!editingProfile)}
            className="px-3 py-1 text-sm bg-accent text-surface rounded-lg hover:shadow-finance transition-finance"
          >
            {editingProfile ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {editingProfile ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">Email</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
              />
            </div>
            <button
              onClick={handleProfileSave}
              className="px-4 py-2 bg-success text-surface rounded-lg hover:shadow-finance transition-finance"
            >
              Save Profile
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-primary"><span className="font-medium">Name:</span> {settings.name}</p>
            <p className="text-primary"><span className="font-medium">Email:</span> {settings.email}</p>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <div className="text-2xl font-bold text-primary">{value}</div>
            <div className="text-sm text-secondary capitalize">{key}</div>
          </div>
        ))}
      </div>
      
      <div className="p-6 bg-success/10 rounded-lg border border-success/20">
        <h4 className="font-semibold mb-2 text-primary">Account Status</h4>
        <p className="text-sm text-secondary">Your financial dashboard is active and syncing properly.</p>
        <div className="flex items-center mt-2 text-success">
          <Check className="w-4 h-4 mr-1" />
          <span className="text-sm">All systems operational</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;