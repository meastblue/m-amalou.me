import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';
import { FaBluesky } from 'react-icons/fa6';
import { useI18n } from '../../hooks/useI18n';
import Section from '../ui/Section';

const Hero = () => {
  const { t } = useI18n();

  return (
    <Section id="hero" spacing="lg" containerSize="xl" aria-labelledby="hero-heading">
      <div className="min-h-screen flex flex-col justify-center pt-32 pb-20 lg:pt-20 lg:py-0">
        {/* Layout amélioré : Mobile vertical, Desktop équilibré */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 xl:gap-20 lg:items-center">
          
          {/* Contenu principal - Colonne gauche sur desktop */}
          <div className="space-y-6 lg:space-y-8">
            <div>
              <p className="text-sm lg:text-base xl:text-lg font-mono mb-4 lg:mb-6" style={{ color: 'var(--color-accent)' }}>
                {t.personal.greeting}
              </p>
              <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                {t.personal.name}.
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mt-2 lg:mt-4 leading-tight" style={{ color: 'var(--text-secondary)' }}>
                {t.personal.tagline}
              </h2>

              {/* Icônes sociales - Mobile et Tablet uniquement */}
              <div className="flex gap-[var(--space-sm)] mt-[var(--space-lg)] lg:hidden">
                {t.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg transition-all duration-[var(--duration-base)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 animate-mobile-scale"
                    style={{
                      color: 'var(--text-tertiary)',
                      backgroundColor: 'transparent'
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-accent)';
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-light)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-tertiary)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    aria-label={`${t.accessibility.external_link} - ${social.name}`}
                  >
                    {social.icon === 'github' && <FaGithub size={20} />}
                    {social.icon === 'linkedin' && <FaLinkedin size={20} />}
                    {social.icon === 'x' && <FaBluesky size={20} />}
                    {social.icon === 'medium' && <FaMedium size={20} />}
                  </a>
                ))}
              </div>
            </div>

            <p className="text-base lg:text-lg xl:text-xl leading-relaxed lg:leading-relaxed max-w-2xl lg:max-w-none" style={{ color: 'var(--text-secondary)' }}>
              {t.sections.hero.content}
            </p>

            <div className="flex flex-col gap-4 pt-4 lg:pt-6">
              <a href="#contact"
                 className="inline-flex items-center justify-center px-8 py-4 border-2 rounded-lg transition-all duration-[var(--duration-base)] hover:scale-105 font-medium text-center"
                 style={{
                   borderColor: 'var(--color-accent)',
                   color: 'var(--color-accent)',
                   backgroundColor: 'transparent'
                 }}
                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                {t.sections.hero.cta_contact}
              </a>
              <a href="#projects"
                 className="inline-flex items-center justify-center px-8 py-4 text-white rounded-lg transition-all duration-[var(--duration-base)] hover:scale-105 font-medium shadow-lg text-center"
                 style={{ backgroundColor: 'var(--color-accent)' }}
                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}>
                {t.sections.hero.cta_projects}
              </a>
            </div>
          </div>

          {/* Zone droite Desktop - Icônes sociales et éléments visuels */}
          <div className="hidden lg:flex flex-col items-center justify-center lg:h-full">
            <div className="flex flex-col items-center space-y-8 xl:space-y-12">
              
              {/* Icônes sociales Desktop - Layout vertical élégant */}
              <div className="flex flex-col gap-6 items-center">
                <div className="text-sm font-mono text-center mb-4" style={{ color: 'var(--text-tertiary)' }}>
                  Suivez-moi
                </div>
                {t.socials.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-4 rounded-xl transition-all duration-[var(--duration-base)] hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{
                      color: 'var(--text-secondary)',
                      backgroundColor: 'var(--bg-surface)',
                      border: '2px solid var(--border-color)',
                      animationDelay: `${index * 100}ms`
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-accent)';
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-light)';
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 121, 255, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    aria-label={`${t.accessibility.external_link} - ${social.name}`}
                  >
                    {social.icon === 'github' && <FaGithub size={28} />}
                    {social.icon === 'linkedin' && <FaLinkedin size={28} />}
                    {social.icon === 'x' && <FaBluesky size={28} />}
                    {social.icon === 'medium' && <FaMedium size={28} />}
                    
                    {/* Tooltip subtle */}
                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 px-3 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {social.name}
                    </div>
                  </a>
                ))}
              </div>
              
              {/* Élément décoratif subtil */}
              <div className="hidden xl:flex flex-col items-center gap-4 mt-12">
                <div className="w-px h-12 bg-gradient-to-b from-[var(--color-accent)] to-transparent opacity-50"></div>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                <div className="w-px h-12 bg-gradient-to-b from-transparent to-[var(--border-color)] opacity-30"></div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};

export default Hero;
