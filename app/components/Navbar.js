'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSelector from './ThemeSelector';
import { NAV_ITEMS } from '../constants';

const Navbar = () => {
  const { language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-lg' : ''
    }`}>
      <div className="section-container">
        <div className="flex items-center justify-between py-4">
          <a href="#" className="text-xl font-bold text-[rgb(var(--accent-primary))]">
            Portfolio
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS[language].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-[rgb(var(--accent-primary))] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
