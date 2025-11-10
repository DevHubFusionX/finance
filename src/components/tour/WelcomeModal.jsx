import { motion } from 'framer-motion';
import { Sparkles, X, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useTourStore } from '../../store/tourStore';

const WelcomeModal = () => {
  const { isFirstVisit, hasSeenWelcome, setWelcomeSeen, startTour, skipAllTours } = useTourStore();

  if (!isFirstVisit || hasSeenWelcome) return null;

  const handleStartTour = () => {
    setWelcomeSeen();
    startTour('dashboard');
  };

  const handleSkip = () => {
    setWelcomeSeen();
    skipAllTours();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4" style={{ zIndex: 10001, backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-surface rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-accent/20 via-accent/15 to-accent/10 p-6 sm:p-8 text-center relative">
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-secondary hover:text-primary transition-finance p-2 hover:bg-surface/50 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-surface" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl font-bold text-primary mb-2"
          >
            Welcome to FinanceAI!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-secondary text-base sm:text-lg"
          >
            Your journey to financial mastery begins here
          </motion.p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start space-x-3 mb-6">
            <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-primary mb-2 text-lg">Let's get you started!</h3>
              <p className="text-secondary text-sm leading-relaxed">
                We've prepared a quick guided tour to help you understand all the powerful features 
                at your fingertips. It'll only take a few minutes and will help you make the most 
                of FinanceAI.
              </p>
            </div>
          </div>

          <div className="bg-background rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-primary mb-4 flex items-center space-x-2">
              <span>What you'll learn:</span>
            </h4>
            <div className="space-y-3">
              {[
                'Track your income and expenses effortlessly',
                'Get AI-powered insights about your spending',
                'Set budgets and achieve your financial goals',
                'Generate detailed reports and analytics'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-secondary text-sm">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartTour}
              className="flex-1 bg-accent text-surface px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Start Guided Tour
            </motion.button>
            <button
              onClick={handleSkip}
              className="flex-1 bg-background text-secondary px-6 py-3 rounded-xl font-medium hover:bg-light transition-finance border border-light"
            >
              Skip for Now
            </button>
          </div>
          
          <p className="text-center text-xs text-muted mt-4">
            You can restart the tour anytime from Settings → Preferences
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeModal;
