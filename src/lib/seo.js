// Internet Archive compatibility configuration
export const config = {
  // Ensure static rendering for better archiving
  unstable_runtimeJS: false,
  
  // Add specific meta tags for Internet Archive
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'all, noarchive, nosnippet, notranslate, noimageindex',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
        ],
      },
    ];
  },
};

// Helper function to generate structured metadata for better SEO
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  type = 'website',
  locale = 'en',
  canonical,
}) {
  const baseUrl = 'https://thinkhome.org';
  const imageUrl = image ? `${baseUrl}${image}` : `${baseUrl}/images/default-og.jpg`;
  const url = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return {
    // Basic metadata
    title,
    description,
    keywords: keywords.join(', '),
    
    // Open Graph metadata
    openGraph: {
      title,
      description,
      url,
      siteName: 'ThinkHome',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type,
    },
    
    // Twitter metadata
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    
    // Canonical URL
    alternates: {
      canonical: url,
    },
    
    // Additional metadata for Internet Archive compatibility
    archives: {
      enabled: true,
      snapshots: true,
    },
    
    // Structured data for rich results
    schema: {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebPage',
      name: title,
      description,
      image: imageUrl,
      url,
      publisher: {
        '@type': 'Organization',
        name: 'ThinkHome',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/logo.png`,
        },
      },
    },
  };
}

// Helper function to generate static paths for all content types
export async function generateStaticPaths(contentType) {
  const contents = await getAllContent(contentType);
  
  return {
    paths: contents.map((content) => ({
      params: { slug: content.slug },
    })),
    fallback: 'blocking',
  };
}

// Helper function to add structured data for products
export function generateProductStructuredData(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.meta.title,
    description: product.meta.description,
    image: product.meta.images,
    sku: product.slug,
    brand: {
      '@type': 'Brand',
      name: product.meta.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.meta.price,
      priceCurrency: product.meta.currency,
      availability: product.meta.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'ThinkHome',
      },
    },
  };
}

// Add specific meta tags for Internet Archive compatibility
export function addArchiveCompatibility(req, res) {
  // Set headers for better archiving
  res.setHeader('X-Archive-Allow', 'yes');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  
  // Add noindex for specific paths that shouldn't be archived
  const path = req.url;
  if (path.includes('/admin') || path.includes('/api')) {
    res.setHeader('X-Robots-Tag', 'noindex');
  }
}
