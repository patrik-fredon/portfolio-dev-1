'use client';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { THEME_ICONS } from '../constants';

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme, themes } = useTheme();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (themeKey) => {
    setTheme(themeKey);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg tech-card hover:border-[rgb(var(--accent-primary))] transition-all"
        aria-label="Select theme"
      >
        {THEME_ICONS[currentTheme] || THEME_ICONS.dark}
        <span className="text-gray-300">{themes[currentTheme].name}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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
        <div className="absolute mt-2 right-0 w-48 rounded-lg tech-card !p-1 backdrop-blur-lg z-50 dropdown-enter">
          <div className="py-1">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                className={`w-full px-4 py-2 flex items-center gap-2 rounded hover:bg-[rgb(var(--accent-primary))] hover:bg-opacity-10 transition-colors ${
                  currentTheme === key
                    ? 'text-[rgb(var(--accent-primary))]'
                    : 'text-gray-300'
                }`}
              >
                {THEME_ICONS[key] || THEME_ICONS.dark}
                <span>{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
