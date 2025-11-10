import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/theme';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-accent/10 transition-colors"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-6 h-6" style={{color: '#F6E05E'}} />
      ) : (
        <Moon className="w-6 h-6" style={{color: '#4A5568'}} />
      )}
    </button>
  );
};

export default ThemeToggle;