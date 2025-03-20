'use client';
import { useLanguage } from '../contexts/LanguageContext';
import portfolioData from '../../data/portfolio.json';
import { useEffect, useRef } from 'react';

const Skills = () => {
  const { language } = useLanguage();
  const { languages, frameworks, tools } = portfolioData.skills;
  const containerRef = useRef(null);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-right');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    const skillElements = containerRef.current.querySelectorAll('.skill-item');
    skillElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const SkillCategory = ({ title, skills, delay }) => (
    <div className="tech-card skill-item opacity-0" style={{ animationDelay: `${delay}ms` }}>
      <h3 className="text-xl font-semibold mb-4 text-[rgb(var(--accent-primary))]">
        {language === 'en' ? title :
         language === 'cs' ? {
           'Languages': 'Jazyky',
           'Frameworks': 'Frameworky',
           'Tools': 'Nástroje'
         }[title] :
         {
           'Languages': 'Sprachen',
           'Frameworks': 'Frameworks',
           'Tools': 'Werkzeuge'
         }[title]}
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full bg-[rgb(var(--accent-primary))] bg-opacity-10 text-[rgb(var(--accent-primary))] hover:bg-opacity-20 transition-colors cursor-default"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="section-container" ref={containerRef}>
        <h2 className="text-4xl font-bold mb-12 text-center heading-gradient">
          {language === 'en' ? 'Technical Skills' :
           language === 'cs' ? 'Technické dovednosti' :
           'Technische Fähigkeiten'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkillCategory title="Languages" skills={languages} delay={0} />
          <SkillCategory title="Frameworks" skills={frameworks} delay={200} />
          <SkillCategory title="Tools" skills={tools} delay={400} />
        </div>

        {/* Tech Background Animation */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[rgb(var(--accent-primary))] opacity-5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[rgb(var(--accent-secondary))] opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
