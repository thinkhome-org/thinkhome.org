'use client';

import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/lib/language-context';
import EinkDetection from '@/components/EinkDetection';
import CookieConsent from '@/components/CookieConsent';
import CloudflareIntegration from '@/components/CloudflareIntegration';
import VercelIntegration from '@/components/VercelIntegration';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LanguageSelector from '@/components/LanguageSelector';
import ViewModeToggle from '@/components/ViewModeToggle';
import config from '@/config';
import './globals.css';
import './styles/theme-modes.css';
import './styles/eink-mode.css';
import './styles/mobile.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Pageclip CSS for contact forms */}
        {config.features.pageclipForms && (
          <link rel="stylesheet" href="https://s.pageclip.co/v1/pageclip.css" media="screen" />
        )}
      </head>
      <body className="bg-white dark:bg-black text-gray-900 dark:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={['light', 'dark', 'eink']}
        >
          <LanguageProvider initialLocale="en">
            {/* Main content */}
            {children}
            
            {/* UI Controls */}
            <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-40">
              {config.features.darkMode && <ThemeSwitcher />}
              {config.features.multilingual && <LanguageSelector />}
              {config.features.viewModeToggle && <ViewModeToggle />}
            </div>
            
            {/* Feature components */}
            {config.features.einkDetection && <EinkDetection />}
            {config.features.cookieConsent && <CookieConsent />}
            {config.features.cloudflareAnalytics && <CloudflareIntegration />}
            {config.features.vercelAnalytics && <VercelIntegration />}
          </LanguageProvider>
        </ThemeProvider>
        
        {/* Pageclip script for contact forms */}
        {config.features.pageclipForms && (
          <script src="https://s.pageclip.co/v1/pageclip.js" charSet="utf-8" defer></script>
        )}
      </body>
    </html>
  );
}
