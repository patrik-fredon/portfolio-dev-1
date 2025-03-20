'use client';
import { useLanguage } from '../contexts/LanguageContext';
import portfolioData from '../../data/portfolio.json';
import Image from 'next/image';

const Projects = () => {
  const { language } = useLanguage();
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-20">
      <div className="section-container">
        <h2 className="text-4xl font-bold mb-12 text-center heading-gradient">
          {language === 'en' ? 'Featured Projects' :
           language === 'cs' ? 'Vybrané projekty' :
           'Ausgewählte Projekte'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="tech-card group hover:border-[rgb(var(--accent-primary))] transition-all"
            >
              <div className="aspect-video relative mb-4 overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={project.title[language]}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-xl font-semibold mb-2 text-[rgb(var(--accent-primary))]">
                {project.title[language]}
              </h3>

              <p className="text-gray-300 mb-4 h-20 overflow-y-auto">
                {project.description[language]}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-sm rounded-full bg-[rgb(var(--accent-primary))] bg-opacity-10 text-[rgb(var(--accent-primary))]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary text-sm flex-1 text-center"
                >
                  {language === 'en' ? 'View Live' :
                   language === 'cs' ? 'Zobrazit živě' :
                   'Live ansehen'}
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-[rgb(var(--accent-primary))] text-[rgb(var(--accent-primary))] hover:bg-[rgb(var(--accent-primary))] hover:bg-opacity-10 transition-colors text-sm flex-1 text-center"
                >
                  {language === 'en' ? 'View Code' :
                   language === 'cs' ? 'Zobrazit kód' :
                   'Code ansehen'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
