import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from '../../hooks/useTheme';
import { useI18n } from '../../hooks/useI18n';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useI18n();

  const handleClick = () => {
    console.log('ThemeToggle clicked, current isDark:', isDark);
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className="group p-2 rounded-lg transition-all duration-[var(--duration-base)] hover:scale-110"
      style={{
        backgroundColor: 'transparent'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      aria-label={t.accessibility.toggle_theme}
    >
      {isDark ? (
        <MdLightMode className="w-5 h-5 transition-transform duration-[var(--duration-base)] group-hover:rotate-180" 
             style={{ color: 'var(--text-secondary)' }} />
      ) : (
        <MdDarkMode className="w-5 h-5 transition-transform duration-[var(--duration-base)] group-hover:rotate-12 group-hover:scale-110" 
              style={{ color: 'var(--text-secondary)' }} />
      )}
    </button>
  );
}
