'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/language-context';

// Cookie consent popup component with ThinkPad styling
export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie-consent');
    if (!hasConsented) {
      setShowConsent(true);
    }
    setMounted(true);
  }, []);
  
  // Accept all cookies
  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setShowConsent(false);
    // Set cookies or trigger analytics here
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: { consent: 'all' } }));
  };
  
  // Accept only necessary cookies
  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    setShowConsent(false);
    // Set only necessary cookies here
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: { consent: 'necessary' } }));
  };
  
  // Show cookie settings
  const showSettings = () => {
    // This would typically open a more detailed cookie settings modal
    // For now, we'll just toggle a settings state
    setShowSettings(true);
  };
  
  if (!mounted || !showConsent) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black dark:bg-gray-900 text-white z-40 shadow-lg border-t-2 border-red-600">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-8">
            <h3 className="text-lg font-bold mb-2">{t('cookies.title')}</h3>
            <p className="text-sm text-gray-300 max-w-2xl">{t('cookies.description')}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button 
              onClick={acceptNecessary}
              className="border border-gray-600 hover:bg-gray-800 text-white py-2 px-4 rounded-none text-sm whitespace-nowrap"
            >
              {t('cookies.necessary_only')}
            </button>
            <button 
              onClick={acceptAll}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-none text-sm whitespace-nowrap"
            >
              {t('cookies.accept_all')}
            </button>
            <button 
              onClick={showSettings}
              className="border border-gray-600 hover:bg-gray-800 text-white py-2 px-4 rounded-none text-sm whitespace-nowrap"
            >
              {t('cookies.settings')}
            </button>
          </div>
        </div>
        
        {/* Legacy browser support message */}
        <div className="mt-2 text-xs text-gray-400">
          <p>{t('cookies.legacy_support')}</p>
        </div>
      </div>
    </div>
  );
}
