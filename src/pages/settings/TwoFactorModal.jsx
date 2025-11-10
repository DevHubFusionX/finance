import { useState } from 'react';
import { X } from 'lucide-react';

const TwoFactorModal = ({ show, onClose, onEnable }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const qrCode = 'JBSWY3DPEHPK3PXP'; // Mock 2FA secret

  const handle2FASetup = () => {
    if (verificationCode.length !== 6) {
      alert('Please enter a 6-digit verification code');
      return;
    }
    onEnable();
    onClose();
    setVerificationCode('');
    alert('Two-factor authentication enabled successfully');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-primary/50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-xl p-6 w-full max-w-md mx-4 border border-light">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary">Enable Two-Factor Authentication</h3>
          <button onClick={onClose} className="text-secondary hover:text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="text-center space-y-4">
          <div className="p-4 bg-background rounded-lg border border-light">
            <div className="text-6xl font-mono bg-surface p-4 rounded border border-light">
              {qrCode}
            </div>
            <p className="text-sm text-secondary mt-2">Scan this code with your authenticator app</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-primary">Verification Code</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit code"
              className="w-full px-3 py-2 rounded-lg border border-light bg-background text-primary focus:outline-none focus:border-accent text-center font-mono text-lg"
            />
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-light rounded-lg text-secondary hover:bg-background transition-finance"
          >
            Cancel
          </button>
          <button
            onClick={handle2FASetup}
            className="flex-1 px-4 py-2 bg-info text-surface rounded-lg hover:shadow-finance transition-finance"
          >
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorModal;