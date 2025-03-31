'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/lib/language-context';

// E-ink detection component
export default function EinkDetection() {
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [isLegacyBrowser, setIsLegacyBrowser] = useState(false);
  
  // Check if the browser is a legacy browser
  useEffect(() => {
    const checkLegacyBrowser = () => {
      // Simple detection for older browsers
      const isIE = !!document.documentMode; // Internet Explorer 6-11
      const isEdgeHTML = !isIE && !!window.StyleMedia; // Edge (EdgeHTML)
      const isOldChrome = !!window.chrome && (navigator.userAgent.indexOf("Chrome") > -1) && (parseInt(navigator.userAgent.match(/Chrome\/(\d+)/)?.[1] || "100") < 60);
      const isOldFirefox = typeof InstallTrigger !== 'undefined' && (parseInt(navigator.userAgent.match(/Firefox\/(\d+)/)?.[1] || "100") < 55);
      
      // E-readers often have WebKit-based browsers
      const isKindle = navigator.userAgent.indexOf("Kindle") > -1 || navigator.userAgent.indexOf("Silk") > -1;
      const isKobo = navigator.userAgent.indexOf("Kobo") > -1;
      const isPocketBook = navigator.userAgent.indexOf("PocketBook") > -1;
      
      return isIE || isEdgeHTML || isOldChrome || isOldFirefox || isKindle || isKobo || isPocketBook;
    };
    
    setIsLegacyBrowser(checkLegacyBrowser());
    
    // Check if the device might be an e-reader based on screen characteristics
    const checkEInkScreen = () => {
      // E-ink screens typically have low refresh rates and grayscale
      // This is a heuristic approach and not 100% accurate
      const pixelDepth = window.screen.pixelDepth || window.screen.colorDepth;
      const isLowColorDepth = pixelDepth <= 8; // E-ink typically has 4 or 8 bit color depth
      
      // Some e-readers have specific screen dimensions
      const isEReaderResolution = 
        (window.screen.width === 600 && window.screen.height === 800) || // Common Kindle resolution
        (window.screen.width === 758 && window.screen.height === 1024) || // Kobo
        (window.screen.width === 824 && window.screen.height === 1200); // PocketBook
      
      return isLowColorDepth || isEReaderResolution || isLegacyBrowser;
    };
    
    // Show popup if e-ink screen is detected and theme is not already set to eink
    if (checkEInkScreen() && theme !== 'eink' && !localStorage.getItem('eink-popup-dismissed')) {
      setShowPopup(true);
    }
    
    setMounted(true);
  }, [theme]);
  
  // Handle enabling e-ink mode
  const enableEinkMode = () => {
    setTheme('eink');
    setShowPopup(false);
    localStorage.setItem('eink-popup-dismissed', 'true');
  };
  
  // Handle dismissing the popup
  const dismissPopup = () => {
    setShowPopup(false);
    localStorage.setItem('eink-popup-dismissed', 'true');
  };
  
  if (!mounted || !showPopup) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-none border-l-4 border-red-600 max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4">{t('eink.detection_title')}</h2>
        <p className="mb-4">{t('eink.detection_message')}</p>
        
        {isLegacyBrowser && (
          <div className="bg-yellow-100 dark:bg-yellow-900 p-3 mb-4 text-sm">
            <p>{t('eink.legacy_browser_message')}</p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button 
            onClick={enableEinkMode}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-none"
          >
            {t('eink.enable_eink_mode')}
          </button>
          <button 
            onClick={dismissPopup}
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 py-2 px-4 rounded-none"
          >
            {t('eink.continue_normal')}
          </button>
        </div>
      </div>
    </div>
  );
}
