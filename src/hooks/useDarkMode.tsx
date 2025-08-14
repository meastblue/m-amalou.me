import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | null>(null);

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const hasDocumentDarkClass = document.documentElement.classList.contains('dark');
    
    if (savedTheme) {
      const shouldBeDark = savedTheme === 'dark';
      setIsDarkMode(shouldBeDark);
    } else if (hasDocumentDarkClass) {
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
    } else {
      setIsDarkMode(false);
      localStorage.setItem('theme', 'light');
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('portfolio-theme')) {
      localStorage.removeItem('portfolio-theme');
    }
    if (localStorage.getItem('portfolio-language')) {
      localStorage.removeItem('portfolio-language');
    }
    
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      const shouldBeDark = savedTheme === 'dark';
      if (isDarkMode !== shouldBeDark) {
        setIsDarkMode(shouldBeDark);
      }
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within DarkModeProvider');
  }
  return context;
};