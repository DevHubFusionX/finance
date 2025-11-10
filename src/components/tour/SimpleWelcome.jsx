import { Sparkles, X, TrendingUp, Play } from 'lucide-react';
import { useTourStore } from '../../store/tourStore';

const SimpleWelcome = () => {
  const { isFirstVisit, hasSeenWelcome, setWelcomeSeen, startTour, skipAllTours } = useTourStore();

  if (!isFirstVisit || hasSeenWelcome) return null;

  const handleStart = () => {
    setWelcomeSeen();
    startTour('dashboard');
  };

  const handleSkip = () => {
    setWelcomeSeen();
    skipAllTours();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/80" style={{ zIndex: 10001 }}>
      <div className="bg-surface rounded-2xl shadow-2xl max-w-lg w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent/20 to-accent/10 p-6 text-center relative">
          <button onClick={handleSkip} className="absolute top-4 right-4 text-secondary hover:text-primary">
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-8 h-8 text-surface" />
          </div>
          
          <h2 className="text-2xl font-bold text-primary mb-2">Welcome to FinanceAI!</h2>
          <p className="text-secondary">Let's take a quick tour</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-secondary text-sm leading-relaxed">
                We'll show you around the key features in just a few minutes. You'll learn how to track expenses, 
                view insights, and manage your finances effectively.
              </p>
            </div>
          </div>

          <div className="bg-background rounded-lg p-4 space-y-2">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide">You'll discover:</p>
            <ul className="space-y-1.5 text-sm text-secondary">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                <span>How to add and manage transactions</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                <span>AI-powered financial insights</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                <span>Budget tracking and goals</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                <span>Reports and analytics</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleStart}
              className="flex-1 flex items-center justify-center space-x-2 bg-accent text-surface px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Play className="w-4 h-4" />
              <span>Start Tour</span>
            </button>
            <button
              onClick={handleSkip}
              className="px-6 py-3 text-secondary hover:text-primary font-medium"
            >
              Skip
            </button>
          </div>
          
          <p className="text-center text-xs text-muted">
            You can restart tours anytime from Settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleWelcome;
