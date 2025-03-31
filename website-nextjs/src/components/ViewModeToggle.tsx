'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/language-context';

// Component for toggling between classic and mobile versions
export default function ViewModeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [viewMode, setViewMode] = useState<'auto' | 'desktop' | 'mobile'>('auto');
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Detect if user is on a mobile device
    const checkMobileDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    };
    
    setIsMobileDevice(checkMobileDevice());
    
    // Get saved view mode preference
    const savedViewMode = localStorage.getItem('view-mode') as 'auto' | 'desktop' | 'mobile' || 'auto';
    setViewMode(savedViewMode);
    
    // Apply the view mode
    applyViewMode(savedViewMode);
    
    setMounted(true);
  }, []);
  
  // Apply the selected view mode
  const applyViewMode = (mode: 'auto' | 'desktop' | 'mobile') => {
    const html = document.documentElement;
    
    // Remove existing classes
    html.classList.remove('force-desktop-view', 'force-mobile-view');
    
    // Apply appropriate class based on mode
    if (mode === 'desktop') {
      html.classList.add('force-desktop-view');
    } else if (mode === 'mobile') {
      html.classList.add('force-mobile-view');
    }
    
    // Save preference
    localStorage.setItem('view-mode', mode);
  };
  
  // Handle view mode change
  const changeViewMode = (mode: 'auto' | 'desktop' | 'mobile') => {
    setViewMode(mode);
    applyViewMode(mode);
    setIsOpen(false);
  };
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="view-mode-toggle relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 dark:bg-gray-700 p-2 rounded-full"
        aria-label={t('view_mode.toggle')}
        title={t('view_mode.toggle')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {viewMode === 'mobile' || (viewMode === 'auto' && isMobileDevice) ? (
            // Mobile icon
            <>
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12" y2="18.01" />
            </>
          ) : (
            // Desktop icon
            <>
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </>
          )}
        </svg>
        <span className="hidden md:inline">
          {viewMode === 'auto' 
            ? t('view_mode.auto') 
            : viewMode === 'desktop' 
              ? t('view_mode.desktop') 
              : t('view_mode.mobile')}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full mb-2 right-0 bg-gray-800 dark:bg-gray-700 rounded shadow-lg p-2 min-w-[160px]">
          <ul>
            <li>
              <button
                onClick={() => changeViewMode('auto')}
                className={`w-full text-left px-3 py-2 rounded flex items-center ${viewMode === 'auto' ? 'bg-red-600' : 'hover:bg-gray-700 dark:hover:bg-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="M12 18l-4-4 4-4"></path>
                  <path d="M16 14l-4 4-4-4"></path>
                </svg>
                {t('view_mode.auto')}
              </button>
            </li>
            <li>
              <button
                onClick={() => changeViewMode('desktop')}
                className={`w-full text-left px-3 py-2 rounded flex items-center ${viewMode === 'desktop' ? 'bg-red-600' : 'hover:bg-gray-700 dark:hover:bg-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                {t('view_mode.desktop')}
              </button>
            </li>
            <li>
              <button
                onClick={() => changeViewMode('mobile')}
                className={`w-full text-left px-3 py-2 rounded flex items-center ${viewMode === 'mobile' ? 'bg-red-600' : 'hover:bg-gray-700 dark:hover:bg-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12" y2="18.01"></line>
                </svg>
                {t('view_mode.mobile')}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
