'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { themes } from '../themes';
import { STORAGE_KEYS, CSS_VARS } from '../constants';

// Safe localStorage handling
const secureStorage = {
  get: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }
};

/**
 * Custom hook for theme management
 * Handles theme switching, storing preferences, and applying CSS variables
 */
export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');

  // Memoized theme data for better performance
  const currentThemeData = useMemo(() => themes[currentTheme], [currentTheme]);

  const handleThemeChange = useCallback((themeKey) => {
    if (!themes[themeKey]) return;

    // Input sanitization
    const sanitizedThemeKey = Object.keys(themes).includes(themeKey) ? themeKey : 'dark';
    
    // Update theme in localStorage
    secureStorage.set(STORAGE_KEYS.THEME, sanitizedThemeKey);
    
    // Update CSS variables using requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      const theme = themes[sanitizedThemeKey];
      const root = document.documentElement;
      
      // Batch CSS updates for better performance
      const cssUpdates = {
        [CSS_VARS.FOREGROUND]: theme.colors.foreground,
        [CSS_VARS.BACKGROUND_START]: theme.colors.background.start,
        [CSS_VARS.BACKGROUND_END]: theme.colors.background.end,
        [CSS_VARS.ACCENT_PRIMARY]: theme.colors.accent.primary,
        [CSS_VARS.ACCENT_SECONDARY]: theme.colors.accent.secondary
      };

      // Apply all updates at once
      Object.entries(cssUpdates).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
      
      // Update data-theme attribute for theme-specific styles
      document.body.dataset.theme = sanitizedThemeKey;
    });
    
    setCurrentTheme(sanitizedThemeKey);
  }, []);

  useEffect(() => {
    // Load theme from localStorage on initial load
    const savedTheme = secureStorage.get(STORAGE_KEYS.THEME) || 'dark';
    handleThemeChange(savedTheme);
  }, [handleThemeChange]);

  // Return theme data and controls
  return {
    currentTheme,
    currentThemeData,
    setTheme: handleThemeChange,
    themes
  };
};
