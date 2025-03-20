'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import en from '../translations/en.json';
import cs from '../translations/cs.json';
import de from '../translations/de.json';

const translations = { en, cs, de };

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Try to load saved language preference
    const savedLang = localStorage.getItem('portfolio-language');
    if (savedLang && ['en', 'cs', 'de'].includes(savedLang)) {
      setLanguage(savedLang);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (['en', 'cs', 'de'].includes(browserLang)) {
        setLanguage(browserLang);
      }
    }
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translations = await import(`../translations/${language}.json`);
        setTranslations(translations.default);
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to English if translation loading fails
        const enTranslations = await import('../translations/en.json');
        setTranslations(enTranslations.default);
      }
    };

    loadTranslations();
    localStorage.setItem('portfolio-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (newLang) => {
    if (['en', 'cs', 'de'].includes(newLang)) {
      setLanguage(newLang);
    }
  };

  const t = (key) => {
    return key.split('.').reduce((obj, k) => obj?.[k], translations) || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
