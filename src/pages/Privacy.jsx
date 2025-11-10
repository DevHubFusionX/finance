import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: 'We collect information you provide directly, such as account details, transaction data, and financial goals. We also collect usage data to improve our services.'
    },
    {
      title: 'How We Use Your Information',
      content: 'Your data is used to provide personalized financial insights, track your progress, and improve our AI algorithms. We never sell your personal information to third parties.'
    },
    {
      title: 'Data Security',
      content: 'We employ bank-grade encryption and security measures. Your financial data is encrypted both in transit and at rest using industry-standard protocols.'
    },
    {
      title: 'Data Sharing',
      content: 'We do not share your personal financial information with third parties except as required by law or with your explicit consent for specific integrations.'
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, update, or delete your personal information. You can export your data or request account deletion at any time.'
    },
    {
      title: 'Cookies and Tracking',
      content: 'We use essential cookies for functionality and analytics cookies to understand usage patterns. You can control cookie preferences in your browser settings.'
    }
  ];

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F7FAFC'}}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/signup" className="inline-flex items-center space-x-2 mb-8 hover:underline" style={{color: '#4A5568'}}>
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign Up</span>
          </Link>

          <div className="flex items-center space-x-3 mb-8">
            <Shield className="w-8 h-8" style={{color: '#A67C00'}} />
            <h1 className="text-4xl font-bold" style={{color: '#2D3748'}}>Privacy Policy</h1>
          </div>

          <p className="text-lg mb-8" style={{color: '#4A5568'}}>
            Last updated: January 1, 2024
          </p>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-2xl border"
                style={{backgroundColor: '#F7FAFC', borderColor: 'rgba(74, 85, 104, 0.1)'}}
              >
                <h2 className="text-xl font-semibold mb-4" style={{color: '#2D3748'}}>{section.title}</h2>
                <p className="leading-relaxed" style={{color: '#4A5568'}}>{section.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl" style={{backgroundColor: 'rgba(166, 124, 0, 0.1)', border: '1px solid rgba(166, 124, 0, 0.2)'}}>
            <h3 className="text-lg font-semibold mb-2" style={{color: '#2D3748'}}>Contact Us</h3>
            <p style={{color: '#4A5568'}}>
              For privacy-related questions or to exercise your rights, contact us at{' '}
              <span className="font-medium" style={{color: '#A67C00'}}>privacy@financeai.com</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;