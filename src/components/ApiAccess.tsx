'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/language-context';
import config from '@/config';

// API access component with documentation
export default function ApiAccess() {
  const [mounted, setMounted] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    setMounted(true);
    // Check if API key exists in localStorage
    const savedApiKey = localStorage.getItem('api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);
  
  // Generate a new API key
  const generateApiKey = () => {
    setIsGenerating(true);
    
    // Generate a random API key
    const randomKey = Array(32)
      .fill(0)
      .map(() => Math.random().toString(36).charAt(2))
      .join('');
    
    // Simulate API key generation
    setTimeout(() => {
      setApiKey(randomKey);
      localStorage.setItem('api-key', randomKey);
      setIsGenerating(false);
    }, 1000);
  };
  
  // Copy API key to clipboard
  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    // Show a toast or notification here
  };
  
  if (!mounted || !config.features.apiAccess) {
    return null;
  }
  
  return (
    <div className="api-access bg-gray-900 dark:bg-black p-6 border-l-4 border-red-600">
      <h2 className="text-2xl font-bold mb-6">{t('api.title')}</h2>
      
      <div className="mb-6">
        <p className="mb-4">{t('api.description')}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowDocs(!showDocs)}
            className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-none transition duration-300"
          >
            {showDocs ? t('api.hide_docs') : t('api.show_docs')}
          </button>
          
          <button
            onClick={generateApiKey}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-none transition duration-300 flex items-center justify-center"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('api.generating')}
              </>
            ) : (
              t('api.generate_key')
            )}
          </button>
        </div>
        
        {apiKey && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">{t('api.your_key')}</label>
            <div className="flex">
              <input
                type="text"
                value={apiKey}
                readOnly
                className="flex-grow bg-gray-800 border border-gray-700 rounded-none p-3 text-white"
              />
              <button
                onClick={copyApiKey}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 ml-2 rounded-none"
                title={t('api.copy_key')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {showDocs && (
        <div className="api-documentation bg-gray-800 p-6 border-l-4 border-gray-600">
          <h3 className="text-xl font-bold mb-4">{t('api.documentation_title')}</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-2">{t('api.authentication')}</h4>
            <p className="mb-2">{t('api.authentication_description')}</p>
            <pre className="bg-gray-900 p-4 overflow-x-auto text-sm">
              <code>
                {`// Include your API key in the Authorization header
fetch('${config.site.url}/api/products', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})`}
              </code>
            </pre>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-2">{t('api.endpoints')}</h4>
            
            <div className="mb-4">
              <h5 className="font-bold">{t('api.products_endpoint')}</h5>
              <p className="mb-2">{t('api.products_description')}</p>
              <pre className="bg-gray-900 p-4 overflow-x-auto text-sm">
                <code>
                  {`GET ${config.api.endpoints.products}
GET ${config.api.endpoints.products}/{slug}

// Response format:
{
  "success": true,
  "data": [
    {
      "slug": "thinkpad-t480",
      "title": "ThinkPad T480",
      "description": "Reliable business laptop with excellent battery life",
      "price": 499,
      "currency": "USD",
      "inStock": true,
      // ...other product data
    },
    // ...more products
  ]
}`}
                </code>
              </pre>
            </div>
            
            <div className="mb-4">
              <h5 className="font-bold">{t('api.pages_endpoint')}</h5>
              <p className="mb-2">{t('api.pages_description')}</p>
              <pre className="bg-gray-900 p-4 overflow-x-auto text-sm">
                <code>
                  {`GET ${config.api.endpoints.pages}
GET ${config.api.endpoints.pages}/{slug}

// Response format:
{
  "success": true,
  "data": {
    "slug": "about",
    "title": "About Us",
    "content": "Markdown content here...",
    // ...other page data
  }
}`}
                </code>
              </pre>
            </div>
            
            <div className="mb-4">
              <h5 className="font-bold">{t('api.edit_endpoint')}</h5>
              <p className="mb-2">{t('api.edit_description')}</p>
              <pre className="bg-gray-900 p-4 overflow-x-auto text-sm">
                <code>
                  {`POST ${config.api.endpoints.edit}
Content-Type: application/json

{
  "type": "product", // or "page"
  "slug": "thinkpad-t480",
  "content": "Updated markdown content...",
  "metadata": {
    // Updated metadata fields
  }
}

// Response format:
{
  "success": true,
  "message": "Content updated successfully"
}`}
                </code>
              </pre>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-2">{t('api.rate_limits')}</h4>
            <p>{t('api.rate_limits_description', { maxRequests: config.api.rateLimit.maxRequests, timeWindow: config.api.rateLimit.timeWindow / 1000 })}</p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-2">{t('api.error_handling')}</h4>
            <p className="mb-2">{t('api.error_handling_description')}</p>
            <pre className="bg-gray-900 p-4 overflow-x-auto text-sm">
              <code>
                {`// Error response format:
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing API key"
  }
}`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
