'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/language-context';
import config from '@/config';

// Vercel integration component
export default function VercelIntegration() {
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    setMounted(true);
    
    // Only load Vercel scripts if enabled in config
    if (config.features.vercelAnalytics) {
      // Add Vercel Analytics
      if (config.integrations.vercel.webVitals) {
        const vercelScript = document.createElement('script');
        vercelScript.defer = true;
        vercelScript.src = '/_vercel/insights/script.js';
        document.body.appendChild(vercelScript);
        
        // Cleanup on unmount
        return () => {
          if (document.body.contains(vercelScript)) {
            document.body.removeChild(vercelScript);
          }
        };
      }
    }
  }, []);
  
  // This component doesn't render anything visible
  return null;
}
