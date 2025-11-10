import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const isOnboardingComplete = localStorage.getItem('onboardingComplete');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isOnboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return children;
};

export default ProtectedRoute;