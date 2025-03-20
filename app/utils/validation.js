'use client';

/**
 * Validuje strukturu projektu a vrací boolean
 */
export const isValidProject = (project) => {
  if (!project || typeof project !== 'object') return false;
  
  // Kontrola povinných polí
  if (!project.title || typeof project.title !== 'object') return false;
  if (!project.description || typeof project.description !== 'object') return false;
  if (!Array.isArray(project.technologies)) return false;

  // Kontrola alespoň jednoho překladu v title a description
  const hasValidTitle = Object.keys(project.title).some(lang => 
    typeof project.title[lang] === 'string' && project.title[lang].trim() !== ''
  );
  
  const hasValidDescription = Object.keys(project.description).some(lang => 
    typeof project.description[lang] === 'string' && project.description[lang].trim() !== ''
  );

  return hasValidTitle && hasValidDescription;
};

/**
 * Validuje strukturu vzdělání a vrací boolean
 */
export const isValidEducation = (education) => {
  if (!education || typeof education !== 'object') return false;
  
  // Kontrola povinných polí
  if (!education.degree || typeof education.degree !== 'object') return false;
  if (!education.school || typeof education.school !== 'object') return false;

  // Kontrola alespoň jednoho překladu
  const hasValidDegree = Object.keys(education.degree).some(lang => 
    typeof education.degree[lang] === 'string' && education.degree[lang].trim() !== ''
  );
  
  const hasValidSchool = Object.keys(education.school).some(lang => 
    typeof education.school[lang] === 'string' && education.school[lang].trim() !== ''
  );

  return hasValidDegree && hasValidSchool;
};

/**
 * Validuje strukturu pracovní zkušenosti a vrací boolean
 */
export const isValidExperience = (experience) => {
  if (!experience || typeof experience !== 'object') return false;
  
  // Kontrola povinných polí
  if (!experience.position || typeof experience.position !== 'object') return false;
  if (!experience.company || typeof experience.company !== 'string') return false;
  
  // Kontrola alespoň jednoho překladu v position
  const hasValidPosition = Object.keys(experience.position).some(lang => 
    typeof experience.position[lang] === 'string' && experience.position[lang].trim() !== ''
  );

  return hasValidPosition && experience.company.trim() !== '';
};

/**
 * Get translated content from a multilingual object based on the current language
 * @param {Object} obj - The object containing translations 
 * @param {string} language - The current language code
 * @param {string} fallback - Optional fallback text if translation not found
 * @returns {string} The translated content or fallback
 */
export const getTranslatedContent = (obj, language, fallback = '') => {
  if (!obj || typeof obj !== 'object') return fallback;
  
  // First try exact language match
  if (obj[language]) return obj[language];
  
  // Fall back to English if available
  if (obj.en) return obj.en;
  
  // Last resort fallback
  return fallback;
};
