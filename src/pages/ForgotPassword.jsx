import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{backgroundColor: '#F7FAFC'}}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full text-center p-8 rounded-2xl border"
          style={{backgroundColor: '#F7FAFC', borderColor: 'rgba(74, 85, 104, 0.1)'}}
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(74, 85, 104, 0.1)'}}>
            <CheckCircle className="w-8 h-8" style={{color: '#4A5568'}} />
          </div>
          
          <h2 className="text-2xl font-bold mb-4" style={{color: '#2D3748'}}>Check Your Email</h2>
          <p className="mb-6 leading-relaxed" style={{color: '#4A5568'}}>
            We've sent a password reset link to <strong>{email}</strong>. 
            Please check your inbox and follow the instructions to reset your password.
          </p>
          
          <div className="space-y-4">
            <p className="text-sm" style={{color: '#4A5568'}}>
              Didn't receive the email? Check your spam folder or{' '}
              <button 
                onClick={() => setIsSubmitted(false)}
                className="font-medium hover:underline" 
                style={{color: '#A67C00'}}
              >
                try again
              </button>
            </p>
            
            <Link 
              to="/login"
              className="inline-flex items-center space-x-2 text-sm hover:underline"
              style={{color: '#4A5568'}}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to login</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

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
            <h2 className="text-3xl font-bold" style={{color: '#2D3748'}}>Reset Password</h2>
            <p className="mt-2" style={{color: '#4A5568'}}>
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: '#2D3748'}}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#4A5568'}} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border transition-colors duration-200 focus:outline-none"
                  style={{backgroundColor: '#F7FAFC', borderColor: 'rgba(74, 85, 104, 0.2)', color: '#2D3748'}}
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
              style={{
                backgroundColor: isLoading ? '#4A5568' : '#2D3748', 
                color: '#F7FAFC',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  <span>Send Reset Link</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="text-center space-y-4">
            <Link 
              to="/login" 
              className="inline-flex items-center space-x-2 text-sm hover:underline"
              style={{color: '#4A5568'}}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to login</span>
            </Link>
            
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
              <Mail className="w-16 h-16" style={{color: '#F7FAFC'}} />
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{color: '#2D3748'}}>Secure Password Recovery</h3>
            <p className="leading-relaxed" style={{color: '#4A5568'}}>
              We take your account security seriously. Our password reset process ensures 
              that only you can regain access to your financial data.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;