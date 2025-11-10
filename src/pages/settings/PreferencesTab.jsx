import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { useTourStore } from '../../store/tourStore';

const PreferencesTab = ({ settings, setSettings }) => {
  const { resetTours } = useTourStore();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-light">
        <div>
          <h4 className="font-medium text-primary">Dark Mode</h4>
          <p className="text-sm text-secondary">Switch between light and dark themes</p>
        </div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isDarkMode ? 'bg-accent' : 'bg-secondary'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-surface transition-transform ${
            isDarkMode ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2 text-primary">Currency</label>
        <select
          value={settings.currency}
          onChange={(e) => setSettings({...settings, currency: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="JPY">JPY - Japanese Yen</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2 text-primary">Language</label>
        <select
          value={settings.language}
          onChange={(e) => setSettings({...settings, language: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-light">
        <div>
          <h4 className="font-medium text-primary">Guided Tours</h4>
          <p className="text-sm text-secondary">Restart the welcome tour and feature guides</p>
        </div>
        <button
          onClick={() => {
            if (confirm('This will restart all guided tours. Continue?')) {
              resetTours();
              alert('Tours have been reset! Refresh the page to see the welcome screen.');
            }
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-finance"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm font-medium">Restart Tours</span>
        </button>
      </div>
    </div>
  );
};

export default PreferencesTab;