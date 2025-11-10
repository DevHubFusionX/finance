import { Save, AlertCircle, Loader2 } from 'lucide-react';

const ProfileForm = ({ 
  profile, 
  isEditing, 
  errors = {},
  isLoading = false,
  onProfileChange, 
  onSave 
}) => {
  const handleInputChange = (field, value) => {
    onProfileChange({ [field]: value });
  };

  const handleSave = async () => {
    const success = await onSave();
    if (success) {
      // Handle success (could show toast notification)
    }
  };

  return (
    <div className="bg-surface border border-light rounded-xl p-8 shadow-finance">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary">Personal Information</h3>
        {isEditing && (
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-warning text-surface shadow-finance transition-finance disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isLoading ? 'Saving...' : 'Save'}</span>
          </button>
        )}
      </div>

      {errors.general && (
        <div className="mb-6 p-4 rounded-lg bg-error/10 border border-error/20 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-error" />
          <span className="text-error text-sm">{errors.general}</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-primary">Full Name</label>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border bg-background text-primary focus:outline-none focus:border-accent ${
                  errors.name ? 'border-error' : 'border-light'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-error flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>
          ) : (
            <p className="px-4 py-3 text-secondary">{profile.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-primary">Email</label>
          {isEditing ? (
            <div>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border bg-background text-primary focus:outline-none focus:border-accent ${
                  errors.email ? 'border-error' : 'border-light'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          ) : (
            <p className="px-4 py-3 text-secondary">{profile.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-primary">Currency</label>
          {isEditing ? (
            <select
              value={profile.currency || 'USD'}
              onChange={(e) => handleInputChange('currency', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          ) : (
            <p className="px-4 py-3 text-secondary">{profile.currency || 'USD'}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-primary">Timezone</label>
          {isEditing ? (
            <select
              value={profile.timezone || 'UTC'}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          ) : (
            <p className="px-4 py-3 text-secondary">{profile.timezone || 'UTC'}</p>
          )}
        </div>
      </div>


    </div>
  );
};

export default ProfileForm;