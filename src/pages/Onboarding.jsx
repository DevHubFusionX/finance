import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, DollarSign, Upload, Link } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { financeAPI } from '../services';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    currency: user?.preferences?.currency || 'USD',
    monthlyIncome: '',
    setupMethod: ''
  });

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save preferences and complete onboarding
      try {
        await financeAPI.updatePreferences({
          currency: formData.currency
        });
        // Update auth store with currency
        const { setUser } = useAuthStore.getState();
        if (user) {
          setUser({ ...user, preferences: { ...user.preferences, currency: formData.currency } });
        }
        localStorage.setItem('onboardingComplete', 'true');
        // Ensure tour will show for new users
        const tourStore = JSON.parse(localStorage.getItem('tour-store') || '{}');
        if (!tourStore.state) {
          localStorage.setItem('tour-store', JSON.stringify({
            state: { isFirstVisit: true, hasSeenWelcome: false, completedTours: [], activeTour: null, currentStep: 0 },
            version: 0
          }));
        }
        navigate('/dashboard');
      } catch (error) {
        console.error('Failed to save preferences:', error);
        // Continue anyway
        localStorage.setItem('onboardingComplete', 'true');
        navigate('/dashboard');
      }
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboardingComplete', 'true');
    navigate('/dashboard');
  };

  const renderStep1 = () => (
    <div className="text-center">
      <DollarSign className="w-16 h-16 text-accent mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-primary mb-4">Set Your Currency</h2>
      <p className="text-secondary mb-8">Choose your preferred currency for tracking finances</p>
      
      <select
        value={formData.currency}
        onChange={(e) => setFormData({...formData, currency: e.target.value})}
        className="w-full max-w-md mx-auto px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent mb-6"
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
  );

  const renderStep2 = () => (
    <div className="text-center">
      <DollarSign className="w-16 h-16 text-success mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-primary mb-4">Monthly Income</h2>
      <p className="text-secondary mb-8">Enter your approximate monthly income (optional)</p>
      
      <input
        type="number"
        placeholder="Enter amount"
        value={formData.monthlyIncome}
        onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
        className="w-full max-w-md mx-auto px-4 py-3 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent mb-6"
      />
      
      <p className="text-sm text-muted">You can update this later in your profile</p>
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-primary mb-4">Connect Your Data</h2>
      <p className="text-secondary mb-8">Choose how you'd like to get started</p>
      
      <div className="space-y-4 max-w-md mx-auto">
        <button
          onClick={() => setFormData({...formData, setupMethod: 'manual'})}
          className={`w-full p-4 rounded-lg border-2 transition-all ${
            formData.setupMethod === 'manual' 
              ? 'border-accent bg-accent/10' 
              : 'border-light hover:border-accent/50'
          }`}
        >
          <DollarSign className="w-8 h-8 text-accent mx-auto mb-2" />
          <h3 className="font-semibold text-primary">Start Manually</h3>
          <p className="text-sm text-secondary">Add transactions as you go</p>
        </button>
        
        <button
          onClick={() => setFormData({...formData, setupMethod: 'import'})}
          className={`w-full p-4 rounded-lg border-2 transition-all ${
            formData.setupMethod === 'import' 
              ? 'border-accent bg-accent/10' 
              : 'border-light hover:border-accent/50'
          }`}
        >
          <Upload className="w-8 h-8 text-info mx-auto mb-2" />
          <h3 className="font-semibold text-primary">Import CSV</h3>
          <p className="text-sm text-secondary">Upload existing transaction data</p>
        </button>
        
        <button
          onClick={() => setFormData({...formData, setupMethod: 'connect'})}
          className={`w-full p-4 rounded-lg border-2 transition-all ${
            formData.setupMethod === 'connect' 
              ? 'border-accent bg-accent/10' 
              : 'border-light hover:border-accent/50'
          }`}
        >
          <Link className="w-8 h-8 text-warning mx-auto mb-2" />
          <h3 className="font-semibold text-primary">Connect Bank</h3>
          <p className="text-sm text-secondary">Link your bank account (coming soon)</p>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-secondary">Step {step} of 3</span>
            <button onClick={handleSkip} className="text-sm text-accent hover:underline">
              Skip Setup
            </button>
          </div>
          <div className="w-full bg-light rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-surface rounded-xl p-8 shadow-finance">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          
          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2 text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={step === 3 && !formData.setupMethod}
              className="flex items-center space-x-2 px-6 py-3 bg-accent text-surface rounded-lg font-medium shadow-finance hover:shadow-finance-lg transition-finance disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{step === 3 ? 'Get Started' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;