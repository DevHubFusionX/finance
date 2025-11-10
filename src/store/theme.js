import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const applyTheme = (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      isDark: false,
      
      toggleTheme: () => {
        const newIsDark = !get().isDark;
        set({ isDark: newIsDark });
        applyTheme(newIsDark);
      },
      
      setTheme: (isDark) => {
        set({ isDark });
        applyTheme(isDark);
      },
      
      getColors: () => {
        const { isDark } = get();
        return isDark ? {
          primary: '#F7FAFC',
          accent: '#E2E8F0',
          background: '#1A202C',
          gold: '#F6E05E',
          rust: '#ED8936',
        } : {
          primary: '#2D3748',
          accent: '#4A5568',
          background: '#F7FAFC',
          gold: '#A67C00',
          rust: '#806419',
        };
      }
    }),
    {
      name: 'theme-store',
    }
  )
);