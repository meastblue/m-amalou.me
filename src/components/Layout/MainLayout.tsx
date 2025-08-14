import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaMedium, FaMoon, FaSun } from 'react-icons/fa';
import { FaBluesky } from 'react-icons/fa6';
import { useI18n } from '../../hooks/useI18n';
import { useDarkMode } from '../../hooks/useDarkMode';
import Projects from '../sections/Projects';
import CareerAndScholarship from '../sections/CareerAndScholarship';
import Skills from '../sections/Skills';

const MainLayout = () => {
  const { t } = useI18n();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState<{ [key: string]: number }>({});
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'about', label: 'About', number: '01.' },
    { id: 'career', label: 'Experience', number: '02.' },
    { id: 'projects', label: 'Work', number: '03.' },
    { id: 'skills', label: 'Skills', number: '04.' }
  ];



  // Gestion du scroll pour détecter les sections actives et mettre à jour les jauges
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollContainer = contentRef.current;
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;

      // Calcul de la progression globale
      const globalProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      // Detection simple basée sur la position de scroll
      let currentSection = sections[0].id;
      
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section active si elle est proche du haut de la fenêtre (dans les premiers 300px)
          if (rect.top <= 300) {
            currentSection = section.id;
          }
        }
      });

      setActiveSection(currentSection);

      // Simulation de la progression par section (pour desktop)
      const sectionProgress: { [key: string]: number } = {};
      sections.forEach((section, index) => {
        const sectionStart = (index / sections.length);
        const sectionEnd = ((index + 1) / sections.length);

        if (globalProgress >= sectionStart && globalProgress <= sectionEnd) {
          const localProgress = (globalProgress - sectionStart) / (sectionEnd - sectionStart);
          sectionProgress[section.id] = Math.min(localProgress * 100, 100);
        } else if (globalProgress > sectionEnd) {
          sectionProgress[section.id] = 100;
        } else {
          sectionProgress[section.id] = 0;
        }
      });

      setScrollProgress(sectionProgress);
    };

    if (contentRef.current) {
      contentRef.current.addEventListener('scroll', handleScroll);
      // Appeler une fois au chargement
      handleScroll();
      return () => contentRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && contentRef.current) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Sidebar gauche - Navigation */}
      <aside className="hidden lg:flex w-1/2 fixed left-0 top-0 h-screen flex-col justify-between p-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="w-full max-w-md mx-auto flex flex-col justify-between h-full py-24">
          {/* Header avec nom et theme toggle */}
          <div className="mb-16">
            <div className="flex justify-between items-center gap-8 mb-3">
              <h1 className="text-5xl font-bold leading-tight whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                Massinissa Amalou
              </h1>
              
              {/* Theme toggle switch */}
              <button
                onClick={toggleDarkMode}
                className="relative w-16 h-8 rounded-full transition-all duration-300 border border-opacity-20 flex-shrink-0"
                style={{ 
                  backgroundColor: isDarkMode ? 'var(--color-accent)' : 'var(--border-color)',
                  borderColor: 'var(--border-color)'
                }}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {/* Track background */}
                <div 
                  className="absolute inset-0 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: isDarkMode ? 'var(--color-accent)' : 'transparent'
                  }}
                />
                
                {/* Sliding circle */}
                <div 
                  className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
                    isDarkMode ? 'translate-x-8' : 'translate-x-1'
                  }`}
                  style={{ 
                    backgroundColor: isDarkMode ? '#FFFFFF' : 'var(--bg-secondary)',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {/* Icon inside circle */}
                  <div style={{ color: isDarkMode ? 'var(--color-accent)' : 'var(--text-tertiary)' }}>
                    {isDarkMode ? <FaMoon size={12} /> : <FaSun size={12} />}
                  </div>
                </div>
              </button>
            </div>
            
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              fullstack web/mobile developer
            </p>
          </div>

          {/* Navigation centrée */}
          <nav className="space-y-8 flex-1 flex flex-col justify-center">
            {sections.map((section) => (
              <div key={section.id} className="group cursor-pointer" onClick={() => scrollToSection(section.id)}>
                <button
                  className="text-left transition-all duration-300 w-full"
                  style={{
                    color: activeSection === section.id
                      ? 'var(--text-primary)'
                      : 'var(--text-secondary)'
                  }}
                >
                  <div className="text-2xl font-normal lowercase tracking-normal mb-2">
                    {section.label.toLowerCase()}
                  </div>
                  {/* Jauge de soulignement */}
                  <div className="relative w-full">
                    {/* Ligne de fond */}
                    <div
                      className="h-1 w-full rounded-full"
                      style={{ backgroundColor: 'var(--border-color)' }}
                    />
                    {/* Jauge de progression */}
                    <div
                      className="absolute top-0 left-0 h-1 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--text-primary)',
                        width: `${scrollProgress[section.id] || 0}%`
                      }}
                    />
                  </div>
                </button>
              </div>
            ))}
          </nav>

          {/* Social icons en bas */}
          <div className="flex gap-4">
            {t.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-300 hover:bg-[var(--bg-surface)]"
                style={{ color: 'var(--text-tertiary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}
              >
                {social.icon === 'github' && <FaGithub size={20} />}
                {social.icon === 'linkedin' && <FaLinkedin size={20} />}
                {social.icon === 'x' && <FaBluesky size={20} />}
                {social.icon === 'medium' && <FaMedium size={20} />}
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Navigation mobile */}
      <div className="lg:hidden">
        {/* Header mobile fixe */}
        <div className="fixed top-0 left-0 right-0 z-50 p-4 border-b" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold leading-tight whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                Massinissa Amalou
              </h1>
              <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                fullstack web/mobile developer
              </p>
            </div>
            
            {/* Theme toggle mobile */}
            <button
              onClick={toggleDarkMode}
              className="relative w-14 h-7 rounded-full transition-all duration-300 border border-opacity-20 flex-shrink-0"
              style={{ 
                backgroundColor: isDarkMode ? 'var(--color-accent)' : 'var(--border-color)',
                borderColor: 'var(--border-color)'
              }}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {/* Sliding circle */}
              <div 
                className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
                  isDarkMode ? 'translate-x-7' : 'translate-x-0.5'
                }`}
                style={{ 
                  backgroundColor: isDarkMode ? '#FFFFFF' : 'var(--bg-secondary)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div style={{ color: isDarkMode ? 'var(--color-accent)' : 'var(--text-tertiary)' }}>
                  {isDarkMode ? <FaMoon size={10} /> : <FaSun size={10} />}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation mobile en bas */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 border-t backdrop-blur-lg" 
             style={{ 
               backgroundColor: 'var(--bg-primary)', 
               borderColor: 'var(--border-color)',
               boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)'
             }}>
          <nav className="flex justify-between items-center max-w-md mx-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`relative px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 min-w-0 flex-1 mx-1 ${
                  activeSection === section.id
                    ? 'transform scale-105'
                    : 'hover:scale-102 opacity-70 hover:opacity-90'
                }`}
                style={{
                  backgroundColor: activeSection === section.id 
                    ? 'var(--color-accent)' 
                    : 'transparent',
                  color: activeSection === section.id 
                    ? 'white' 
                    : 'var(--text-secondary)',
                  boxShadow: activeSection === section.id 
                    ? '0 4px 14px 0 rgba(0, 121, 255, 0.25)' 
                    : 'none'
                }}
              >
                <span className="relative z-10 truncate">
                  {section.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

      </div>

      {/* Landing page scrollable - Partie droite */}
      <main
        ref={contentRef}
        className="w-full lg:w-1/2 lg:ml-[50%] p-4 lg:p-8 pt-24 pb-20 lg:pt-8 lg:pb-8 lg:h-screen lg:overflow-y-auto"
      >
        <div className="max-w-2xl mx-auto">
          {/* Texte d'introduction */}
          <div className="mb-12 pt-6 lg:pt-32">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. integer id nisl et erat varius mollis. aliquam vehicula ex sed purus consectetur.
            </p>
          </div>

          {/* Section About */}
          <section id="about" className="pb-12">
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                  <span className="font-mono text-lg opacity-80" style={{ color: 'var(--color-accent)' }}>01.</span>
                  <span className="lowercase">about</span>
                </h2>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                  lorem ipsum dolor sit amet, consectetur adipiscing elit. integer id nisl et erat varius mollis. aliquam vehicula ex sed purus <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>consectetur</span> facililis. maecenas <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>placerat</span> nunc at ultrices consequat, mauris nunc ornare dolor, eu tristique magna tortor eget nibh. <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>praesent pharetra</span> pellentesque mauris, at lobortis dolor malesuada ex. praesent sit amet laoreet sapien. quisque vitae nibh <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>tincidunt</span> hendrerit ante eget, rhoncus dolor. integer nec massa eget orci hendrerit facililis. curabitur mattis egestas tortor non pharetra.
                </p>
              </div>
            </div>
          </section>

          {/* Section Career and Scholarship */}
          <div id="career" className="py-12">
            <CareerAndScholarship />
          </div>

          {/* Section Projects/Work */}
          <div id="projects" className="py-12">
            <Projects />
          </div>

          {/* Section Skills */}
          <div id="skills" className="py-12">
            <Skills />
          </div>

          {/* Section Contact */}
          <section id="contact" className="py-12">
            <div className="w-full">
                <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                  <span className="font-mono text-lg opacity-80" style={{ color: 'var(--color-accent)' }}>05.</span>
                  <span className="lowercase">get in touch with me</span>
                </h2>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                        First name <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Andrew"
                        required
                        className="w-full px-4 py-3 rounded-lg border text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20 placeholder:text-[var(--text-tertiary)]"
                        style={{
                          backgroundColor: 'var(--bg-elevated)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Last name <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        required
                        className="w-full px-4 py-3 rounded-lg border text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20 placeholder:text-[var(--text-tertiary)]"
                        style={{
                          backgroundColor: 'var(--bg-elevated)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="john@gmail.com"
                        className="w-full px-4 py-3 rounded-lg border text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20 placeholder:text-[var(--text-tertiary)]"
                        style={{
                          backgroundColor: 'var(--bg-elevated)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Number phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+33 456 78 91 23"
                        className="w-full px-4 py-3 rounded-lg border text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20 placeholder:text-[var(--text-tertiary)]"
                        style={{
                          backgroundColor: 'var(--bg-elevated)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                      Message <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <textarea
                      required
                      rows={8}
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pharetra metus. Aenean eget blandit velit. Morbi nec efficitur ante. Vivamus lacinia euismod sem ut ornare. Nam erat est, ultricies at est sed, tristique auctor turpis. Integer vulputate ipsum et lorem aliquet, ut sollicitudin elit tincidunt. Nunc eget rutrum mauris.

Phasellus ac diam risus. Aenean volutpat lacinia purus nec fougiat. Praesent eu vestibulum nulla. Quisque semper molestie lectus. Quisque non pum turpis sem. Nam aliquam tellus a elit. Nulla facilisi. Fusce eget venenatis nunc. Ut et ex ut mi varius sodales ut urna ante. Phasellus placerat, felis eget consectetur gravida, tortor turpis Iacilla tellus sed aliquam sem diam et dui. Donec vestibulum odio eget massa pulvinar, eu tempus turpis facilisis. Suspendisse erat est, porta vel eros ut, varius semper sem. Curabitur sed metus sed mauris molestie pharetra.

Integer ac ipsum eget nibh molestie condimentum. Integer imperdiet, arcu sed imperdiet fringilla, risus eros maximus dui, at fougiat urna libero lorem. Suspendisse et condimentum dolor. Phasellus vulputate sed ut amet congue porta. Donec non consequat velit. Etiam interdum risus vitae porta semper, est metus iaculis augue, monere a."
                      className="w-full px-4 py-3 rounded-lg border text-sm font-semibold leading-relaxed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20 resize-none placeholder:text-[var(--text-tertiary)]"
                      style={{
                        backgroundColor: 'var(--bg-elevated)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-primary)',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg font-medium text-sm transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: 'var(--color-accent)',
                        color: 'white'
                      }}
                    >
                      Send mail
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </form>
            </div>
          </section>

          {/* Icônes sociales mobiles après le formulaire */}
          <div className="lg:hidden pt-8" style={{ paddingTop: '32px', paddingBottom: '24px' }}>
            <div className="flex justify-center gap-4">
              {t.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ 
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-tertiary)',
                    border: '1px solid var(--border-color)'
                  }}
                  onTouchStart={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                  onTouchEnd={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}
                >
                  {social.icon === 'github' && <FaGithub size={16} />}
                  {social.icon === 'linkedin' && <FaLinkedin size={16} />}
                  {social.icon === 'x' && <FaBluesky size={16} />}
                  {social.icon === 'medium' && <FaMedium size={16} />}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
