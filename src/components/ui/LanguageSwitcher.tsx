import { useI18n, type Language } from '../../hooks/useI18n';
import { MdLanguage } from 'react-icons/md';
import { useState, useRef, useEffect } from 'react';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg transition-all duration-[var(--duration-base)] hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          backgroundColor: 'transparent',
          '--tw-ring-color': 'var(--color-accent)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        aria-label={`Current language: ${currentLanguage.label}. Click to change language`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <MdLanguage className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
        <span className="text-sm font-medium hidden sm:inline" style={{ color: 'var(--text-secondary)' }}>
          {currentLanguage.flag}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 min-w-[150px] rounded-lg border backdrop-blur-lg z-50 py-1 shadow-lg"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            borderColor: 'var(--border-color)'
          }}
          role="listbox"
          aria-label="Select language"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:scale-[1.02] transition-all duration-[var(--duration-fast)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset"
              style={{
                backgroundColor: language === lang.code ? 'var(--color-accent-light)' : 'transparent',
                color: language === lang.code ? 'var(--color-accent)' : 'var(--text-primary)',
                '--tw-ring-color': 'var(--color-accent)'
              }}
              onMouseEnter={(e) => {
                if (language !== lang.code) {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-light)';
                }
              }}
              onMouseLeave={(e) => {
                if (language !== lang.code) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              role="option"
              aria-selected={language === lang.code}
            >
              <span className="text-base">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}