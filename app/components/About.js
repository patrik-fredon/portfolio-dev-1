'use client';
import { useEffect, useState } from 'react';

const TimelineItem = ({ year, title, subtitle, description, isLeft }) => {
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

    const element = document.getElementById(`timeline-${title.replace(/\s+/g, '-')}`);
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
      id={`timeline-${title.replace(/\s+/g, '-')}`}
      className={`flex items-center w-full ${
        isLeft ? 'justify-start' : 'justify-end'
      } my-8 transform transition-all duration-1000 ${
        isVisible
          ? 'translate-x-0 opacity-100'
          : `${isLeft ? '-translate-x-full' : 'translate-x-full'} opacity-0`
      }`}
    >
      <div className={`w-full md:w-5/12 ${isLeft ? 'text-left' : 'text-right'}`}>
        <div className="tech-card">
          <div className="text-sm text-green-400 mb-2">{year}</div>
          <h3 className="text-xl font-semibold mb-2 heading-gradient">{title}</h3>
          <div className="text-gray-400 mb-2">{subtitle}</div>
          {description && <p className="text-gray-500">{description}</p>}
        </div>
      </div>
    </div>
  );
};

const About = ({ about }) => {
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

    const element = document.getElementById('about-bio');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="about" className="relative py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-green-400 to-blue-400 rotate-45 blur-3xl" />
      </div>

      <div className="section-container relative">
        <h2 className="text-4xl font-bold text-center mb-16 heading-gradient">
          About Me
        </h2>

        <div
          id="about-bio"
          className={`max-w-3xl mx-auto mb-20 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="tech-card">
            <p className="text-gray-300 text-lg leading-relaxed">{about.bio}</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Education Timeline */}
          <h3 className="text-2xl font-semibold mb-8 text-center heading-gradient">
            Education
          </h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-800" />
            {about.education.map((edu, index) => (
              <TimelineItem
                key={edu.degree}
                year={edu.year}
                title={edu.degree}
                subtitle={edu.school}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>

          {/* Experience Timeline */}
          <h3 className="text-2xl font-semibold mb-8 mt-16 text-center heading-gradient">
            Experience
          </h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-800" />
            {about.experience.map((exp, index) => (
              <TimelineItem
                key={exp.position}
                year={exp.duration}
                title={exp.position}
                subtitle={exp.company}
                description={exp.description}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
