import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';
import { FaBluesky } from 'react-icons/fa6';
import { useI18n } from '../../hooks/useI18n';
import Section from '../ui/Section';

const Hero = () => {
  const { t } = useI18n();

  return (
    <Section id="hero" spacing="lg" containerSize="lg" aria-labelledby="hero-heading">
      <div className="min-h-screen flex flex-col justify-center pt-20 pb-20 lg:py-0">
        <div className="space-y-6 lg:space-y-8 max-w-4xl">
          <div>
            <p className="text-sm lg:text-base font-mono mb-4" style={{ color: 'var(--color-accent)' }}>
              {t.personal.greeting}
            </p>
            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {t.personal.name}.
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mt-2" style={{ color: 'var(--text-secondary)' }}>
              {t.personal.tagline}
            </h2>

            {/* Icônes sociales */}
            <div className="flex gap-[var(--space-sm)] mt-[var(--space-lg)]">
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

          <p className="text-base lg:text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            {t.sections.hero.content}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#contact"
               className="px-6 py-3 border rounded transition-all duration-[var(--duration-base)] hover:opacity-80"
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
               className="px-6 py-3 text-white rounded transition-all duration-[var(--duration-base)] hover:opacity-90"
               style={{ backgroundColor: 'var(--color-accent)' }}
               onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}>
              {t.sections.hero.cta_projects}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
