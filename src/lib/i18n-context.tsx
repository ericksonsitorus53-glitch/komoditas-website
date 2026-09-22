'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, languages, uniqueLanguages, defaultLanguage } from './languages';
import { Translations, getTranslations } from './translations';

interface I18nContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languages: Language[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'komoditas-sumut-language';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage);
  const [isMounted, setIsMounted] = useState(false);

  // Load saved language from localStorage
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedLangCode = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLangCode) {
        const savedLang = uniqueLanguages.find(l => l.code === savedLangCode);
        if (savedLang) {
          setCurrentLanguage(savedLang);
        }
      }
    } catch (e) {
      // localStorage not available, use default
    }
  }, []);

  // Save language to localStorage when changed
  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang.code);
    } catch (e) {
      // localStorage not available
    }
  };

  // Get translations for current language
  const t = getTranslations(currentLanguage.code);

  return (
    <I18nContext.Provider value={{ currentLanguage, setLanguage, t, languages: uniqueLanguages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
