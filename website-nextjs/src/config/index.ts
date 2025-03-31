// Configuration file for ThinkHome website
// All API keys, toggles, and site settings are centralized here

// Site information
export const siteConfig = {
  name: 'ThinkHome',
  description: 'Quality used computing equipment with warranty and expert service',
  url: 'https://thinkhome.org',
  ogImage: '/images/og-image.jpg',
  links: {
    github: 'https://github.com/thinkhome/website',
    ebay: 'https://www.ebay.com/usr/resilientcrow'
  }
};

// Business information
export const businessConfig = {
  name: 'Štefan Paluba',
  ico: '10727078',
  address: 'Rytířova 777/3, Kamýk, 143 00 Prague 12, Czech Republic',
  email: 'info@thinkhome.org',
  phone: '+420 728 981 602'
};

// Feature toggles - enable/disable components and functionality
export const featureToggles = {
  // Core features
  multilingual: true,
  darkMode: true,
  einkMode: true,
  
  // User experience
  cookieConsent: true,
  einkDetection: true,
  viewModeToggle: true,
  
  // Integrations
  pageclipForms: true,
  cloudflareAnalytics: true,
  vercelAnalytics: true,
  
  // API and editing
  apiAccess: true,
  aiEditing: true
};

// API keys and integration settings
export const integrationConfig = {
  // Pageclip
  pageclip: {
    siteKey: 'tGA4Z7aiAt6GxO4F9ySFIX2BnQhhjUUa',
    forms: {
      contact: 'contact-form'
    }
  },
  
  // Cloudflare
  cloudflare: {
    analyticsToken: process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN || '',
    turnstileKey: process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_KEY || '',
    imageOptimization: true,
    webAnalytics: true
  },
  
  // Vercel
  vercel: {
    analyticsId: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID || '',
    speedInsights: true,
    webVitals: true
  },
  
  // GitHub
  github: {
    repo: 'thinkhome/website',
    branch: 'main',
    apiToken: process.env.GITHUB_API_TOKEN || ''
  },
  
  // AI editing
  aiEditing: {
    enabled: true,
    endpoint: '/api/ai-edit',
    maxTokens: 1000
  }
};

// Content settings
export const contentConfig = {
  // Default language
  defaultLocale: 'en',
  
  // Supported languages
  locales: ['en', 'cs'],
  
  // Content directories
  directories: {
    products: 'src/content/products',
    pages: 'src/content/pages',
    docs: 'src/content/docs',
    translations: 'src/content/translations'
  },
  
  // Markdown rendering options
  markdown: {
    enableHtml: true,
    enableToc: true,
    syntaxHighlighting: true
  }
};

// Theme configuration
export const themeConfig = {
  // ThinkPad color palette
  colors: {
    primary: {
      red: '#e60012',
      black: '#000000',
      darkGray: '#1d1d1d',
      gray: '#333333',
      lightGray: '#e0e0e0',
      white: '#ffffff'
    }
  },
  
  // Fonts
  fonts: {
    sans: 'IBM Plex Sans, system-ui, sans-serif',
    mono: 'IBM Plex Mono, monospace'
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px'
  }
};

// E-ink mode settings
export const einkConfig = {
  // Detection settings
  detection: {
    enabled: true,
    checkColorDepth: true,
    checkUserAgent: true,
    checkResolution: true
  },
  
  // Legacy browser support
  legacySupport: {
    enabled: true,
    minimalStyles: true,
    noAnimations: true,
    simplifiedLayout: true
  }
};

// Mobile configuration
export const mobileConfig = {
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  
  // Mobile-specific features
  features: {
    hamburgerMenu: true,
    simplifiedFooter: true,
    optimizedImages: true
  }
};

// API configuration
export const apiConfig = {
  // API endpoints
  endpoints: {
    products: '/api/products',
    pages: '/api/pages',
    contact: '/api/contact',
    edit: '/api/edit'
  },
  
  // API rate limiting
  rateLimit: {
    enabled: true,
    maxRequests: 100,
    timeWindow: 60 * 1000 // 1 minute
  },
  
  // Authentication
  auth: {
    enabled: true,
    tokenExpiry: 24 * 60 * 60 * 1000 // 24 hours
  }
};

// SEO configuration
export const seoConfig = {
  // Default meta tags
  defaultMeta: {
    title: 'ThinkHome - Quality Used Computing Equipment',
    description: 'Specialized dealer of used computing equipment with focus on quality and reliability.',
    keywords: 'ThinkPad, laptop repair, refurbished laptops, computer repair, used laptops'
  },
  
  // Structured data
  structuredData: {
    enabled: true,
    organization: true,
    breadcrumbs: true,
    products: true
  },
  
  // Archive compatibility
  archiveCompatibility: {
    enabled: true,
    staticRendering: true,
    noIndex: false
  }
};

// Export all configurations
export default {
  site: siteConfig,
  business: businessConfig,
  features: featureToggles,
  integrations: integrationConfig,
  content: contentConfig,
  theme: themeConfig,
  eink: einkConfig,
  mobile: mobileConfig,
  api: apiConfig,
  seo: seoConfig
};
