'use client';
import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();
  const navigationItems = NAV_ITEMS[language] || NAV_ITEMS.en;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-theme-background/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between py-4">
        {/* Logo/Brand */}
        <a 
          href="#" 
          className="flex items-center space-x-2 text-theme-foreground/80 hover:text-theme-accent-primary transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 fill-current text-theme-accent-primary"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="font-semibold text-xl">Portfolio Template</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-theme-foreground/70 hover:text-theme-accent-primary transition-colors text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
          
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeSelector />
          </div>
        </div>

        {/* Mobile Navigation Toggle (simplified) */}
        <div className="md:hidden flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
