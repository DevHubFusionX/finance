import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, TrendingUp, RefreshCw } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { financeAPI } from '../services';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  const inputRefs = useRef([]);

  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await financeAPI.verifyOTP({ email, otp: otpString });
      login(response.user, response.tokens.accessToken);
      navigate('/onboarding');
    } catch (error) {
      setError(error.response?.data?.error || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setResending(true);
    setError('');
    
    try {
      await financeAPI.resendOTP({ email });
      setCountdown(60);
      setOtp(['', '', '', '', '', '']);
      setSuccess('Verification code sent successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to resend code');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#F7FAFC'}}>
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
          
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(166, 124, 0, 0.1)'}}>
              <Mail className="w-8 h-8" style={{color: '#A67C00'}} />
            </div>
            <h2 className="text-3xl font-bold" style={{color: '#2D3748'}}>Verify Your Email</h2>
            <p className="mt-2" style={{color: '#4A5568'}}>
              We've sent a 6-digit code to
            </p>
            <p className="font-medium" style={{color: '#2D3748'}}>{email}</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-4 text-center" style={{color: '#2D3748'}}>
              Enter verification code
            </label>
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold rounded-lg border-2 transition-colors duration-200 focus:outline-none"
                  style={{
                    backgroundColor: '#F7FAFC',
                    borderColor: digit ? '#A67C00' : 'rgba(74, 85, 104, 0.2)',
                    color: '#2D3748'
                  }}
                />
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || otp.join('').length !== 6}
            className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
            style={{backgroundColor: '#2D3748', color: '#F7FAFC'}}
          >
            <span>{loading ? 'Verifying...' : 'Verify Email'}</span>
            {!loading && <ArrowRight className="w-5 h-5" />}
          </motion.button>
        </form>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-sm mb-2" style={{color: '#4A5568'}}>
            Didn't receive the code?
          </p>
          <button
            onClick={handleResendOTP}
            disabled={countdown > 0 || resending}
            className="text-sm font-medium hover:underline disabled:opacity-50 flex items-center justify-center space-x-1 mx-auto"
            style={{color: '#A67C00'}}
          >
            <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
            <span>
              {countdown > 0 
                ? `Resend in ${countdown}s` 
                : resending 
                  ? 'Sending...' 
                  : 'Resend code'
              }
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm" style={{color: '#4A5568'}}>
            Wrong email?{' '}
            <Link to="/signup" className="font-medium hover:underline" style={{color: '#A67C00'}}>
              Go back to signup
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;