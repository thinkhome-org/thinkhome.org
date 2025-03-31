'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/language-context';
import config from '@/config';

// Cloudflare integration component
export default function CloudflareIntegration() {
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    setMounted(true);
    
    // Only load Cloudflare scripts if enabled in config
    if (config.features.cloudflareAnalytics && config.integrations.cloudflare.webAnalytics) {
      // Add Cloudflare Web Analytics
      const cfScript = document.createElement('script');
      cfScript.defer = true;
      cfScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      cfScript.setAttribute('data-cf-beacon', `{"token": "${config.integrations.cloudflare.analyticsToken}"}`);
      document.body.appendChild(cfScript);
      
      // Cleanup on unmount
      return () => {
        if (document.body.contains(cfScript)) {
          document.body.removeChild(cfScript);
        }
      };
    }
  }, []);
  
  // This component doesn't render anything visible
  return null;
}
