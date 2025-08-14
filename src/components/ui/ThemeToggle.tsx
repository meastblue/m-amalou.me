import { FaMoon, FaSun } from 'react-icons/fa';
import { useI18n } from '../../hooks/useI18n';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  size?: 'sm' | 'lg';
}

const ThemeToggle = ({ isDarkMode, toggleDarkMode, size = 'lg' }: ThemeToggleProps) => {
  const { t } = useI18n();
  
  const sizeClasses = {
    lg: {
      button: 'w-16 h-8',
      indicator: 'top-1 w-6 h-6',
      translate: 'translate-x-8',
      translateOff: 'translate-x-1',
      icon: 12
    },
    sm: {
      button: 'w-14 h-7',
      indicator: 'top-0.5 w-6 h-6',
      translate: 'translate-x-7',
      translateOff: 'translate-x-0.5',
      icon: 10
    }
  };

  const config = sizeClasses[size];

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative ${config.button} rounded-full transition-all duration-300 border border-[var(--border-color)] flex-shrink-0 ${
        isDarkMode ? 'bg-[var(--color-accent)]' : 'bg-[var(--border-color)]'
      }`}
      aria-label={t.accessibility.toggle_theme}
    >
      <div 
        className={`absolute ${config.indicator} rounded-full transition-all duration-300 flex items-center justify-center ${size === 'lg' ? 'shadow-md' : 'shadow-sm'} ${
          isDarkMode ? `${config.translate} bg-white` : `${config.translateOff} bg-[var(--bg-secondary)]`
        }`}
      >
        <div className={isDarkMode ? 'text-[var(--color-accent)]' : 'text-[var(--text-tertiary)]'}>
          {isDarkMode ? <FaMoon size={config.icon} /> : <FaSun size={config.icon} />}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;