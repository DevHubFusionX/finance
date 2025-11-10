import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using FinanceAI, you accept and agree to be bound by the terms and provision of this agreement.'
    },
    {
      title: 'Use License',
      content: 'Permission is granted to temporarily use FinanceAI for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.'
    },
    {
      title: 'Privacy and Data Protection',
      content: 'Your privacy is important to us. We collect and use your financial data solely to provide our services. We employ bank-grade security measures to protect your information.'
    },
    {
      title: 'User Responsibilities',
      content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.'
    },
    {
      title: 'Service Availability',
      content: 'We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We reserve the right to modify or discontinue services with notice.'
    },
    {
      title: 'Limitation of Liability',
      content: 'FinanceAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.'
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
            <FileText className="w-8 h-8" style={{color: '#A67C00'}} />
            <h1 className="text-4xl font-bold" style={{color: '#2D3748'}}>Terms of Service</h1>
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
            <h3 className="text-lg font-semibold mb-2" style={{color: '#2D3748'}}>Questions?</h3>
            <p style={{color: '#4A5568'}}>
              If you have any questions about these Terms of Service, please contact us at{' '}
              <span className="font-medium" style={{color: '#A67C00'}}>legal@financeai.com</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;