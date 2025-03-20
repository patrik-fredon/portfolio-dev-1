'use client';
import { useState } from 'react';
import { themes } from '../themes';

const ThemeSelector = ({ currentTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeKey) => {
    // Update theme in localStorage for persistence
    localStorage.setItem('portfolio-theme', themeKey);
    
    // Update CSS variables
    const theme = themes[themeKey];
    document.documentElement.style.setProperty('--foreground-rgb', theme.colors.foreground);
    document.documentElement.style.setProperty('--background-start-rgb', theme.colors.background.start);
    document.documentElement.style.setProperty('--background-end-rgb', theme.colors.background.end);
    document.documentElement.style.setProperty('--accent-primary', theme.colors.accent.primary);
    document.documentElement.style.setProperty('--accent-secondary', theme.colors.accent.secondary);
    
    // Update data-theme attribute
    document.body.dataset.theme = themeKey;
    
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="tech-card flex items-center gap-2 !p-3 hover:border-[rgb(var(--accent-primary))]"
      >
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
        <span className="text-gray-400">Theme</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-48 tech-card !p-2 flex flex-col gap-1">
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => handleThemeChange(key)}
              className={`px-4 py-2 rounded text-left hover:bg-[rgb(var(--accent-primary))] hover:bg-opacity-10 transition-colors ${
                currentTheme === key ? 'text-[rgb(var(--accent-primary))]' : 'text-gray-400'
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
