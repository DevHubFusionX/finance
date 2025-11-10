import { useEffect, useState } from 'react';
import { X, ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTourStore } from '../../store/tourStore';

const TourGuide = ({ tourConfig }) => {
  const { activeTour, currentStep, nextStep, prevStep, completeTour, skipTour } = useTourStore();
  const [targetElement, setTargetElement] = useState(null);
  const [targetRect, setTargetRect] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: '50%', left: '50%' });

  const isActive = activeTour === tourConfig.name;
  const currentTourStep = isActive ? tourConfig.steps[currentStep] : null;

  useEffect(() => {
    if (isActive && currentTourStep) {
      setTimeout(() => {
        const element = document.querySelector(currentTourStep.target);
        setTargetElement(element);
        
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
          
          setTimeout(() => {
            const rect = element.getBoundingClientRect();
            setTargetRect(rect);
            
            // Calculate tooltip position
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const isMobile = viewportWidth < 640;
            const tooltipHeight = isMobile ? 350 : 400;
            const tooltipWidth = isMobile ? Math.min(viewportWidth - 32, 380) : 448;
            
            let top = rect.bottom + 20;
            let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
            
            // Adjust if tooltip goes off screen
            if (top + tooltipHeight > viewportHeight) {
              top = rect.top - tooltipHeight - 20;
            }
            if (left < 20) left = 20;
            if (left + tooltipWidth > viewportWidth - 20) {
              left = viewportWidth - tooltipWidth - 20;
            }
            
            setTooltipPosition({ top: `${top}px`, left: `${left}px` });
          }, 100);
        }
      }, 100);
    }

    return () => {
      setTargetElement(null);
      setTargetRect(null);
    };
  }, [isActive, currentStep, currentTourStep]);

  if (!isActive || !currentTourStep) return null;

  const isLastStep = currentStep === tourConfig.steps.length - 1;

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70"
        style={{ zIndex: 9998 }}
        onClick={skipTour}
      />
      
      {/* Spotlight highlight */}
      {targetRect && (
        <div
          className="fixed border-4 border-accent rounded-lg pointer-events-none"
          style={{
            zIndex: 9999,
            top: `${targetRect.top - 8}px`,
            left: `${targetRect.left - 8}px`,
            width: `${targetRect.width + 16}px`,
            height: `${targetRect.height + 16}px`,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7), 0 0 20px rgba(166, 124, 0, 0.5)',
            transition: 'all 0.3s ease'
          }}
        />
      )}
      
      {/* Tour card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed bg-surface border border-light rounded-xl shadow-2xl w-full mx-4 max-w-[95vw] sm:max-w-md"
        style={{ 
          zIndex: 10000,
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          transform: tooltipPosition.top === '50%' ? 'translate(-50%, -50%)' : 'none'
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-accent/20 to-accent/10 px-6 py-4 border-b border-light flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <Lightbulb className="w-5 h-5 text-surface" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">{currentTourStep.title}</h3>
              <p className="text-xs text-muted mt-1">Step {currentStep + 1} of {tourConfig.steps.length}</p>
            </div>
          </div>
          <button 
            onClick={skipTour} 
            className="text-secondary hover:text-primary transition-finance p-1 hover:bg-background rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-secondary leading-relaxed text-sm">{currentTourStep.content}</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-background border-t border-light flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-4 py-2 text-secondary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-finance rounded-lg hover:bg-surface"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="flex space-x-2">
            {tourConfig.steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep ? 'bg-accent w-8' : 'bg-light w-2'
                }`}
              />
            ))}
          </div>

          <button
            onClick={isLastStep ? completeTour : nextStep}
            className="flex items-center space-x-2 px-5 py-2 bg-accent text-surface rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <span className="text-sm">{isLastStep ? 'Finish' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TourGuide;
