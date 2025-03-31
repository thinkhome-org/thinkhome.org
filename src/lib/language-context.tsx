'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAvailableLocales } from '@/lib/mdx';

// Define the type for the language context
type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  t: () => '',
});

// Define the props for the provider
type LanguageProviderProps = {
  children: ReactNode;
  initialLocale?: string;
};

// Create the provider component
export function LanguageProvider({ children, initialLocale = 'en' }: LanguageProviderProps) {
  const [locale, setLocale] = useState(initialLocale);
  const [translations, setTranslations] = useState<Record<string, any>>({});

  // Load translations when locale changes
  useEffect(() => {
    async function loadTranslations() {
      try {
        const translationModule = await import(`@/content/translations/${locale}.json`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error(`Failed to load translations for ${locale}:`, error);
        // Fallback to English if translation file not found
        if (locale !== 'en') {
          const fallbackModule = await import('@/content/translations/en.json');
          setTranslations(fallbackModule.default);
        }
      }
    }

    loadTranslations();
  }, [locale]);

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let result = translations;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}

// Export the context for direct use if needed
export default LanguageContext;
