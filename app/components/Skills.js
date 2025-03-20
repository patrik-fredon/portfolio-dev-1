'use client';
import { useEffect, useState } from 'react';

const SkillCategory = ({ title, skills, direction = 'left' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`skills-${title.toLowerCase()}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [title]);

  return (
    <div
      id={`skills-${title.toLowerCase()}`}
      className={`mb-8 transform transition-all duration-1000 ${
        isVisible
          ? 'translate-x-0 opacity-100'
          : `${direction === 'left' ? '-translate-x-full' : 'translate-x-full'} opacity-0`
      }`}
    >
      <h3 className="text-2xl font-semibold mb-4 heading-gradient">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div
            key={skill}
            className="tech-card"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="text-lg text-gray-300">{skill}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = ({ skills }) => {
  return (
    <section id="skills" className="relative py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-green-400 to-blue-400 blur-3xl" />
      </div>

      <div className="section-container relative">
        <h2 className="text-4xl font-bold text-center mb-16 heading-gradient">
          Technical Skills
        </h2>

        <div className="max-w-4xl mx-auto">
          <SkillCategory title="Languages" skills={skills.languages} direction="left" />
          <SkillCategory title="Frameworks" skills={skills.frameworks} direction="right" />
          <SkillCategory title="Tools" skills={skills.tools} direction="left" />
        </div>
      </div>
    </section>
  );
};

export default Skills;
