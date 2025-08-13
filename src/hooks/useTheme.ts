import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'portfolio-theme'
const DARK_CLASS = 'dark'
const MEDIA_QUERY = '(prefers-color-scheme: dark)'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark')
  const [isDark, setIsDark] = useState(true)

  const getSystemPreference = (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(MEDIA_QUERY).matches
  }

  const updateDocumentClass = (shouldBeDark: boolean): void => {
    if (typeof document === 'undefined') return
    
    if (shouldBeDark) {
      document.documentElement.classList.add(DARK_CLASS)
    } else {
      document.documentElement.classList.remove(DARK_CLASS)
    }
  }

  const applyTheme = (newTheme: Theme): void => {
    const shouldBeDark = newTheme === 'system' ? getSystemPreference() : newTheme === 'dark'
    
    setIsDark(shouldBeDark)
    updateDocumentClass(shouldBeDark)
  }

  const changeTheme = (newTheme: Theme): void => {
    setTheme(newTheme)
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newTheme)
    }
    
    applyTheme(newTheme)
  }

  const toggleTheme = (): void => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    changeTheme(nextTheme)
  }

  // Initialisation au montage
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Récupérer le thème sauvegardé ou utiliser dark par défaut
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null
    const initialTheme = savedTheme || 'dark'
    
    setTheme(initialTheme)
    applyTheme(initialTheme)
    
    // Ensure dark class is applied by default
    if (!savedTheme) {
      document.documentElement.classList.add(DARK_CLASS)
    }
  }, [])

  // Écouter les changements de préférence système
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(MEDIA_QUERY)
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  return {
    theme,
    isDark,
    isSystemTheme: theme === 'system',
    setTheme: changeTheme,
    toggleTheme
  }
}