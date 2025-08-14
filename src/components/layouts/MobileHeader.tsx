import { useI18n } from '../../hooks/useI18n';
import { useDarkMode } from '../../hooks/useDarkMode';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSelector from '../ui/LanguageSelector';

const MobileHeader = () => {
  const { t } = useI18n();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="lg:hidden">
      <div className="fixed top-0 left-0 right-0 z-50 p-4 border-b border-[var(--border-color)] bg-[var(--bg-primary)]">
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold leading-tight whitespace-nowrap text-[var(--text-primary)]">
              {t.layout.name}
            </h1>
            <p className="text-base text-[var(--text-secondary)]">
              {t.ui.fullstack_developer}
            </p>
          </div>
          
          <div className="flex items-center">
            <ThemeToggle 
              isDarkMode={isDarkMode} 
              toggleDarkMode={toggleDarkMode} 
              size="sm" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;