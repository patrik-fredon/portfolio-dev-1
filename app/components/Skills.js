'use client';
import { useLanguage } from '../contexts/LanguageContext';
import portfolioData from '../../data/portfolio.json';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Skills = () => {
  const { language } = useLanguage();
  const { skills } = portfolioData;
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      scale: 1
    }
  };

  const SkillCard = ({ title, items }) => {
    const skillsContainerRef = useRef(null);
    const isSkillsInView = useInView(skillsContainerRef, { once: true });

    return (
      <motion.div 
        className="tech-card"
        variants={cardVariants}
        ref={skillsContainerRef}
      >
        <motion.h3 
          className="text-xl font-semibold mb-4 text-[rgb(var(--accent-primary))]"
          variants={skillVariants}
        >
          {title}
        </motion.h3>
        <motion.div 
          className="flex flex-wrap gap-3"
          variants={containerVariants}
          initial="hidden"
          animate={isSkillsInView ? "visible" : "hidden"}
        >
          {items.map((item, index) => (
            <motion.span
              key={index}
              className="px-3 py-1 rounded-full bg-[rgb(var(--accent-primary))] bg-opacity-10 text-[rgb(var(--accent-primary))] cursor-default"
              variants={skillVariants}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(var(--accent-primary), 0.2)",
                transition: { duration: 0.2 }
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.1
              }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Animated Background Lights */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[rgb(var(--accent-primary))] opacity-5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[rgb(var(--accent-secondary))] opacity-5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="section-container relative z-10" ref={containerRef}>
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center heading-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {language === 'en' ? 'Technical Skills' :
           language === 'cs' ? 'Technické dovednosti' :
           'Technische Fähigkeiten'}
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SkillCard
            title={
              language === 'en' ? 'Languages' :
              language === 'cs' ? 'Jazyky' :
              'Sprachen'
            }
            items={skills.languages}
          />
          <SkillCard
            title={
              language === 'en' ? 'Frameworks' :
              language === 'cs' ? 'Frameworky' :
              'Frameworks'
            }
            items={skills.frameworks}
          />
          <SkillCard
            title={
              language === 'en' ? 'Tools' :
              language === 'cs' ? 'Nástroje' :
              'Werkzeuge'
            }
            items={skills.tools}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
