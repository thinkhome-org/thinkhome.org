import { MetadataRoute } from 'next';
import { getAllContent } from '@/lib/mdx';

// Generate robots.txt for search engines
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://thinkhome.org/sitemap.xml',
  };
}
