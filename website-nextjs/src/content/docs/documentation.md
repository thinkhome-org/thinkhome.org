# ThinkHome Website Documentation

## Overview

This documentation provides comprehensive information about the ThinkHome website, a ThinkPad-styled website for a laptop repair and refurbishment business. The website is built using Next.js with server-side rendering, client-side rendering capabilities, and markdown files as content sources.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Technology Stack](#technology-stack)
3. [Content Management](#content-management)
4. [Multilingual Support](#multilingual-support)
5. [SEO and Archive Compatibility](#seo-and-archive-compatibility)
6. [Styling](#styling)
7. [Configuration](#configuration)
8. [Development](#development)
9. [Deployment](#deployment)
10. [Maintenance](#maintenance)

## Project Structure

The project follows a standard Next.js application structure with some custom directories:

```
website-nextjs/
├── public/               # Static assets
│   └── images/           # Image assets
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable React components
│   ├── content/          # Markdown and YAML content files
│   │   ├── docs/         # Documentation files
│   │   ├── products/     # Product markdown files
│   │   ├── services/     # Service markdown files
│   │   ├── pages/        # General page content
│   │   └── translations/ # Language translation files
│   └── lib/              # Utility functions and libraries
│       ├── mdx.ts        # Markdown processing utilities
│       ├── language-context.tsx # Multilingual support
│       └── seo.js        # SEO and archive compatibility
```

## Technology Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with ThinkPad-inspired design
- **Content**: Markdown and MDX with YAML frontmatter
- **Rendering**: Server-side rendering with client-side hydration
- **Internationalization**: Custom language context with JSON translation files
- **SEO**: Built-in Next.js metadata API with custom enhancements

## Content Management

### Product Management

Products are managed using markdown files with YAML frontmatter. Each product file is stored in the `src/content/products/` directory and follows this structure:

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

## Key Features

- Feature 1
- Feature 2
- Feature 3

## What's Included

- Item 1
- Item 2

## Condition Details

Information about the refurbishment condition...

## Why Choose This Model

Selling points and advantages...
```

To add a new product:

1. Create a new markdown file in `src/content/products/`
2. Fill in the YAML frontmatter with product details
3. Write the product description and features in markdown format
4. Add product images to `public/images/products/`

### Service Management

Services follow a similar structure to products and are stored in `src/content/services/`.

### Page Content

General page content is stored in `src/content/pages/` and follows the same markdown with YAML frontmatter pattern.

## Multilingual Support

The website supports multiple languages through:

1. Translation files in `src/content/translations/` (JSON format)
2. Language metadata in content files (`lang` field in YAML frontmatter)
3. Language context provider for client-side language switching

### Adding a New Language

1. Create a new translation file in `src/content/translations/` (e.g., `de.json`)
2. Copy the structure from an existing translation file and translate the values
3. Add the language code to the supported locales in `src/middleware.ts`
4. Add the language name to the `languageNames` object in `src/components/LanguageSelector.tsx`

### Using Translations

In React components:

```tsx
import { useTranslation } from '@/lib/language-context';

export default function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.hero_title')}</h1>
      <p>{t('home.hero_subtitle')}</p>
    </div>
  );
}
```

## SEO and Archive Compatibility

The website includes several features to optimize for search engines and ensure compatibility with the Internet Archive Wayback Machine:

### SEO Features

1. **Metadata API**: Uses Next.js metadata API for page-specific SEO
2. **Structured Data**: Includes JSON-LD structured data for products and pages
3. **Sitemap**: Automatically generated sitemap.xml from content files
4. **Robots.txt**: Configurable robots.txt file

### Archive Compatibility

1. **Static Rendering**: Prioritizes static rendering for better archiving
2. **Cache Headers**: Includes appropriate cache headers for archiving
3. **Archive-Specific Meta Tags**: Custom meta tags for Internet Archive compatibility

## Styling

The website uses a ThinkPad-inspired design with:

1. Black and red color scheme
2. Angular, minimalist aesthetic
3. High contrast interfaces
4. Clean typography

### CSS Structure

- Base styles in `globals.css`
- ThinkPad-specific styling in custom CSS files
- Responsive design with mobile-first approach

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SITE_URL=https://thinkhome.org
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

### Next.js Configuration

The `next.config.js` file includes configuration for:

1. Image optimization
2. Internationalization
3. Static export options
4. MDX processing

## Development

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Adding New Features

1. Create components in `src/components/`
2. Add pages in `src/app/`
3. Update content in `src/content/`

## Deployment

The website can be deployed to various platforms:

### Static Export

```
npm run build
npm run export
```

This generates a static site in the `out` directory that can be deployed to any static hosting service.

### Vercel Deployment

For automatic deployment with Vercel:

1. Connect your GitHub repository to Vercel
2. Configure build settings
3. Deploy

## Maintenance

### Content Updates

1. Edit markdown files in `src/content/` directories
2. Add new products by creating new files in `src/content/products/`
3. Update translations in `src/content/translations/`

### Technical Maintenance

1. Regularly update dependencies
2. Monitor performance and SEO metrics
3. Backup content files
4. Test across different browsers and devices

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
