import { useState } from 'react';
import { User, Settings, Activity, Sliders } from 'lucide-react';

const ProfileTabs = ({ children, defaultTab = 'profile' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'preferences', label: 'Preferences', icon: Sliders }
  ];

  return (
    <div className="bg-surface border border-light rounded-xl shadow-finance overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-light">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-accent border-b-2 border-accent bg-accent/5'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {typeof children === 'function' ? children(activeTab) : children}
      </div>
    </div>
  );
};

export default ProfileTabs;