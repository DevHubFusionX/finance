import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  ProfileCard, 
  ProfileStats, 
  ProfileForm, 
  ProfileAchievements,
  ProfileSettings,
  ProfileActivity,
  ProfilePreferences,
  ProfileTabs
} from '../components/profile';
import useProfile from '../hooks/useProfile';

const ProfileEnhanced = () => {
  const {
    profile,
    isEditing,
    updateProfile,
    handleImageUpload,
    toggleEdit,
    saveProfile
  } = useProfile();

  const handleSettingsChange = (settings) => {
    console.log('Settings updated:', settings);
  };

  const handlePreferencesChange = (preferences) => {
    console.log('Preferences updated:', preferences);
  };

  const renderTabContent = (activeTab) => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ProfileCard
                profile={profile}
                isEditing={isEditing}
                onToggleEdit={toggleEdit}
                onImageUpload={handleImageUpload}
              />
              <ProfileStats />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <ProfileForm
                profile={profile}
                isEditing={isEditing}
                onProfileChange={updateProfile}
                onSave={saveProfile}
              />
              <ProfileAchievements />
            </div>
          </div>
        );
      case 'activity':
        return <ProfileActivity />;
      case 'settings':
        return <ProfileSettings onSettingsChange={handleSettingsChange} />;
      case 'preferences':
        return <ProfilePreferences onPreferencesChange={handlePreferencesChange} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-surface border-b border-light px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-2">Profile</h1>
            <p className="text-secondary">Manage your account information and preferences.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <ProfileTabs>
            {renderTabContent}
          </ProfileTabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileEnhanced;