import { Github, Linkedin, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';
import Section from '../ui/Section';

const Socials = () => {
  const { socials, socialMessages } = usePortfolio();

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      github: Github,
      linkedin: Linkedin
    };
    return iconMap[iconName] || ExternalLink;
  };

  const openLink = (url: string): void => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Section spacing="base" containerSize="lg">
      <div className="space-fluid-lg">
        <div className="flex justify-center items-center gap-6 sm:gap-8">
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
                  e.currentTarget.style.color = 'var(--color-primary)';
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
          className="text-fluid-base leading-relaxed text-left max-w-2xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          {socialMessages.description}
        </p>
      </div>
    </Section>
  );
};

export default Socials;