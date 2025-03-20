'use client';
import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useTheme } from '../hooks/useTheme';
import { THEME_ICONS } from '../constants';

// Optimized sub-component for theme menu items
const ThemeOption = memo(({ themeKey, theme, currentTheme, onSelect, icon }) => (
  <button
    onClick={() => onSelect(themeKey)}
    className={`w-full px-4 py-2 flex items-center gap-2 rounded hover:bg-theme-accent-primary hover:bg-opacity-10 transition-colors ${
      currentTheme === themeKey
        ? 'text-theme-accent-primary'
        : 'text-theme-foreground/70'
    }`}
    aria-label={`Select ${theme.name} theme`}
  >
    {icon || THEME_ICONS.dark}
    <span>{theme.name}</span>
  </button>
));

ThemeOption.displayName = 'ThemeOption';

const ThemeSelector = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme, themes } = useTheme();
  const dropdownRef = useRef(null);

  // Memoized event handlers
  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleThemeChange = useCallback((themeKey) => {
    setTheme(themeKey);
    setIsOpen(false);
  }, [setTheme]);

  // Memoized handler for clicks outside dropdown
  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 rounded-lg tech-card hover:border-theme-accent-primary transition-all"
        aria-label="Select theme"
        aria-expanded={isOpen}
        aria-controls="theme-menu"
      >
        {THEME_ICONS[currentTheme] || THEME_ICONS.dark}
        <span className="text-theme-foreground/80">{themes[currentTheme].name}</span>
        <svg
          className={`w-4 h-4 text-theme-foreground/50 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div 
          id="theme-menu"
          role="menu"
          className="absolute mt-2 right-0 w-48 rounded-lg tech-card !p-1 backdrop-blur-lg z-50 dropdown-enter"
        >
          <div className="py-1">
            {Object.entries(themes).map(([key, theme]) => (
              <ThemeOption
                key={key}
                themeKey={key}
                theme={theme}
                currentTheme={currentTheme}
                onSelect={handleThemeChange}
                icon={THEME_ICONS[key]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

ThemeSelector.displayName = 'ThemeSelector';

export default ThemeSelector;
