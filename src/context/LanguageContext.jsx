import React, { createContext, useContext, useState, useEffect } from 'react';
import { DICTIONARY } from '../data/dictionary';

export { DICTIONARY };
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('arogya_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('arogya_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'te' : 'en'));
  };

  const t = DICTIONARY[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
