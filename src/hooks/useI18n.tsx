import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import frTranslations from '../data/i18n/fr.json';
import enTranslations from '../data/i18n/en.json';

export type Language = 'fr' | 'en';

export interface TranslationData {
  personal: {
    name: string;
    title_one: string;
    title_two: string;
    greeting: string;
    tagline: string;
    email: string;
  };
  navigation: {
    hero: string;
    about: string;
    career: string;
    projects: string;
    skills: string;
    contact: string;
    resume: string;
    social_links: string;
    section_navigation: string;
    mobile_navigation: string;
  };
  sections: {
    hero: {
      title: string;
      content: string;
      cta_contact: string;
      cta_projects: string;
    };
    about: {
      title: string;
      content: string;
    };
    career: {
      title: string;
    };
    scholarship: {
      title: string;
    };
    projects: {
      title: string;
    };
    skills: {
      title: string;
    };
    contact: {
      title: string;
      description: string;
    };
  };
  career: Array<{
    company: string;
    period: string;
    position: string;
    description: string;
    location: string;
  }>;
  scholarship: Array<{
    institution: string;
    period: string;
    degree: string;
    description: string;
    location: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    image: string;
    technologies: string[];
    status: string;
    link: string;
  }>;
  skills: Array<{
    id: string;
    title: string;
    description: string;
    skills: string[];
  }>;
  form: {
    labels: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      message: string;
    };
    placeholders: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      message: string;
    };
    errors: {
      firstName: string;
      lastName: string;
      email: string;
      emailInvalid: string;
      message: string;
      general: string;
      submitFailed: string;
    };
    buttons: {
      submit: string;
      submitting: string;
    };
    messages: {
      success: string;
      phoneOr: string;
    };
  };
  socials: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
  accessibility: {
    toggle_theme: string;
    scroll_progress: string;
    external_link: string;
    dismiss_error: string;
    expand_skills: string;
    collapse_skills: string;
    career_experience: string;
    education_experience: string;
    navigate_to: string;
    github_profile: string;
    linkedin_profile: string;
    twitter_profile: string;
    send_email: string;
  };
  common: {
    and: string;
    or: string;
    loading: string;
    error: string;
    success: string;
    close: string;
    open: string;
    expand: string;
    collapse: string;
    previous: string;
    next: string;
    read_more: string;
    read_less: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  ui: {
    skip_to_content: string;
    fullstack_developer: string;
    send_mail: string;
    get_in_touch: string;
    required: string;
    view_project: string;
    downloads: string;
    installs: string;
  };
  layout: {
    name: string;
    loading_translations: string;
  };
  about: {
    content: string;
    hero_content: string;
  };
  sections_labels: {
    about: string;
    career: string;
    work: string;
    skills: string;
  };
  numbers: {
    '01': string;
    '02': string;
    '03': string;
    '04': string;
    '05': string;
  };
}

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationData;
  translate: (key: string, params?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

interface I18nProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export const I18nProvider = ({ children, defaultLanguage = 'fr' }: I18nProviderProps) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [translations, setTranslations] = useState<TranslationData | null>(null);

  useEffect(() => {
    const currentTranslations = language === 'fr' ? frTranslations : enTranslations;
    setTranslations(currentTranslations);
  }, [language]);

  useEffect(() => {
    if (!translations) {
      setTranslations(frTranslations);
    }
  }, [translations]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('portfolio-language') as Language;
      if (savedLanguage && savedLanguage !== language) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-language', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const translate = (key: string, params?: Record<string, string>): string => {
    if (!translations) return key;
    
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    if (typeof value !== 'string') {
      return key;
    }

    let result = value;
    if (params) {
      Object.entries(params).forEach(([param, replacement]) => {
        result = result.replace(new RegExp(`{{${param}}}`, 'g'), replacement);
      });
    }
    
    return result;
  };

  if (!translations) {
    return (
      <div className="p-8 text-center text-xl text-[#0079FF]">
        🌍 Loading translations...
      </div>
    );
  }

  return (
    <I18nContext.Provider value={{ 
      language, 
      setLanguage, 
      t: translations,
      translate 
    }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};

export const useI18nNavigation = () => {
  const { t } = useI18n();
  
  return [
    { id: 'hero', label: t.navigation.hero, section: 'hero' },
    { id: 'about', label: t.navigation.about, section: 'about' },
    { id: 'career', label: t.navigation.career, section: 'career' },
    { id: 'projects', label: t.navigation.projects, section: 'projects' },
    { id: 'skills', label: t.navigation.skills, section: 'skills' },
    { id: 'contact', label: t.navigation.contact, section: 'contact' }
  ];
};