import { useState } from 'react';
import { Palette, Globe, DollarSign, Calendar } from 'lucide-react';

const ProfilePreferences = ({ onPreferencesChange }) => {
  const [preferences, setPreferences] = useState({
    theme: 'system',
    language: 'en',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    startOfWeek: 'monday'
  });

  const handleChange = (key, value) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    onPreferencesChange?.(newPreferences);
  };

  const options = {
    theme: [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
      { value: 'system', label: 'System' }
    ],
    language: [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' }
    ],
    currency: [
      { value: 'USD', label: 'US Dollar ($)' },
      { value: 'EUR', label: 'Euro (€)' },
      { value: 'GBP', label: 'British Pound (£)' }
    ],
    dateFormat: [
      { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
      { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
      { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
    ],
    startOfWeek: [
      { value: 'sunday', label: 'Sunday' },
      { value: 'monday', label: 'Monday' }
    ]
  };

  const icons = {
    theme: Palette,
    language: Globe,
    currency: DollarSign,
    dateFormat: Calendar,
    startOfWeek: Calendar
  };

  return (
    <div className="bg-surface border border-light rounded-xl p-8 shadow-finance">
      <h3 className="text-xl font-semibold mb-6 text-primary">Preferences</h3>

      <div className="space-y-6">
        {Object.entries(preferences).map(([key, value]) => {
          const Icon = icons[key];
          return (
            <div key={key}>
              <div className="flex items-center space-x-2 mb-3">
                <Icon className="w-5 h-5 text-secondary" />
                <label className="font-medium text-primary capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
              </div>
              <select
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
              >
                {options[key].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePreferences;