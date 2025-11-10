import { useState } from 'react';
import { User, Camera, Mail, Calendar, Bell, Globe, DollarSign, Save } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import useProfile from '../hooks/useProfile';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Profile = () => {
  const {
    profile,
    isEditing,
    errors,
    isLoading,
    updateProfile,
    handleImageUpload,
    toggleEdit,
    saveProfile,
    updateNotifications,
    updatePreferences
  } = useProfile();

  const [activeTab, setActiveTab] = useState('profile');

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <LoadingSpinner text="Loading profile..." />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-surface border-b border-light px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center space-x-3 mb-2">
              <User className="w-7 h-7 text-accent" />
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">Profile Settings</h1>
            </div>
            <p className="text-sm sm:text-base text-secondary">Manage your account and preferences</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Profile Card */}
          <div className="bg-surface border border-light rounded-xl p-6 sm:p-8 shadow-finance mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden bg-background border-2 border-light">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-secondary" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-2 bg-accent rounded-full cursor-pointer shadow-finance hover:shadow-finance-lg transition-finance">
                  <Camera className="w-4 h-4 text-surface" />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-primary mb-1">{profile.name || 'User'}</h2>
                <p className="text-secondary mb-4">{profile.email || 'No email'}</p>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm text-secondary">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(profile.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{profile.currency || 'USD'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span>{profile.timezone || 'UTC'}</span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={isEditing ? saveProfile : toggleEdit}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-accent text-surface px-6 py-3 rounded-lg shadow-finance hover:shadow-finance-lg transition-finance disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mb-6 border-b border-light">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-3 font-medium transition-finance border-b-2 ${
                activeTab === 'profile'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              Profile Info
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-4 py-3 font-medium transition-finance border-b-2 ${
                activeTab === 'preferences'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              Preferences
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-4 py-3 font-medium transition-finance border-b-2 ${
                activeTab === 'notifications'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              Notifications
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-surface border border-light rounded-xl p-6 sm:p-8 shadow-finance">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profile.name || ''}
                    onChange={(e) => updateProfile({ name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-background border border-light rounded-lg text-primary focus:border-accent focus:ring-1 focus:ring-accent transition-finance disabled:opacity-50"
                  />
                  {errors.name && <p className="text-danger text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email || ''}
                    disabled
                    className="w-full px-4 py-3 bg-background border border-light rounded-lg text-secondary cursor-not-allowed"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profile.phone || ''}
                      onChange={(e) => updateProfile({ phone: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-background border border-light rounded-lg text-primary focus:border-accent focus:ring-1 focus:ring-accent transition-finance disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Location</label>
                    <input
                      type="text"
                      value={profile.location || ''}
                      onChange={(e) => updateProfile({ location: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-background border border-light rounded-lg text-primary focus:border-accent focus:ring-1 focus:ring-accent transition-finance disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Currency</label>
                  <select
                    value={profile.currency || 'USD'}
                    onChange={(e) => updatePreferences({ currency: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-light rounded-lg text-primary focus:border-accent focus:ring-1 focus:ring-accent transition-finance"
                  >
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="EUR">EUR (€) - Euro</option>
                    <option value="GBP">GBP (£) - British Pound</option>
                    <option value="CAD">CAD ($) - Canadian Dollar</option>
                    <option value="AUD">AUD ($) - Australian Dollar</option>
                    <option value="JPY">JPY (¥) - Japanese Yen</option>
                    <option value="INR">INR (₹) - Indian Rupee</option>
                    <option value="NGN">NGN (₦) - Nigerian Naira</option>
                    <option value="CNY">CNY (¥) - Chinese Yuan</option>
                    <option value="CHF">CHF (Fr) - Swiss Franc</option>
                    <option value="BRL">BRL (R$) - Brazilian Real</option>
                    <option value="MXN">MXN ($) - Mexican Peso</option>
                    <option value="ZAR">ZAR (R) - South African Rand</option>
                    <option value="KRW">KRW (₩) - South Korean Won</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Timezone</label>
                  <select
                    value={profile.timezone || 'UTC'}
                    onChange={(e) => updatePreferences({ timezone: e.target.value })}
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
                    value={profile.language || 'en'}
                    onChange={(e) => updatePreferences({ language: e.target.value })}
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
                      checked={profile.notifications?.email || false}
                      onChange={(e) => updateNotifications({ email: e.target.checked })}
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
                      checked={profile.notifications?.budgetAlerts || false}
                      onChange={(e) => updateNotifications({ budgetAlerts: e.target.checked })}
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
                      checked={profile.notifications?.goalReminders || false}
                      onChange={(e) => updateNotifications({ goalReminders: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-light peer-focus:ring-2 peer-focus:ring-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;