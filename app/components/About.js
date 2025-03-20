'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import portfolioData from '../../data/portfolio.json';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslatedContent, isValidEducation, isValidExperience } from '../utils/validation';

const About = () => {
  const { language } = useLanguage();
  const { about = {} } = portfolioData;
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Filtruj nevalidní záznamy
  const validEducation = (portfolioData.education || []).filter(isValidEducation);
  const validExperience = (portfolioData.experience || []).filter(isValidExperience);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
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

  const listItemVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const CardWithAnimation = ({ children, index }) => (
    <motion.div
      className="tech-card p-4"
      variants={listItemVariants}
      custom={index}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  );

  return (
    <section id="about" className="py-20 relative">
      <div className="section-container" ref={containerRef}>
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center heading-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {language === 'en' ? 'About Me' :
           language === 'cs' ? 'O mně' :
           'Über mich'}
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.h3 
              className="text-2xl font-semibold text-theme-accent-primary mb-4"
              variants={itemVariants}
            >
              {language === 'en' ? 'Background' :
               language === 'cs' ? 'Pozadí' :
               'Hintergrund'}
            </motion.h3>
            <motion.p 
              className="text-theme-foreground/70 leading-relaxed"
              variants={itemVariants}
            >
              {getTranslatedContent(about.bio, language, '')}
            </motion.p>
            
            <motion.div 
              className="pt-4"
              variants={containerVariants}
            >
              <motion.h4 
                className="text-xl font-semibold text-theme-accent-secondary mb-3"
                variants={itemVariants}
              >
                {language === 'en' ? 'Education' :
                 language === 'cs' ? 'Vzdělání' :
                 'Ausbildung'}
              </motion.h4>
              <motion.ul 
                className="space-y-3"
                variants={containerVariants}
              >
                {validEducation.map((education, index) => (
                  <CardWithAnimation key={index} index={index}>
                    <motion.div 
                      className="font-medium text-theme-accent-primary"
                      variants={itemVariants}
                    >
                      {getTranslatedContent(education.degree, language, 'Untitled Degree')}
                    </motion.div>
                    <motion.div 
                      className="text-sm text-theme-foreground/50"
                      variants={itemVariants}
                    >
                      {education.year || 'Ongoing'}
                    </motion.div>
                    <motion.div 
                      className="text-theme-foreground/70"
                      variants={itemVariants}
                    >
                      {getTranslatedContent(education.school, language, 'Institution')}
                    </motion.div>
                  </CardWithAnimation>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>

          <motion.div 
            className="space-y-6"
            variants={containerVariants}
          >
            <motion.h3 
              className="text-2xl font-semibold text-theme-accent-primary mb-4"
              variants={itemVariants}
            >
              {language === 'en' ? 'Experience' :
               language === 'cs' ? 'Zkušenosti' :
               'Erfahrung'}
            </motion.h3>
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              {validExperience.map((experience, index) => (
                <CardWithAnimation key={index} index={index}>
                  <motion.div 
                    className="font-medium text-theme-accent-primary"
                    variants={itemVariants}
                  >
                    {getTranslatedContent(experience.position, language, 'Position')}
                  </motion.div>
                  <motion.div 
                    className="text-sm text-theme-foreground/50"
                    variants={itemVariants}
                  >
                    {experience.company} {experience.duration ? `| ${getTranslatedContent(experience.duration, language)}` : ''}
                  </motion.div>
                  <motion.div 
                    className="text-theme-foreground/70 mt-2"
                    variants={itemVariants}
                  >
                    {getTranslatedContent(experience.description, language, 'No description available')}
                  </motion.div>
                </CardWithAnimation>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
