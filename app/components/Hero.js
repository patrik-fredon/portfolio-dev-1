'use client';
import { useEffect, useState } from 'react';

const Hero = ({ introduction }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-10">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className="h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full transform -rotate-45"
          />
        ))}
      </div>

      <div className="section-container relative">
        <div className={`max-w-3xl mx-auto text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="heading-gradient">{introduction.name}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-4">
            {introduction.title}
          </h2>
          <p className="text-xl md:text-2xl mb-8 heading-gradient font-semibold">
            {introduction.tagline}
          </p>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            {introduction.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#projects" className="button-primary">
              View Projects
            </a>
            <a href="#contact" className="button-primary bg-opacity-10 border border-gray-700 hover:border-green-400/50">
              Get in Touch
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-gray-400"
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
