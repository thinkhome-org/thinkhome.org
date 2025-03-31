'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/lib/language-context';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LanguageSelector from '@/components/LanguageSelector';

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="hero bg-gray-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('home.hero_title')}
              </h1>
              <p className="text-xl mb-8">
                {t('home.hero_subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/products" 
                  className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-none transition duration-300 text-center"
                >
                  {t('home.browse_products')}
                </Link>
                <Link 
                  href="/services" 
                  className="border-2 border-white hover:bg-white hover:text-gray-900 text-white py-3 px-6 rounded-none transition duration-300 text-center"
                >
                  {t('home.our_services')}
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-96 w-full">
                <Image 
                  src="/images/hero-laptop.jpg" 
                  alt="ThinkPad Laptop" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t('home.why_choose_us')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-item bg-gray-700 p-6 border-l-4 border-red-600">
              <div className="feature-icon text-red-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.quality_title')}</h3>
              <p>{t('home.quality_description')}</p>
            </div>
            <div className="feature-item bg-gray-700 p-6 border-l-4 border-red-600">
              <div className="feature-icon text-red-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.expertise_title')}</h3>
              <p>{t('home.expertise_description')}</p>
            </div>
            <div className="feature-item bg-gray-700 p-6 border-l-4 border-red-600">
              <div className="feature-icon text-red-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12z"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.warranty_title')}</h3>
              <p>{t('home.warranty_description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">{t('home.featured_products')}</h2>
            <Link 
              href="/products" 
              className="text-red-600 hover:text-red-500 flex items-center"
            >
              {t('home.view_all')}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured Product 1 */}
            <div className="product-card bg-gray-800 overflow-hidden">
              <div className="product-image relative h-48">
                <Image 
                  src="/images/products/thinkpad-t480-1.jpg" 
                  alt="ThinkPad T480" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">ThinkPad T480</h3>
                <p className="text-gray-300 mb-4">{t('products.t480_description')}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-red-600">$499</span>
                  <Link 
                    href="/products/thinkpad-t480" 
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-none transition duration-300"
                  >
                    {t('home.view_details')}
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Featured Product 2 */}
            <div className="product-card bg-gray-800 overflow-hidden">
              <div className="product-image relative h-48">
                <Image 
                  src="/images/products/thinkpad-x1-carbon-gen9-1.jpg" 
                  alt="ThinkPad X1 Carbon Gen 9" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">ThinkPad X1 Carbon Gen 9</h3>
                <p className="text-gray-300 mb-4">{t('products.x1_carbon_description')}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-red-600">$899</span>
                  <Link 
                    href="/products/thinkpad-x1-carbon-gen9" 
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-none transition duration-300"
                  >
                    {t('home.view_details')}
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Featured Product 3 */}
            <div className="product-card bg-gray-800 overflow-hidden">
              <div className="product-image relative h-48">
                <Image 
                  src="/images/products/thinkpad-p1-gen4-1.jpg" 
                  alt="ThinkPad P1 Gen 4" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">ThinkPad P1 Gen 4</h3>
                <p className="text-gray-300 mb-4">{t('products.p1_gen4_description')}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-red-600">$1299</span>
                  <Link 
                    href="/products/thinkpad-p1-gen4" 
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-none transition duration-300"
                  >
                    {t('home.view_details')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">{t('home.our_services_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="service-item bg-gray-800 p-6 border-t-4 border-red-600">
              <h3 className="text-xl font-bold mb-4">{t('home.repair_service_title')}</h3>
              <p className="mb-4">{t('home.repair_service_description')}</p>
              <ul className="list-disc pl-5 mb-4">
                <li>{t('home.repair_service_item1')}</li>
                <li>{t('home.repair_service_item2')}</li>
                <li>{t('home.repair_service_item3')}</li>
              </ul>
              <Link 
                href="/services#repair" 
                className="text-red-600 hover:text-red-500 flex items-center"
              >
                {t('home.learn_more')}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
            <div className="service-item bg-gray-800 p-6 border-t-4 border-red-600">
              <h3 className="text-xl font-bold mb-4">{t('home.upgrade_service_title')}</h3>
              <p className="mb-4">{t('home.upgrade_service_description')}</p>
              <ul className="list-disc pl-5 mb-4">
                <li>{t('home.upgrade_service_item1')}</li>
                <li>{t('home.upgrade_service_item2')}</li>
                <li>{t('home.upgrade_service_item3')}</li>
              </ul>
              <Link 
                href="/services#upgrade" 
                className="text-red-600 hover:text-red-500 flex items-center"
              >
                {t('home.learn_more')}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* eBay Store Notice */}
      <section className="py-12 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('home.ebay_title')}</h2>
          <p className="mb-6">{t('home.ebay_notice')}</p>
          <a 
            href="https://www.ebay.com/usr/resilientcrow" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-none transition duration-300"
          >
            {t('home.visit_ebay')}
          </a>
        </div>
      </section>

      {/* Theme and Language Controls */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        <ThemeSwitcher />
        <LanguageSelector />
      </div>
    </main>
  );
}
