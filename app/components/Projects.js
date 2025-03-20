'use client';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';
import {
  AiFillApi, AiFillCode, AiFillThunderbolt
} from 'react-icons/ai';
import {
  DiBootstrap,
  DiSass
} from 'react-icons/di';
import { FaGithub } from 'react-icons/fa';
import {
  SiCss3,
  SiFirebase,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs, SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel
} from 'react-icons/si';
import portfolioData from '../../data/portfolio.json';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslatedContent, isValidProject } from '../utils/validation';

const getIconComponent = (tech) => {
  const iconMap = {
    // Languages
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
    'Python': SiPython,
    'HTML5': SiHtml5,
    'CSS3': SiCss3,
    // Frameworks & Libraries
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'Node.js': SiNodedotjs,
    'Express': SiNodedotjs,
    'TailwindCSS': SiTailwindcss,
    'Bootstrap': DiBootstrap,
    'Sass': DiSass,
    'scss': DiSass,
    'WebSocket': AiFillThunderbolt,
    'REST API': AiFillApi,
    // Tools & Platforms
    'MongoDB': SiMongodb,
    'Firebase': SiFirebase,
    'OpenAI API': AiFillCode
  };

  return iconMap[tech] || null;
};

const Projects = () => {
  const { language } = useLanguage();
  const { projects = [] } = portfolioData;

  // Filtruj nevalidní projekty
  const validProjects = projects.filter(isValidProject);

  const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    const cardVariants = {
      hidden: { 
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50
      },
      visible: { 
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          ease: "easeOut",
          staggerChildren: 0.2
        }
      }
    };

    const childVariants = {
      hidden: { 
        opacity: 0,
        y: 20
      },
      visible: { 
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5
        }
      }
    };

    return (
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`flex flex-col ${
          index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
        } gap-8 lg:gap-12 items-center`}
      >
        {/* Project Image */}
        <motion.div 
          className="w-full lg:w-1/2"
          variants={childVariants}
        >
<motion.div 
  className="relative aspect-video overflow-hidden rounded-lg tech-card p-2"
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.3 }}
>
  <Image
    src={project.image.startsWith('/') ? project.image : `/${project.image}`}
    alt={getTranslatedContent(project.title, language, 'Untitled Project')}
    fill
    sizes="100vw"
    style={{ objectFit: "cover" }}
    className="rounded-lg"
    placeholder="blur"
    blurDataURL="/images/user-placeholder.jpg"
    onError={(e) => (e.target.src = '/images/user-placeholder.jpg')}
  />
</motion.div>
        </motion.div>

        {/* Project Info */}
        <motion.div 
          className="w-full lg:w-1/2 space-y-4"
          variants={childVariants}
        >
          <motion.h3 
            className="text-2xl font-bold text-theme-accent-primary"
            variants={childVariants}
          >
            {getTranslatedContent(project.title, language, 'Untitled Project')}
          </motion.h3>

          <motion.p 
            className="text-theme-foreground"
            variants={childVariants}
          >
            {getTranslatedContent(project.description, language, 'No description available')}
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-3"
            variants={childVariants}
          >
            {(project.technologies || []).map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                className="px-3 py-1 rounded-full bg-theme-accent-primary bg-opacity-10 text-theme-accent-primary text-sm flex items-center gap-2"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(var(--accent-primary), 0.2)"
                }}
              >
                {getIconComponent(tech) && React.createElement(getIconComponent(tech), {
                  className: "inline-block",
                  size: "1.2em"
                })}
                {tech}
              </motion.span>
            ))}
          </motion.div>

          <motion.div 
            className="flex gap-4 pt-4"
            variants={childVariants}
          >
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SiVercel className="text-lg" />
                {language === 'en' ? 'Live Demo' :
                 language === 'cs' ? 'Živé Demo' :
                 'Live Demo'}
              </motion.a>
            )}
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="text-lg" />
                GitHub
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="section-container">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center heading-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {language === 'en' ? 'Featured Projects' :
           language === 'cs' ? 'Vybrané Projekty' :
           'Ausgewählte Projekte'}
        </motion.h2>

        <div className="space-y-20">
          {validProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
