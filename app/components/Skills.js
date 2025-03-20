'use client';
import { motion, useInView } from 'framer-motion';
import React, { useRef, useState } from 'react';
import {
  AiFillApi,
  AiFillCode,
  AiFillThunderbolt,
  AiOutlineConsoleSql
} from 'react-icons/ai';
import {
  DiBootstrap,
  DiJava,
  DiPerl,
  DiPhp,
  DiRuby,
  DiRust,
  DiSass,
  DiScala,
  DiSwift
} from 'react-icons/di';
import { FaAws, FaRProject } from 'react-icons/fa';
import {
  SiCss3,
  SiDocker,
  SiFirebase,
  SiGit,
  SiHeroku,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNetlify,
  SiNextdotjs, SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel
} from 'react-icons/si';
import { TbBrandCpp, TbBrandKotlin } from 'react-icons/tb';
import { VscTerminalCmd } from 'react-icons/vsc';
import portfolioData from '../../data/portfolio.json';
import { useLanguage } from '../contexts/LanguageContext';

const getIconComponent = (skill) => {
  const iconMap = {
    // Languages
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
    'Python': SiPython,
    'HTML5': SiHtml5,
    'CSS3': SiCss3,
    'GraphQL': AiFillApi,
    'Java': DiJava,
    'C#': AiFillCode,
    'Ruby': DiRuby,
    'PHP': DiPhp,
    'Swift': DiSwift,
    'Kotlin': TbBrandKotlin,
    'Go': AiFillThunderbolt,
    'Rust': DiRust,
    'Scala': DiScala,
    'Perl': DiPerl,
    'R': FaRProject,
    'Shell Scripting': VscTerminalCmd,
    'C++': TbBrandCpp,
    'C': AiFillCode,
    'Assembly': AiFillCode,
    'SQL': AiOutlineConsoleSql,
    // Frameworks & Libraries
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'Node.js': SiNodedotjs,
    'Express': SiNodedotjs,
    'TailwindCSS': SiTailwindcss,
    'Django': SiPython,
    'Flask': SiPython,
    'Bootstrap': DiBootstrap,
    'Material-UI': AiFillCode,
    'Ant Design': AiFillCode,
    'Sass': DiSass,
    'scss': DiSass,
    'css-modules': SiCss3,
    'styled-components': SiReact,
    'websockets': AiFillThunderbolt,
    'REST API': AiFillApi,
    'Redux': SiReact,
    // Tools & Platforms
    'Git': SiGit,
    'Docker': SiDocker,
    'AWS': FaAws,
    'MongoDB': SiMongodb,
    'PostgreSQL': SiPostgresql,
    'Firebase': SiFirebase,
    'Heroku': SiHeroku,
    'Netlify': SiNetlify,
    'Vercel': SiVercel,
    'Jest': AiFillCode,
    'Cypress': AiFillCode,
    'Selenium': AiFillCode,
    'JIRA': AiFillCode,
    'Trello': AiFillCode,
    'Slack': AiFillCode
  };

  return iconMap[skill] || null;
};

const Skills = () => {
  const { language } = useLanguage();
  const { skills } = portfolioData;
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [areAllSkillsVisible, setAreAllSkillsVisible] = useState(false);

  const buttonText = {
    'en': 'Toggle All Skills',
    'cs': 'Přepnout všechny dovednosti',
    'de': 'Alle Fähigkeiten umschalten'
  };

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
      scale: 1,
      transition: {
        duration: 0.3,
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(var(--accent-primary), 0.2)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      scale: 0.95,
      opacity: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const toggleSkillsVisibility = () => {
    setAreAllSkillsVisible(prev => !prev);
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
          className="text-xl font-semibold mb-4 text-theme-accent-primary"
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
              className="px-3 py-1 rounded-full bg-theme-accent-primary bg-opacity-10 text-theme-accent-primary cursor-default"
              variants={skillVariants}
              initial="visible"
              animate={areAllSkillsVisible ? "hover" : "visible"}
              exit="exit"
              whileHover="hover"
              transition={{
                duration: 0.3,
                delay: areAllSkillsVisible ? index * 0.05 : 0,
                ease: "easeInOut"
              }}
            >
              {getIconComponent(item) && (
                <span className="inline-block mr-2">
                  {React.createElement(getIconComponent(item), {
                    className: "inline-block",
                    size: "1.2em"
                  })}
                </span>
              )}
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
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-theme-accent-primary opacity-5 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-theme-accent-secondary opacity-5 rounded-full blur-3xl"
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
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-6 heading-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {language === 'en' ? 'Technical Skills' :
             language === 'cs' ? 'Technické dovednosti' :
             'Technische Fähigkeiten'}
          </motion.h2>
          <motion.button
            onClick={toggleSkillsVisibility}
            className="px-6 py-2 rounded-full bg-theme-accent-primary text-theme-foreground font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText[language]}
          </motion.button>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SkillCard
            title={
              language === 'en' ? 'Languages' :
              language === 'cs' ? 'Programovací jazyky' :
              'die Programmiersprache'
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
