import { getAllContent, ContentType } from '@/lib/mdx';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/language-context';

// Define the props type for the Products page
interface ProductsPageProps {
  products: any[];
}

// Products page component
export default function ProductsPage({ products }: ProductsPageProps) {
  const { t } = useTranslation();

  return (
    <div className="products-page">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('products.title')}</h1>
        <p className="text-lg mb-8">{t('products.description')}</p>
        
        {/* Filters and sorting options */}
        <div className="filters-section mb-8 flex flex-wrap gap-4">
          <div className="filter-group">
            <label className="block mb-2">{t('products.filter_by')}:</label>
            <select className="bg-gray-800 border border-gray-700 rounded px-4 py-2">
              <option value="all">{t('products.all_products')}</option>
              <option value="laptops">{t('products.laptops')}</option>
              <option value="desktops">{t('products.desktops')}</option>
              <option value="accessories">{t('products.accessories')}</option>
            </select>
          </div>
          
          <div className="sort-group">
            <label className="block mb-2">{t('products.sort_by')}:</label>
            <select className="bg-gray-800 border border-gray-700 rounded px-4 py-2">
              <option value="price-asc">{t('products.price_low_high')}</option>
              <option value="price-desc">{t('products.price_high_low')}</option>
              <option value="newest">{t('products.newest')}</option>
            </select>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.slug} className="product-card bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="product-image relative h-48">
                {product.meta.images && product.meta.images.length > 0 ? (
                  <Image 
                    src={product.meta.images[0]} 
                    alt={product.meta.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-gray-700 h-full flex items-center justify-center">
                    <span>No image available</span>
                  </div>
                )}
                {product.meta.featured && (
                  <div className="featured-badge absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="product-details p-4">
                <h2 className="text-xl font-bold mb-2">{product.meta.title}</h2>
                <p className="text-gray-300 mb-4">{product.meta.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="price text-xl font-bold text-red-500">
                    {product.meta.currency} {product.meta.price}
                  </div>
                  <div className="stock-status">
                    {product.meta.inStock ? (
                      <span className="text-green-500">{t('products.in_stock')}</span>
                    ) : (
                      <span className="text-red-500">{t('products.out_of_stock')}</span>
                    )}
                  </div>
                </div>
                
                <Link 
                  href={`/products/${product.slug}`}
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 px-4 rounded transition duration-300"
                >
                  {t('products.view_details')}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* eBay store notice */}
        <div className="ebay-notice mt-12 p-6 bg-gray-800 rounded-lg text-center">
          <p className="mb-4">{t('home.ebay_notice')}</p>
          <a 
            href="https://www.ebay.com/usr/resilientcrow" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded transition duration-300"
          >
            {t('home.visit_ebay')}
          </a>
        </div>
      </div>
    </div>
  );
}

// Get static props for the Products page
export const getStaticProps: GetStaticProps = async () => {
  // Get all product content
  const products = await getAllContent('products');
  
  return {
    props: {
      products,
    },
    // Revalidate every hour
    revalidate: 3600,
  };
};
