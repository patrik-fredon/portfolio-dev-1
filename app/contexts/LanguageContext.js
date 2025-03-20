'use client';
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { LANGUAGES, STORAGE_KEYS } from '../constants';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
      if (savedLanguage && LANGUAGES[savedLanguage]) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const changeLanguage = useCallback((newLanguage) => {
    if (LANGUAGES[newLanguage]) {
      setLanguage(newLanguage);
      try {
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, newLanguage);
      } catch (error) {
        console.error('Error setting language in localStorage:', error);
      }
    }
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    changeLanguage,
    isLoaded
  }), [language, changeLanguage, isLoaded]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
