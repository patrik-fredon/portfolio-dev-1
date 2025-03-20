'use client';
import { useState, useEffect } from 'react';
import { themes } from '../themes';

const THEME_STORAGE_KEY = 'portfolio-theme';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    // Načtení tématu z localStorage při prvním načtení
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
    handleThemeChange(savedTheme);
  }, []);

  const handleThemeChange = (themeKey) => {
    if (!themes[themeKey]) return;

    // Update theme in localStorage
    localStorage.setItem(THEME_STORAGE_KEY, themeKey);
    
    // Update CSS variables
    const theme = themes[themeKey];
    document.documentElement.style.setProperty('--foreground-rgb', theme.colors.foreground);
    document.documentElement.style.setProperty('--background-start-rgb', theme.colors.background.start);
    document.documentElement.style.setProperty('--background-end-rgb', theme.colors.background.end);
    document.documentElement.style.setProperty('--accent-primary', theme.colors.accent.primary);
    document.documentElement.style.setProperty('--accent-secondary', theme.colors.accent.secondary);
    
    // Update data-theme attribute
    document.body.dataset.theme = themeKey;
    
    setCurrentTheme(themeKey);
  };

  return {
    currentTheme,
    setTheme: handleThemeChange,
    themes
  };
};
