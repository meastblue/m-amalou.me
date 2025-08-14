import { useDarkMode } from '../../hooks/useDarkMode';
import { useI18n } from '../../hooks/useI18n';
import SocialLinks from '../UI/SocialLinks';
import ThemeToggle from '../UI/ThemeToggle';
import NavigationMenu from '../navigation/NavigationMenu';

interface SidebarProps {
  sections: Array<{
    id: string;
    label: string;
    number: string;
  }>;
  activeSection: string;
  scrollProgress: { [key: string]: number };
  onSectionClick: (sectionId: string) => void;
}

const Sidebar = ({ sections, activeSection, scrollProgress, onSectionClick }: SidebarProps) => {
  const { t } = useI18n();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <aside className="hidden lg:flex w-1/2 fixed left-0 top-0 h-screen flex-col justify-between p-12 bg-[var(--bg-secondary)]">
      <div className="w-full max-w-md mx-auto flex flex-col justify-between h-full py-24">
        <div className="mb-16">
          <div className="flex justify-between items-center gap-8 mb-3">
            <h1 className="text-5xl font-bold leading-tight whitespace-nowrap text-[var(--text-primary)]">
              {t.layout.name}
            </h1>

            <ThemeToggle
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              size="lg"
            />
          </div>

          <p className="text-lg text-[var(--text-secondary)]">
            {t.ui.fullstack_developer}
          </p>
        </div>

        <NavigationMenu
          sections={sections}
          activeSection={activeSection}
          scrollProgress={scrollProgress}
          onSectionClick={onSectionClick}
        />

        <SocialLinks variant="desktop" />
      </div>
    </aside>
  );
};

export default Sidebar;
