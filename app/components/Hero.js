'use client';
import { useLanguage } from '../contexts/LanguageContext';
import portfolioData from '../../data/portfolio.json';

const Hero = () => {
  const { language } = useLanguage();
  const { name, title, tagline, description } = portfolioData.introduction;

  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-6xl font-bold">
            {name}
          </h1>
          
          <h2 className="text-4xl font-semibold heading-gradient">
            {title[language]}
          </h2>
          
          <p className="text-2xl text-gray-300 mt-6">
            {tagline[language]}
          </p>
          
          <p className="text-lg text-gray-400 mt-4 leading-relaxed">
            {description[language]}
          </p>
          
          <div className="flex justify-center gap-4 mt-8">
            <a
              href="#contact"
              className="button-primary"
            >
              {language === 'en' ? 'Get in Touch' : 
               language === 'cs' ? 'Kontaktujte mě' : 
               'Kontakt aufnehmen'}
            </a>
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg border border-[rgb(var(--accent-primary))] text-[rgb(var(--accent-primary))] hover:bg-[rgb(var(--accent-primary))] hover:bg-opacity-10 transition-colors"
            >
              {language === 'en' ? 'View Projects' : 
               language === 'cs' ? 'Zobrazit projekty' : 
               'Projekte ansehen'}
            </a>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
