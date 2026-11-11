import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);
const LANG_STORAGE_KEY = 'SARYODAY_ACTIVE_LANG_V1';

export const LanguageProvider = ({ children }) => {
  // Primary language is English ('en') by default
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'hi' || saved === 'en') return saved;
    } catch (e) {
      // ignore
    }
    return 'en'; // Default primary is English for IIT-JEE / NEET aspirants
  });

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      // ignore
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  /**
   * Helper function to return English or Hindi string based on active language
   * @param {string} en - English text
   * @param {string} hi - Hindi text
   */
  const t = (en, hi) => {
    if (lang === 'hi') {
      return hi || en;
    }
    return en;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLanguage: setLang,
        toggleLanguage,
        isEnglish: lang === 'en',
        isHindi: lang === 'hi',
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
