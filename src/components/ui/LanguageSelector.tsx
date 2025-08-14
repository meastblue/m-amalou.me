import { useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import type { Language } from '../../hooks/useI18n';

interface LanguageSelectorProps {
  size?: 'sm' | 'lg';
  variant?: 'toggle' | 'dropdown';
}

const LanguageSelector = ({ size = 'lg', variant = 'toggle' }: LanguageSelectorProps) => {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string; shortLabel: string }[] = [
    { code: 'fr', label: 'Français', flag: '🇫🇷', shortLabel: 'FR' },
    { code: 'en', label: 'English', flag: '🇺🇸', shortLabel: 'EN' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
  const otherLanguage = languages.find(lang => lang.code !== language) || languages[1];

  const sizeConfig = {
    lg: {
      toggle: 'w-14 h-7 text-xs',
      dropdown: 'text-sm px-3 py-2',
      icon: 'text-base'
    },
    sm: {
      toggle: 'w-12 h-6 text-xs',
      dropdown: 'text-xs px-2 py-1.5',
      icon: 'text-sm'
    }
  };

  const config = sizeConfig[size];

  if (variant === 'toggle') {
    return (
      <div className="relative flex items-center">
        {/* Toggle Switch Style */}
        <button
          onClick={() => setLanguage(otherLanguage.code)}
          className={`${config.toggle} relative rounded-full border border-[var(--border-color)] bg-[var(--border-color)] transition-all duration-300 focus:outline-none group select-none touch-manipulation`}
          aria-label={`Switch to ${otherLanguage.label}`}
          title={`Switch to ${otherLanguage.label}`}
        >
          {/* Current language indicator */}
          <div
            className={`absolute ${size === 'lg' ? 'top-0.5 w-6 h-6' : 'top-0.5 w-5 h-5'} rounded-full flex items-center justify-center transition-all duration-300 ${size === 'lg' ? 'shadow-md' : 'shadow-sm'} ${
              language === 'fr' ? `left-0.5 bg-white` : `right-0.5 bg-[var(--bg-secondary)]`
            }`}
          >
            <span className={`${config.icon}`}>
              {currentLanguage.flag}
            </span>
          </div>
        </button>

        {/* Simple Tooltip */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[var(--bg-surface)] text-[var(--text-primary)] text-xs px-2 py-1 rounded border border-[var(--border-color)] shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {otherLanguage.flag} {otherLanguage.label}
        </div>
      </div>
    );
  }

  // Dropdown variant (fallback/alternative)
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${config.dropdown} rounded-lg border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20 transition-all duration-300 cursor-pointer hover:border-[var(--color-accent)] flex items-center gap-2`}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className={config.icon}>{currentLanguage.flag}</span>
        <span className="font-medium">{currentLanguage.shortLabel}</span>
        <svg 
          className={`w-3 h-3 text-[var(--text-tertiary)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full mt-1 right-0 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg shadow-lg overflow-hidden z-50 min-w-full">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left hover:bg-[var(--bg-surface)] transition-colors duration-200 flex items-center gap-2 ${
                  lang.code === language ? 'bg-[var(--color-accent)] bg-opacity-10 text-[var(--color-accent)]' : 'text-[var(--text-primary)]'
                }`}
              >
                <span>{lang.flag}</span>
                <span className="font-medium">{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;