import { useEffect, useState, useCallback, useMemo } from 'react';
import { useI18n, useI18nNavigation } from '../../hooks/useI18n';

const Navigation = () => {
  const { t, translate } = useI18n();
  const navigation = useI18nNavigation();
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const SCROLL_OFFSET = 100;
  const SCROLL_THRESHOLD = 50;

  const scrollToSection = useCallback((sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const headerHeight = 80;
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
    
    setActiveSection(sectionId);
  }, []);

  const handleScroll = useCallback((): void => {
    const currentScrollY = window.scrollY;
    const sections = navigation.map(item => item.section);

    // Auto-hide/show navigation on scroll
    if (currentScrollY > lastScrollY && currentScrollY > SCROLL_THRESHOLD) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
    setIsScrolled(currentScrollY > SCROLL_THRESHOLD);

    // Active section detection with improved logic
    let newActiveSection = 'hero';
    let minDistance = Infinity;
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const distance = Math.abs(rect.top - SCROLL_OFFSET);
      
      if (rect.top <= SCROLL_OFFSET && rect.bottom >= SCROLL_OFFSET && distance < minDistance) {
        newActiveSection = section;
        minDistance = distance;
      }
    }
    
    if (newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }
  }, [navigation, activeSection, lastScrollY]);

  // Throttled scroll handler for performance
  const throttledHandleScroll = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => handleScroll(), 10);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', throttledHandleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('scroll', throttledHandleScroll);
      };
    }
  }, [throttledHandleScroll, handleScroll]);

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation support
  const handleKeyDown = useCallback((e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  }, [scrollToSection]);

  return (
    <>

      {/* Desktop Right Sidebar - Email */}
      <div className={`hidden lg:flex fixed right-8 xl:right-12 bottom-0 w-10 flex-col items-center gap-5 pb-6 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <a href="mailto:contact@massinissa-amalou.fr" 
           className="transition-all duration-300 text-xs font-mono tracking-widest hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm p-2"
           style={{ 
             writingMode: 'vertical-rl',
             color: 'var(--text-tertiary)',
             '--tw-ring-color': 'var(--color-accent)' as any
           }}
           onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
           onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}
           aria-label={t.accessibility.send_email}>
          {t.personal.email}
        </a>
        <div className="w-[1px] h-20" style={{ backgroundColor: 'var(--border-color)' }}></div>
      </div>


      {/* Mobile Bottom Navigation */}
      <nav
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-[var(--z-fixed)] backdrop-blur-xl border-t safe-bottom transition-all duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        } ${
          isScrolled ? 'shadow-lg' : ''
        }`}
        style={{
          backgroundColor: isScrolled 
            ? 'var(--bg-secondary)' 
            : 'rgba(var(--bg-secondary-rgb, 255, 255, 255), 0.95)',
          borderColor: 'var(--border-color)',
        }}
        role="navigation"
        aria-label={t.navigation.mobile_navigation}
      >
        <div className="px-2 py-3 safe-bottom">
          <div className="flex items-center justify-around gap-1">
            {navigation.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.section)}
                onKeyDown={(e) => handleKeyDown(e, item.section)}
                className="flex-1 min-w-0 px-2 py-3 text-xs font-medium transition-all duration-300 rounded-lg touch-target focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95"
                style={{
                  color: activeSection === item.section
                    ? 'var(--color-accent)'
                    : 'var(--text-secondary)',
                  backgroundColor: activeSection === item.section
                    ? 'var(--color-accent-light)'
                    : 'transparent',
                  fontWeight: activeSection === item.section ? '600' : '500',
                  '--tw-ring-color': 'var(--color-accent)' as any
                }}
                aria-label={translate('accessibility.navigate_to', { section: item.label })}
                aria-current={activeSection === item.section ? 'page' : undefined}
              >
                <span className="block truncate">{item.label}</span>
                {activeSection === item.section && (
                  <span 
                    className="block w-6 h-0.5 mx-auto mt-1 rounded-full transition-all duration-300"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
