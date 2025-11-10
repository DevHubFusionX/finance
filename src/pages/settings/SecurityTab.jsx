import { useState } from 'react';
import { Check } from 'lucide-react';
import PasswordModal from './PasswordModal';
import TwoFactorModal from './TwoFactorModal';

const SecurityTab = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <div className="p-6 bg-surface rounded-lg border border-light">
          <h4 className="font-semibold mb-2 text-primary">Change Password</h4>
          <p className="text-sm mb-4 text-secondary">Update your password to keep your account secure</p>
          <button 
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 bg-accent text-surface rounded-lg shadow-finance hover:shadow-finance-lg transition-finance"
          >
            Change Password
          </button>
        </div>
        
        <div className="p-6 bg-surface rounded-lg border border-light">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-primary">Two-Factor Authentication</h4>
              <p className="text-sm text-secondary">Add an extra layer of security to your account</p>
            </div>
            {is2FAEnabled && (
              <div className="flex items-center text-success">
                <Check className="w-4 h-4 mr-1" />
                <span className="text-sm">Enabled</span>
              </div>
            )}
          </div>
          <button 
            onClick={() => setShow2FAModal(true)}
            disabled={is2FAEnabled}
            className={`px-4 py-2 rounded-lg shadow-finance hover:shadow-finance-lg transition-finance ${
              is2FAEnabled 
                ? 'bg-secondary text-muted cursor-not-allowed' 
                : 'bg-info text-surface'
            }`}
          >
            {is2FAEnabled ? '2FA Enabled' : 'Enable 2FA'}
          </button>
        </div>
      </div>

      <PasswordModal 
        show={showPasswordModal} 
        onClose={() => setShowPasswordModal(false)} 
      />
      <TwoFactorModal 
        show={show2FAModal} 
        onClose={() => setShow2FAModal(false)}
        onEnable={() => setIs2FAEnabled(true)}
      />
    </>
  );
};

export default SecurityTab;