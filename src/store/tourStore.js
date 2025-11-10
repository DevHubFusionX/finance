import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTourStore = create(
  persist(
    (set, get) => ({
      isFirstVisit: true,
      activeTour: null,
      completedTours: [],
      currentStep: 0,
      hasSeenWelcome: false,
      tourQueue: [],

      startTour: (tourName) => {
        set({ activeTour: tourName, currentStep: 0 });
      },

      nextStep: () => {
        set((state) => ({ currentStep: state.currentStep + 1 }));
      },

      prevStep: () => {
        set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) }));
      },

      completeTour: () => {
        const { activeTour, completedTours } = get();
        if (activeTour && !completedTours.includes(activeTour)) {
          set({
            completedTours: [...completedTours, activeTour],
            activeTour: null,
            currentStep: 0
          });
        }
      },

      skipTour: () => {
        const { activeTour, completedTours } = get();
        if (activeTour && !completedTours.includes(activeTour)) {
          set({
            completedTours: [...completedTours, activeTour],
            activeTour: null,
            currentStep: 0
          });
        } else {
          set({ activeTour: null, currentStep: 0 });
        }
      },

      skipAllTours: () => {
        set({ activeTour: null, currentStep: 0, isFirstVisit: false });
      },

      resetTours: () => {
        set({ isFirstVisit: true, completedTours: [], activeTour: null, currentStep: 0, hasSeenWelcome: false });
      },

      setWelcomeSeen: () => {
        set({ hasSeenWelcome: true });
      },

      shouldShowTour: (tourName) => {
        const { completedTours, isFirstVisit } = get();
        return isFirstVisit && !completedTours.includes(tourName);
      }
    }),
    {
      name: 'tour-store'
    }
  )
);