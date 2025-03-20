'use client';
import { useLanguage } from '../contexts/LanguageContext';
import Image from 'next/image';
import portfolioData from '../../data/portfolio.json';
import { motion } from 'framer-motion';

const Hero = () => {
  const { language } = useLanguage();
  const { name, title, tagline, description } = portfolioData.introduction;

  const getTranslatedText = (obj) => {
    return obj[language] || obj.en; // Fallback to English if translation not found
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-theme-accent-primary opacity-20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-theme-accent-secondary opacity-20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            className="relative w-64 h-64 lg:w-[400px] lg:h-[400px] group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] opacity-20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.25, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[rgb(var(--accent-primary))] shadow-[0_0_30px_rgba(var(--accent-primary),0.3)] group-hover:shadow-[0_0_40px_rgba(var(--accent-primary),0.4)] transition-all duration-500">
              <Image 
                src="/images/user-placeholder.jpg"
                alt={`${name} profile picture`}
                fill
                sizes="(max-width: 768px) 256px, 400px"
                className="object-cover object-center"
                priority
              />
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold"
                variants={itemVariants}
              >
                <span className="block heading-gradient mb-2">
                  {language === 'en' ? 'Hi, I\'m' :
                   language === 'cs' ? 'Ahoj, jsem' :
                   'Hallo, ich bin'}
                </span>
                <span className="block text-theme-accent-primary">{name}</span>
              </motion.h1>
              
              <motion.h2 
                className="text-2xl sm:text-3xl text-theme-foreground/70"
                variants={itemVariants}
              >
                {getTranslatedText(title)}
              </motion.h2>
              
              <motion.p 
                className="text-lg text-theme-foreground/50 max-w-2xl mx-auto lg:mx-0"
                variants={itemVariants}
              >
                {getTranslatedText(description)}
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <motion.a
                  href="#contact"
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'en' ? 'Get In Touch' :
                   language === 'cs' ? 'Kontaktujte mě' :
                   'Kontakt aufnehmen'}
                </motion.a>
                <motion.a
                  href="#projects"
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'en' ? 'View Projects' :
                   language === 'cs' ? 'Zobrazit projekty' :
                   'Projekte ansehen'}
                </motion.a>
                <motion.a
                  href="/CV.pdf"
                  download
                  className="btn-primary flex items-center gap-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:rotate-12" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                  </svg>
                  {language === 'en' ? 'Download CV' :
                   language === 'cs' ? 'Stáhnout CV' :
                   'Lebenslauf herunterladen'}
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
