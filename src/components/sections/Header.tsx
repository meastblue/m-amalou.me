import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';
import { FaBluesky } from "react-icons/fa6";
import { useI18n } from '../../hooks/useI18n';
import Container from '../ui/Container';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
  const { t } = useI18n();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-[var(--duration-base)] backdrop-blur-sm"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <Container className="py-6 lg:py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {t.personal.name}
              </h1>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {t.personal.title_one}
              </p>
              <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                {t.personal.title_two}
              </p>

              {/* Icônes sociales */}
              <div className="flex gap-2 mt-1">
                {t.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded transition-all duration-[var(--duration-base)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                    style={{
                      color: 'var(--text-tertiary)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-accent)';
                      e.currentTarget.style.backgroundColor = 'rgba(var(--color-accent-rgb), 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-tertiary)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    aria-label={`${t.accessibility.external_link} - ${social.name}`}
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

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <a href="/resume.pdf"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-sm transition-colors duration-[var(--duration-base)] hover:underline"
                 style={{ color: 'var(--text-secondary)' }}
                 onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                 onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                {t.navigation.resume}
              </a>
            </nav>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header
