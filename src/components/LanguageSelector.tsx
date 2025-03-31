'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/language-context';

export default function LanguageSelector() {
  const [mounted, setMounted] = useState(false);
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Language names for display
  const languageNames = {
    en: 'English',
    cs: 'Čeština'
  };
  
  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="language-selector relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 dark:bg-gray-700 p-2 rounded-full"
        aria-label="Select language"
        title="Select language"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <span className="hidden md:inline">{languageNames[locale]}</span>
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full mb-2 right-0 bg-gray-800 dark:bg-gray-700 rounded shadow-lg p-2 min-w-[120px]">
          <ul>
            <li>
              <button
                onClick={() => {
                  setLocale('en');
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded ${locale === 'en' ? 'bg-red-600' : 'hover:bg-gray-700 dark:hover:bg-gray-600'}`}
              >
                English
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setLocale('cs');
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded ${locale === 'cs' ? 'bg-red-600' : 'hover:bg-gray-700 dark:hover:bg-gray-600'}`}
              >
                Čeština
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
