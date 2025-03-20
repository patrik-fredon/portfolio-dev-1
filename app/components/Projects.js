'use client';
import { useLanguage } from '../contexts/LanguageContext';
import Image from 'next/image';
import portfolioData from '../../data/portfolio.json';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Projects = () => {
  const { language } = useLanguage();
  const { projects } = portfolioData;

  const getTranslatedText = (obj) => {
    return obj[language] || obj.en; // Fallback to English if translation not found
  };

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
            <motion.div 
              className="relative w-full h-full bg-gradient-to-br from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] opacity-20"
              animate={{
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Project Title as Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-[rgb(var(--accent-primary))] text-xl font-semibold">
                {getTranslatedText(project.title)}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Project Info */}
        <motion.div 
          className="w-full lg:w-1/2 space-y-4"
          variants={childVariants}
        >
          <motion.h3 
            className="text-2xl font-bold text-[rgb(var(--accent-primary))]"
            variants={childVariants}
          >
            {getTranslatedText(project.title)}
          </motion.h3>

          <motion.p 
            className="text-gray-300"
            variants={childVariants}
          >
            {getTranslatedText(project.description)}
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-3"
            variants={childVariants}
          >
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                className="px-3 py-1 rounded-full bg-[rgb(var(--accent-primary))] bg-opacity-10 text-[rgb(var(--accent-primary))] text-sm"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(var(--accent-primary), 0.2)"
                }}
              >
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
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
