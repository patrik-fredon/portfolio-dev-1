'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = {
  en: { name: 'English', flag: '🇬🇧' },
  cs: { name: 'Čeština', flag: '🇨🇿' },
  de: { name: 'Deutsch', flag: '🇩🇪' }
};

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 rounded-lg tech-card hover:border-[rgb(var(--accent-primary))] transition-all"
        aria-label="Select language"
      >
        <span className="text-lg">{languages[language].flag}</span>
        <span className="text-gray-300">{languages[language].name}</span>
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
            {Object.entries(languages).map(([code, { name, flag }]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full px-4 py-2 flex items-center gap-2 rounded hover:bg-[rgb(var(--accent-primary))] hover:bg-opacity-10 transition-colors scale-enter ${
                  language === code
                    ? 'text-[rgb(var(--accent-primary))]'
                    : 'text-gray-300'
                }`}
              >
                <span className="text-lg">{flag}</span>
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
