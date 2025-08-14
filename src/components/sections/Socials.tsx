import { MdOpenInNew } from 'react-icons/md';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { usePortfolio } from '../../hooks/usePortfolio';
import Section from '../ui/Section';

const Socials = () => {
  const { socials, socialMessages } = usePortfolio();

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      github: FaGithub,
      linkedin: FaLinkedin
    };
    return iconMap[iconName] || MdOpenInNew;
  };

  const openLink = (url: string): void => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Section spacing="base" containerSize="lg">
      <div className="space-fluid-lg pb-6">
        <div className="flex justify-center items-center gap-[var(--space-lg)]">
          {socials.map((social) => {
            const IconComponent = getIconComponent(social.icon);

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`touch-target transition-all duration-[var(--duration-base)] animate-mobile-scale ${social.color}`}
                style={{ color: 'var(--text-secondary)' }}
                aria-label={`Visit ${social.name} profile`}
                onClick={(e) => {
                  e.preventDefault();
                  openLink(social.url);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <IconComponent size={28} />
              </a>
            );
          })}
        </div>

        <p
          className="text-fluid-base  leading-relaxed text-center max-w-2xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          {socialMessages.description}
        </p>
      </div>
    </Section>
  );
};

export default Socials;
