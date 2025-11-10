import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

const PasswordModal = ({ show, onClose }) => {
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

  const handlePasswordChange = () => {
    if (passwordForm.new !== passwordForm.confirm) {
      alert('New passwords do not match');
      return;
    }
    if (passwordForm.new.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    alert('Password changed successfully');
    onClose();
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-primary/50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-xl p-6 w-full max-w-md mx-4 border border-light">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary">Change Password</h3>
          <button onClick={onClose} className="text-secondary hover:text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { key: 'current', label: 'Current Password' },
            { key: 'new', label: 'New Password' },
            { key: 'confirm', label: 'Confirm New Password' }
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1 text-primary">{label}</label>
              <div className="relative">
                <input
                  type={showPasswords[key] ? 'text' : 'password'}
                  value={passwordForm[key]}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, [key]: e.target.value }))}
                  className="w-full px-3 py-2 pr-10 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, [key]: !prev[key] }))}
                  className="absolute right-3 top-2.5 text-secondary hover:text-primary"
                >
                  {showPasswords[key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-light rounded-lg text-secondary hover:bg-background transition-finance"
          >
            Cancel
          </button>
          <button
            onClick={handlePasswordChange}
            className="flex-1 px-4 py-2 bg-accent text-surface rounded-lg hover:shadow-finance transition-finance"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;