import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, TrendingUp, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await login(formData);
      if (result.success) {
        const isOnboardingComplete = localStorage.getItem('onboardingComplete');
        navigate(isOnboardingComplete ? '/dashboard' : '/onboarding');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{backgroundColor: '#F7FAFC'}}>
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-2 mb-8">
              <div className="p-2 rounded-full" style={{backgroundColor: '#4A5568'}}>
                <TrendingUp className="w-6 h-6" style={{color: '#F7FAFC'}} />
              </div>
              <span className="text-2xl font-bold" style={{color: '#2D3748'}}>FinanceAI</span>
            </Link>
            <h2 className="text-3xl font-bold" style={{color: '#2D3748'}}>Welcome Back</h2>
            <p className="mt-2" style={{color: '#4A5568'}}>Continue your financial journey</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: '#2D3748'}}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#4A5568'}} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border transition-colors duration-200 focus:outline-none"
                  style={{backgroundColor: '#F7FAFC', borderColor: 'rgba(74, 85, 104, 0.2)', color: '#2D3748'}}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{color: '#2D3748'}}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#4A5568'}} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border transition-colors duration-200 focus:outline-none"
                  style={{backgroundColor: '#F7FAFC', borderColor: 'rgba(74, 85, 104, 0.2)', color: '#2D3748'}}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? 
                    <EyeOff className="w-5 h-5" style={{color: '#4A5568'}} /> : 
                    <Eye className="w-5 h-5" style={{color: '#4A5568'}} />
                  }
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded" style={{accentColor: '#A67C00'}} />
                <span className="ml-2 text-sm" style={{color: '#4A5568'}}>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm hover:underline" style={{color: '#A67C00'}}>
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
              style={{backgroundColor: '#2D3748', color: '#F7FAFC'}}
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              {!loading && <ArrowRight className="w-5 h-5" />}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p style={{color: '#4A5568'}}>
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium hover:underline" style={{color: '#A67C00'}}>
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12" style={{backgroundColor: 'rgba(74, 85, 104, 0.05)'}}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-lg text-center"
        >
          <div className="mb-8 p-12 rounded-3xl" style={{backgroundColor: 'rgba(166, 124, 0, 0.1)', border: '1px solid rgba(166, 124, 0, 0.2)'}}>
            <div className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center" style={{backgroundColor: '#A67C00'}}>
              <TrendingUp className="w-16 h-16" style={{color: '#F7FAFC'}} />
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{color: '#2D3748'}}>Your Financial Story Awaits</h3>
            <p className="leading-relaxed" style={{color: '#4A5568'}}>
              Join thousands who have transformed their relationship with money through intelligent insights and purposeful financial storytelling.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;