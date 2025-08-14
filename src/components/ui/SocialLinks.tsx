import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';
import { FaBluesky } from 'react-icons/fa6';
import { useI18n } from '../../hooks/useI18n';

interface SocialLinksProps {
  variant?: 'desktop' | 'mobile';
}

const SocialLinks = ({ variant = 'desktop' }: SocialLinksProps) => {
  const { t } = useI18n();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <FaGithub size={variant === 'desktop' ? 20 : 16} />;
      case 'linkedin':
        return <FaLinkedin size={variant === 'desktop' ? 20 : 16} />;
      case 'x':
        return <FaBluesky size={variant === 'desktop' ? 20 : 16} />;
      case 'medium':
        return <FaMedium size={variant === 'desktop' ? 20 : 16} />;
      default:
        return null;
    }
  };

  if (variant === 'mobile') {
    return (
      <div className="flex justify-center gap-4">
        {t.socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-[var(--bg-surface)] text-[var(--text-tertiary)] border border-[var(--border-color)] hover:text-[var(--color-accent)]"
          >
            {getIcon(social.icon)}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {t.socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg transition-all duration-300 hover:bg-[var(--bg-surface)] text-[var(--text-tertiary)] hover:text-[var(--color-accent)]"
        >
          {getIcon(social.icon)}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;