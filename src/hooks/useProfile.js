import { useState, useCallback, useEffect } from 'react';
import { financeAPI } from '../services';
import { useAsyncOperation } from './useAsyncOperation';
import { validateProfile, formatPhoneNumber } from '../utils/profileValidation';

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const { execute, loading: isLoading } = useAsyncOperation();

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // Load profile from backend
  useEffect(() => {
    const loadProfile = async () => {
      const data = await execute(
        () => financeAPI.getProfile(),
        'Failed to load profile'
      );
      setProfile(data?.user || data);
    };
    loadProfile();
  }, [execute]);

  const updateProfile = useCallback((updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
    
    // Clear errors for updated fields
    if (Object.keys(errors).length > 0) {
      const newErrors = { ...errors };
      Object.keys(updates).forEach(key => {
        delete newErrors[key];
      });
      setErrors(newErrors);
    }
  }, [errors]);

  const handleImageUpload = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, avatar: 'Image must be less than 5MB' }));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        const avatarData = e.target.result;
        const updatedProfile = await execute(
          () => financeAPI.updateAvatar(avatarData),
          'Failed to update avatar'
        );
        if (updatedProfile) {
          setProfile(updatedProfile);
          setErrors(prev => ({ ...prev, avatar: undefined }));
        }
      };
      reader.readAsDataURL(file);
    }
  }, [execute]);

  const toggleEdit = useCallback(() => {
    setIsEditing(prev => !prev);
    if (isEditing) {
      setErrors({});
    }
  }, [isEditing]);

  const saveProfile = useCallback(async () => {
    if (!profile) return false;
    
    const validation = validateProfile(profile);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }
    
    setErrors({});
    
    const updatedProfile = await execute(
      () => financeAPI.updateProfile(profile),
      'Failed to save profile'
    );
    
    if (updatedProfile) {
      setProfile(updatedProfile);
      setIsEditing(false);
      return true;
    }
    
    return false;
  }, [profile, execute]);

  const updateNotifications = useCallback(async (notifications) => {
    const updatedProfile = await execute(
      () => financeAPI.updateNotifications(notifications),
      'Failed to update notifications'
    );
    if (updatedProfile) {
      setProfile(updatedProfile);
    }
  }, [execute]);

  const updatePreferences = useCallback(async (preferences) => {
    const updatedProfile = await execute(
      () => financeAPI.updatePreferences(preferences),
      'Failed to update preferences'
    );
    if (updatedProfile) {
      setProfile(updatedProfile);
      // Update auth store with new currency
      if (preferences.currency) {
        const { useAuthStore } = await import('../store/authStore');
        const { user, setUser } = useAuthStore.getState();
        if (user) {
          setUser({ ...user, preferences: { ...user.preferences, currency: preferences.currency } });
        }
      }
    }
  }, [execute]);

  return {
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
  };
};

export default useProfile;