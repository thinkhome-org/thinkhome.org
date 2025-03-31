# ThinkHome Website Development Guide

## Overview

This development guide provides instructions for developers who want to contribute to or extend the ThinkHome website. It covers development setup, coding standards, and best practices.

## Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Project Structure](#project-structure)
3. [Coding Standards](#coding-standards)
4. [Component Development](#component-development)
5. [Content Management](#content-management)
6. [Testing](#testing)
7. [Performance Optimization](#performance-optimization)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

## Development Environment Setup

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/thinkhome/website.git
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update the variables as needed

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

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
│   ├── lib/              # Utility functions and libraries
│   │   ├── mdx.ts        # Markdown processing utilities
│   │   ├── language-context.tsx # Multilingual support
│   │   └── seo.js        # SEO and archive compatibility
│   └── config/           # Configuration files
│       ├── theme.js      # Theme configuration
│       ├── navigation.js # Navigation configuration
│       └── products.js   # Product display configuration
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define interfaces for component props
- Use type guards for runtime type checking
- Avoid using `any` type

Example:

```typescript
interface ProductCardProps {
  product: {
    title: string;
    description: string;
    price: number;
    image?: string;
  };
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // Component implementation
};
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use named exports for components
- Place each component in its own file
- Group related components in folders

Example:

```tsx
// src/components/ProductCard/ProductCard.tsx
import React from 'react';
import { ProductImage } from './ProductImage';
import { ProductDetails } from './ProductDetails';
import { AddToCartButton } from './AddToCartButton';

export interface ProductCardProps {
  // Props definition
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <ProductImage src={product.image} alt={product.title} />
      <ProductDetails title={product.title} description={product.description} price={product.price} />
      <AddToCartButton onClick={onAddToCart} />
    </div>
  );
};
```

### CSS/Styling

- Use Tailwind CSS for styling
- Create custom utility classes for repeated patterns
- Use CSS modules for component-specific styles
- Follow the ThinkPad design system

Example:

```tsx
// Using Tailwind CSS
<div className="bg-gray-800 text-white p-4 rounded-none border-l-4 border-red-600">
  <h2 className="text-xl font-bold mb-2">{product.title}</h2>
  <p className="text-gray-300">{product.description}</p>
</div>
```

## Component Development

### Creating a New Component

1. Create a new folder in `src/components/`
2. Create the component file with TypeScript and React
3. Export the component
4. Use the component in pages or other components

### Component Documentation

Document components with JSDoc comments:

```tsx
/**
 * ProductCard component displays a product with image, details, and add to cart button
 * 
 * @param {Object} product - The product object with title, description, price, and image
 * @param {Function} onAddToCart - Optional callback when add to cart button is clicked
 * @returns {JSX.Element} The product card component
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // Component implementation
};
```

## Content Management

### Adding New Products

1. Create a new markdown file in `src/content/products/`
2. Add YAML frontmatter with product details
3. Write product description in markdown format
4. Add product images to `public/images/products/`

### Updating Translations

1. Find the translation key in the appropriate file in `src/content/translations/`
2. Update the translation value
3. If adding a new key, add it to all language files

## Testing

### Running Tests

```bash
npm run test
# or
yarn test
```

### Writing Tests

Use Jest and React Testing Library for component tests:

```tsx
// src/components/ProductCard/ProductCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    title: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    image: '/test-image.jpg',
  };

  it('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', async () => {
    const mockOnAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    await userEvent.click(screen.getByText('Add to Cart'));
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
  });
});
```

## Performance Optimization

### Image Optimization

- Use Next.js Image component for automatic optimization
- Provide width and height attributes
- Use appropriate image formats (WebP, AVIF)

Example:

```tsx
import Image from 'next/image';

<Image 
  src="/images/products/thinkpad-t480.jpg"
  alt="ThinkPad T480"
  width={600}
  height={400}
  priority={true}
/>
```

### Code Splitting

- Use dynamic imports for large components
- Lazy load components that are not immediately visible

Example:

```tsx
import dynamic from 'next/dynamic';

const ProductReviews = dynamic(() => import('@/components/ProductReviews'), {
  loading: () => <p>Loading reviews...</p>,
});
```

### Caching Strategies

- Use ISR (Incremental Static Regeneration) for frequently updated pages
- Set appropriate revalidation periods

Example:

```tsx
export async function getStaticProps() {
  const products = await getAllProducts();
  
  return {
    props: {
      products,
    },
    revalidate: 3600, // Revalidate every hour
  };
}
```

## Deployment

### Building for Production

```bash
npm run build
# or
yarn build
```

### Vercel Deployment

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Configure build settings
4. Deploy

### Custom Server Deployment

1. Build the application
2. Set up a Node.js server or use a static file server
3. Configure server for proper routing
4. Set up SSL certificate
5. Configure caching headers

## Troubleshooting

### Common Issues

#### Build Errors

- Check for TypeScript errors
- Verify all dependencies are installed
- Clear the `.next` cache folder

#### Runtime Errors

- Check browser console for JavaScript errors
- Verify API endpoints are accessible
- Check environment variables

#### Styling Issues

- Verify Tailwind CSS is properly configured
- Check for conflicting styles
- Use browser developer tools to inspect elements

### Getting Help

- Check the Next.js documentation
- Search for issues on GitHub
- Join the Next.js Discord community
- Contact the ThinkHome development team
