import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  const handleClick = () => {
    console.log('ThemeToggle clicked, current isDark:', isDark);
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className="group p-2 rounded-lg transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/10 hover:scale-110"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-180" />
      ) : (
        <Moon className="w-5 h-5 text-dark transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
      )}
    </button>
  );
}
