import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, TrendingUp, ArrowRight, CheckCircle, Phone, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    phone: '',
    country: 'US',
    currency: 'USD'
  });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }
    
    try {
      const { confirmPassword, ...signupData } = formData;
      const result = await register(signupData);
      
      if (result.success) {
        // Initialize tour for new user
        localStorage.setItem('tour-store', JSON.stringify({
          state: { isFirstVisit: true, hasSeenWelcome: false, completedTours: [], activeTour: null, currentStep: 0 },
          version: 0
        }));
        
        if (result.data.requiresVerification) {
          navigate('/verify-otp', { state: { email: result.data.email } });
        } else {
          navigate('/onboarding');
        }
      } else {
        setError(result.error || 'Signup failed');
      }
    } catch (error) {
      setError('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    'AI-powered financial insights',
    'Personalized spending analysis',
    'Smart budget recommendations',
    'Secure data encryption'
  ];

  return (
    <div className="min-h-screen flex" style={{backgroundColor: '#F7FAFC'}}>
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12" style={{backgroundColor: 'rgba(74, 85, 104, 0.05)'}}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-lg"
        >
          <div className="mb-8 p-8 rounded-3xl" style={{backgroundColor: 'rgba(166, 124, 0, 0.1)', border: '1px solid rgba(166, 124, 0, 0.2)'}}>
            <h3 className="text-3xl font-bold mb-6" style={{color: '#2D3748'}}>Begin Your Financial Renaissance</h3>
            <p className="text-lg mb-8 leading-relaxed" style={{color: '#4A5568'}}>
              Transform your financial future with AI-powered insights and elegant money management tools designed for the modern mind.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5" style={{color: '#A67C00'}} />
                  <span style={{color: '#4A5568'}}>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
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
            <h2 className="text-3xl font-bold" style={{color: '#2D3748'}}>Create Account</h2>
            <p className="mt-2" style={{color: '#4A5568'}}>Start your financial storytelling journey</p>
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
              <label className="block text-sm font-medium mb-2" style={{color: '#2D3748'}}>Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#4A5568'}} />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border transition-colors duration-200 focus:outline-none"
                  style={{backgroundColor: '#F7FAFC', borderColor: 'rgba(74, 85, 104, 0.2)', color: '#2D3748'}}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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
              <label className="block text-sm font-medium mb-2" style={{color: '#2D3748'}}>Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#4A5568'}} />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border transition-colors duration-200 focus:outline-none"
                  style={{backgroundColor: '#F7FAFC', borderColor: 'rgba(74, 85, 104, 0.2)', color: '#2D3748'}}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#2D3748'}}>Country</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#4A5568'}} />
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border transition-colors duration-200 focus:outline-none appearance-none"
                    style={{backgroundColor: '#F7FAFC', borderColor: 'rgba(74, 85, 104, 0.2)', color: '#2D3748'}}
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="IN">India</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#2D3748'}}>Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({...formData, currency: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border transition-colors duration-200 focus:outline-none appearance-none"
                  style={{backgroundColor: '#F7FAFC', borderColor: 'rgba(74, 85, 104, 0.2)', color: '#2D3748'}}
                  size="5"
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
                  placeholder="Create a password (min 8 characters)"
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

            <div>
              <label className="block text-sm font-medium mb-2" style={{color: '#2D3748'}}>Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#4A5568'}} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border transition-colors duration-200 focus:outline-none"
                  style={{backgroundColor: '#F7FAFC', borderColor: 'rgba(74, 85, 104, 0.2)', color: '#2D3748'}}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? 
                    <EyeOff className="w-5 h-5" style={{color: '#4A5568'}} /> : 
                    <Eye className="w-5 h-5" style={{color: '#4A5568'}} />
                  }
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <input type="checkbox" required className="mt-1 rounded" style={{accentColor: '#A67C00'}} />
              <span className="ml-2 text-sm" style={{color: '#4A5568'}}>
                I agree to the{' '}
                <Link to="/terms" className="hover:underline" style={{color: '#A67C00'}}>Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="hover:underline" style={{color: '#A67C00'}}>Privacy Policy</Link>
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
              style={{backgroundColor: '#2D3748', color: '#F7FAFC'}}
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              {!loading && <ArrowRight className="w-5 h-5" />}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p style={{color: '#4A5568'}}>
              Already have an account?{' '}
              <Link to="/login" className="font-medium hover:underline" style={{color: '#A67C00'}}>
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;