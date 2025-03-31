# ThinkHome Website Configuration Guide

## Overview

This configuration guide provides detailed information about how to customize and configure the ThinkHome website. The website is designed to be easily configurable through various configuration files and content management.

## Table of Contents

1. [Environment Configuration](#environment-configuration)
2. [Content Configuration](#content-configuration)
3. [Theme Configuration](#theme-configuration)
4. [Language Configuration](#language-configuration)
5. [SEO Configuration](#seo-configuration)
6. [Navigation Configuration](#navigation-configuration)
7. [Product Display Configuration](#product-display-configuration)

## Environment Configuration

The website uses environment variables for configuration. Create a `.env.local` file in the root directory with the following variables:

```
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://thinkhome.org
NEXT_PUBLIC_SITE_NAME=ThinkHome
NEXT_PUBLIC_SITE_DESCRIPTION=Specialized dealer of used computing equipment

# Language Configuration
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPPORTED_LOCALES=en,cs

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=info@thinkhome.org
NEXT_PUBLIC_CONTACT_PHONE=+1234567890
NEXT_PUBLIC_CONTACT_ADDRESS=123 Tech Street, IT City, 12345

# Social Media
NEXT_PUBLIC_EBAY_USERNAME=resilientcrow
NEXT_PUBLIC_TWITTER_HANDLE=thinkhome
NEXT_PUBLIC_FACEBOOK_PAGE=thinkhomeofficial
NEXT_PUBLIC_INSTAGRAM_HANDLE=thinkhome_official

# Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

## Content Configuration

### Adding New Products

Products are managed through markdown files in the `src/content/products/` directory. Each product file should follow this structure:

```markdown
---
title: "Product Title"
slug: "product-slug"
description: "Product description"
price: 499
currency: "USD"
category: "laptops"
brand: "Lenovo"
condition: "Refurbished - Grade A"
inStock: true
featured: true
specs:
  processor: "Intel Core i5-8250U"
  memory: "16GB DDR4"
  # Additional specifications...
images:
  - "/images/products/product-image-1.jpg"
  - "/images/products/product-image-2.jpg"
tags:
  - "business"
  - "portable"
lang: "en"
---

# Product Title

Detailed product description and features...
```

### Product Categories

Product categories are defined in `src/config/categories.js`:

```javascript
// src/config/categories.js
export const productCategories = [
  {
    id: 'laptops',
    name: 'Laptops',
    description: 'Refurbished business laptops',
    subcategories: [
      { id: 'thinkpad', name: 'ThinkPad' },
      { id: 'dell', name: 'Dell' },
      { id: 'hp', name: 'HP' },
    ],
  },
  {
    id: 'desktops',
    name: 'Desktop Computers',
    description: 'Refurbished desktop systems',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Computer accessories and peripherals',
  },
];
```

## Theme Configuration

The ThinkPad-inspired theme can be customized in `src/config/theme.js`:

```javascript
// src/config/theme.js
export const themeConfig = {
  colors: {
    primary: {
      black: '#000000',
      darkGray: '#1d1d1d',
      gray: '#333333',
      lightGray: '#e0e0e0',
      red: '#e60012',
      white: '#ffffff',
    },
    // Additional color configurations...
  },
  fonts: {
    primary: 'IBM Plex Sans, Arial, sans-serif',
    secondary: 'IBM Plex Mono, monospace',
  },
  borderRadius: {
    none: '0',
    small: '2px',
    medium: '4px',
    large: '8px',
  },
  // Additional theme configurations...
};
```

## Language Configuration

### Adding a New Language

1. Create a new translation file in `src/content/translations/` (e.g., `de.json`)
2. Copy the structure from an existing translation file and translate the values
3. Add the language code to the supported locales in `.env.local` and `src/middleware.ts`
4. Add the language name to the `languageNames` object in `src/components/LanguageSelector.tsx`

### Translation File Structure

Translation files follow this structure:

```json
{
  "home": {
    "hero_title": "Professional Laptop Refurbishment & Repair",
    "hero_subtitle": "Quality used computing equipment with warranty"
    // Additional translations...
  },
  "navigation": {
    "home": "Home",
    "products": "Products"
    // Additional translations...
  }
  // Additional sections...
}
```

## SEO Configuration

SEO settings can be configured in `src/config/seo.js`:

```javascript
// src/config/seo.js
export const seoConfig = {
  defaultTitle: 'ThinkHome - Quality Used Computing Equipment',
  defaultDescription: 'Specialized dealer of used computing equipment with focus on quality and reliability.',
  titleTemplate: '%s | ThinkHome',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    site_name: 'ThinkHome',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ThinkHome',
      },
    ],
  },
  twitter: {
    handle: '@thinkhome',
    site: '@thinkhome',
    cardType: 'summary_large_image',
  },
  // Additional SEO configurations...
};
```

## Navigation Configuration

The website navigation can be configured in `src/config/navigation.js`:

```javascript
// src/config/navigation.js
export const navigationConfig = {
  main: [
    { name: 'home', path: '/' },
    { name: 'products', path: '/products' },
    { name: 'services', path: '/services' },
    { name: 'about', path: '/about' },
    { name: 'contact', path: '/contact' },
    { name: 'blog', path: '/blog' },
    { name: 'docs', path: '/docs' },
  ],
  footer: [
    {
      title: 'Quick Links',
      links: [
        { name: 'home', path: '/' },
        { name: 'products', path: '/products' },
        { name: 'services', path: '/services' },
        { name: 'about', path: '/about' },
        { name: 'contact', path: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'privacy', path: '/privacy' },
        { name: 'returns', path: '/returns' },
        { name: 'legal', path: '/legal' },
      ],
    },
  ],
  // Additional navigation configurations...
};
```

## Product Display Configuration

Product display settings can be configured in `src/config/products.js`:

```javascript
// src/config/products.js
export const productConfig = {
  perPage: 9,
  sortOptions: [
    { id: 'price-asc', name: 'Price: Low to High' },
    { id: 'price-desc', name: 'Price: High to Low' },
    { id: 'newest', name: 'Newest First' },
  ],
  filterOptions: {
    price: {
      min: 0,
      max: 2000,
      step: 100,
    },
    condition: [
      { id: 'grade-a', name: 'Grade A' },
      { id: 'grade-b', name: 'Grade B' },
      { id: 'grade-c', name: 'Grade C' },
    ],
    // Additional filter options...
  },
  // Additional product display configurations...
};
```

By modifying these configuration files, you can easily customize the website to match your specific needs without having to modify the core code.
