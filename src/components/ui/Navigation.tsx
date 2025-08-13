import { useEffect, useState } from 'react';
import { usePortfolio } from '../../hooks/usePortfolio';

const Navigation = () => {
  const { navigation } = usePortfolio();
  const [activeSection, setActiveSection] = useState('hero');

  const SCROLL_OFFSET = 200;

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    setActiveSection(sectionId);
  };

  const handleScroll = (): void => {
    const sections = navigation.map(item => item.section);

    for (const section of sections) {
      const element = document.getElementById(section);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      if (rect.top <= SCROLL_OFFSET && rect.bottom >= SCROLL_OFFSET) {
        setActiveSection(section);
        break;
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <nav
      className="mobile-nav fixed bottom-0 left-0 right-0 z-[var(--z-fixed)] backdrop-blur-lg shadow-lg border-t safe-bottom"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border-color)',
        opacity: 0.95
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="p-3">
        <div className="flex justify-center">
          <div
            className="flex items-center gap-1 rounded-full p-1 shadow-inner max-w-full overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-surface)',
              opacity: 0.9
            }}
          >
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.section)}
                className={`touch-target px-2 py-2 text-fluid-sm font-medium transition-all duration-[var(--duration-base)] rounded-full flex-shrink-0 whitespace-nowrap animate-mobile-scale ${
                  activeSection === item.section
                    ? 'shadow-sm border'
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: activeSection === item.section ? 'var(--bg-surface)' : 'transparent',
                  color: activeSection === item.section ? 'var(--color-primary)' : 'var(--text-secondary)',
                  borderColor: activeSection === item.section ? 'var(--color-primary)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.section) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.opacity = '0.5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.section) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.opacity = '1';
                  }
                }}
                aria-label={`Navigate to ${item.label} section`}
                aria-current={activeSection === item.section ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
