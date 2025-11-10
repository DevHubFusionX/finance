import { useEffect, useState } from 'react';
import { X, ArrowRight, ArrowLeft, Compass } from 'lucide-react';
import { useTourStore } from '../../store/tourStore';

const SimpleTour = ({ tourConfig }) => {
  const { activeTour, currentStep, nextStep, prevStep, completeTour, skipTour } = useTourStore();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [highlight, setHighlight] = useState(null);

  const isActive = activeTour === tourConfig.name;
  const step = isActive ? tourConfig.steps[currentStep] : null;
  const isLastStep = currentStep === tourConfig.steps.length - 1;

  useEffect(() => {
    if (!isActive || !step) return;

    const updatePosition = () => {
      const element = document.querySelector(step.target);
      if (!element) return;

      element.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        const rect = element.getBoundingClientRect();
        const isMobile = window.innerWidth < 640;
        
        setHighlight({
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16
        });

        // Position tooltip
        let top, left;

        if (isMobile) {
          // Always position at bottom on mobile
          top = window.innerHeight - 240;
          left = 16;
        } else {
          // Desktop positioning
          top = rect.bottom + 16;
          left = rect.left;
          
          // Keep on screen
          if (top + 250 > window.innerHeight) {
            top = rect.top - 266;
          }
          if (left + 400 > window.innerWidth) {
            left = window.innerWidth - 416;
          }
        }

        setPosition({ top, left });
      }, 300);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isActive, step, currentStep]);

  if (!isActive || !step) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 transition-opacity"
        style={{ zIndex: 9998 }}
        onClick={skipTour}
      />

      {/* Highlight Box */}
      {highlight && (
        <div
          className="fixed border-4 border-accent rounded-lg pointer-events-none animate-pulse"
          style={{
            zIndex: 9999,
            top: `${highlight.top}px`,
            left: `${highlight.left}px`,
            width: `${highlight.width}px`,
            height: `${highlight.height}px`,
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.75), 0 0 30px rgba(166,124,0,0.6)',
            transition: 'all 0.3s ease'
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className="fixed bg-surface rounded-xl shadow-2xl border-2 border-accent/30 w-[calc(100vw-32px)] sm:w-96"
        style={{
          zIndex: 10000,
          top: `${position.top}px`,
          left: `${position.left}px`,
          transition: 'all 0.3s ease'
        }}
      >
        {/* Header */}
        <div className="bg-accent/10 p-4 flex items-center justify-between border-b border-accent/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Compass className="w-4 h-4 text-surface" />
            </div>
            <div>
              <h3 className="font-bold text-primary text-sm">{step.title}</h3>
              <p className="text-xs text-muted">Step {currentStep + 1} of {tourConfig.steps.length}</p>
            </div>
          </div>
          <button onClick={skipTour} className="text-secondary hover:text-primary p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-secondary text-sm leading-relaxed">{step.content}</p>
        </div>

        {/* Footer */}
        <div className="p-4 bg-background border-t border-light flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-1 px-3 py-2 text-sm text-secondary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex space-x-1.5">
            {tourConfig.steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentStep ? 'bg-accent w-6' : 'bg-light w-1.5'
                }`}
              />
            ))}
          </div>

          <button
            onClick={isLastStep ? completeTour : nextStep}
            className="flex items-center space-x-1 px-4 py-2 bg-accent text-surface rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
          >
            <span>{isLastStep ? 'Done' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SimpleTour;
