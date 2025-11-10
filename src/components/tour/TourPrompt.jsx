import { Play, X } from 'lucide-react';
import { useTourStore } from '../../store/tourStore';

const TourPrompt = ({ tourName, title, description }) => {
  const { completedTours, startTour, skipTour, skipAllTours } = useTourStore();
  
  const shouldShow = !completedTours.includes(tourName);

  if (!shouldShow) return null;

  return (
    <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Play className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-primary">{title}</h3>
          </div>
          <p className="text-secondary text-sm mb-4">{description}</p>
          <div className="flex space-x-3">
            <button
              onClick={() => startTour(tourName)}
              className="px-4 py-2 bg-accent text-surface rounded-lg font-medium text-sm shadow-finance hover:shadow-finance-lg transition-finance"
            >
              Start Tour
            </button>
            <button
              onClick={skipTour}
              className="px-4 py-2 text-secondary hover:text-primary text-sm"
            >
              Skip This
            </button>
            <button
              onClick={skipAllTours}
              className="px-4 py-2 text-muted hover:text-secondary text-sm"
            >
              Skip All Tours
            </button>
          </div>
        </div>
        <button onClick={skipTour} className="text-secondary hover:text-primary ml-4">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TourPrompt;