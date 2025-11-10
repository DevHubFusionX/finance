export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validateProfile = (profile) => {
  const errors = {};

  if (!profile.name || profile.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!profile.email || !validateEmail(profile.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (profile.phone && !validatePhone(profile.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (profile.bio && profile.bio.length > 500) {
    errors.bio = 'Bio must be less than 500 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};