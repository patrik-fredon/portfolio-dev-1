'use client';
import { useLanguage } from '../contexts/LanguageContext';
import portfolioData from '../../data/portfolio.json';

const About = () => {
  const { language } = useLanguage();
  const { bio, education, experience } = portfolioData.about;

  return (
    <section id="about" className="py-20 relative">
      <div className="section-container">
        <h2 className="text-4xl font-bold mb-12 text-center heading-gradient">
          {language === 'en' ? 'About Me' :
           language === 'cs' ? 'O mně' :
           'Über mich'}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bio Section */}
          <div className="tech-card animate-slide-left">
            <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--accent-primary))]">
              {language === 'en' ? 'Background' :
               language === 'cs' ? 'Pozadí' :
               'Hintergrund'}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {bio[language]}
            </p>
          </div>

          {/* Education & Experience */}
          <div className="space-y-8 animate-slide-right">
            {/* Education Section */}
            <div className="tech-card">
              <h3 className="text-2xl font-semibold mb-6 text-[rgb(var(--accent-secondary))]">
                {language === 'en' ? 'Education' :
                 language === 'cs' ? 'Vzdělání' :
                 'Ausbildung'}
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-gray-700 pl-4 py-2">
                    <h4 className="font-medium text-[rgb(var(--accent-primary))]">
                      {edu.degree[language]}
                    </h4>
                    <p className="text-gray-400">{edu.school[language]}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="tech-card">
              <h3 className="text-2xl font-semibold mb-6 text-[rgb(var(--accent-secondary))]">
                {language === 'en' ? 'Experience' :
                 language === 'cs' ? 'Zkušenosti' :
                 'Erfahrung'}
              </h3>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-gray-700 pl-4 py-2">
                    <h4 className="font-medium text-[rgb(var(--accent-primary))]">
                      {exp.position[language]}
                    </h4>
                    <p className="text-gray-400">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {exp.duration[language] || exp.duration}
                    </p>
                    <p className="text-gray-300 mt-2">{exp.description[language]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
