import { MetadataRoute } from 'next';
import { getAllContent } from '@/lib/mdx';

// Generate sitemap.xml for search engines
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL for the site
  const baseUrl = 'https://thinkhome.org';
  
  // Static routes
  const routes = [
    '',
    '/products',
    '/services',
    '/about',
    '/contact',
    '/blog',
    '/docs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
  
  // Dynamic routes from content
  try {
    // Get all products
    const products = await getAllContent('products');
    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
    
    // Get all services
    const services = await getAllContent('services');
    const serviceRoutes = services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
    
    // Get all blog posts
    const blogPosts = await getAllContent('pages');
    const blogRoutes = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
    
    // Get all docs
    const docs = await getAllContent('docs');
    const docRoutes = docs.map((doc) => ({
      url: `${baseUrl}/docs/${doc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));
    
    // Combine all routes
    return [...routes, ...productRoutes, ...serviceRoutes, ...blogRoutes, ...docRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return routes;
  }
}
