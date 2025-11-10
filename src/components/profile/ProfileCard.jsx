import { User, Camera, Phone, MapPin, Calendar, Edit3, Save } from 'lucide-react';

const ProfileCard = ({ 
  profile, 
  isEditing, 
  onToggleEdit, 
  onImageUpload 
}) => {
  if (!profile) {
    return (
      <div className="bg-surface border border-light rounded-xl p-8 text-center shadow-finance">
        <div className="animate-pulse">
          <div className="w-32 h-32 rounded-full mx-auto bg-light mb-6"></div>
          <div className="h-6 bg-light rounded mb-2"></div>
          <div className="h-4 bg-light rounded mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-light rounded-xl p-8 text-center shadow-finance">
      <div className="relative inline-block mb-6">
        <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center overflow-hidden bg-background">
          {profile.avatar ? (
            <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-16 h-16 text-secondary" />
          )}
        </div>
        <label className="absolute bottom-0 right-0 p-2 bg-accent rounded-full cursor-pointer transition-finance">
          <Camera className="w-4 h-4 text-surface" />
          <input type="file" accept="image/*" onChange={onImageUpload} className="hidden" />
        </label>
      </div>

      <h2 className="text-2xl font-bold mb-2 text-primary">{profile.name || 'User'}</h2>
      <p className="mb-4 text-secondary">{profile.email || 'No email'}</p>
      
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-secondary">{profile.currency || 'USD'} • {profile.timezone || 'UTC'}</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Calendar className="w-4 h-4 text-secondary" />
          <span className="text-secondary">Joined {new Date(profile.createdAt || Date.now()).toLocaleDateString()}</span>
        </div>
      </div>

      <button
        onClick={onToggleEdit}
        className={`mt-6 w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-finance ${
          isEditing ? 'bg-warning text-surface' : 'bg-accent text-surface'
        } shadow-finance hover:shadow-finance-lg`}
      >
        {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
        <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
      </button>
    </div>
  );
};

export default ProfileCard;