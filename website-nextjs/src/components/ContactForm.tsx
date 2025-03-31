'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/language-context';

// Contact form component using Pageclip with ThinkPad styling
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const { t } = useTranslation();
  
  // Load Pageclip script and CSS
  useEffect(() => {
    // Add Pageclip CSS
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://s.pageclip.co/v1/pageclip.css';
    linkElement.media = 'screen';
    document.head.appendChild(linkElement);
    
    // Add Pageclip script
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://s.pageclip.co/v1/pageclip.js';
    scriptElement.charset = 'utf-8';
    scriptElement.async = true;
    document.body.appendChild(scriptElement);
    
    // Cleanup on unmount
    return () => {
      document.head.removeChild(linkElement);
      document.body.removeChild(scriptElement);
    };
  }, []);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // The form will be handled by Pageclip's script
      // But we can also add our own logic here
      
      // Simulate a delay for the Pageclip submission
      setTimeout(() => {
        setSubmitStatus('success');
        setIsSubmitting(false);
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
          company: ''
        });
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }, 1500);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="contact-form-container bg-gray-900 dark:bg-black p-6 border-l-4 border-red-600">
      <h2 className="text-2xl font-bold mb-6">{t('contact.title')}</h2>
      
      {submitStatus === 'success' && (
        <div className="bg-green-800 text-white p-4 mb-6 border-l-4 border-green-600">
          <p>{t('contact.success_message')}</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-red-800 text-white p-4 mb-6 border-l-4 border-red-600">
          <p>{t('contact.error_message')}</p>
        </div>
      )}
      
      <form 
        action="https://send.pageclip.co/tGA4Z7aiAt6GxO4F9ySFIX2BnQhhjUUa/contact-form" 
        className="pageclip-form" 
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              {t('contact.name')} <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-red-600 rounded-none p-3 text-white"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t('contact.email')} <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-red-600 rounded-none p-3 text-white"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              {t('contact.phone')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 focus:border-red-600 rounded-none p-3 text-white"
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              {t('contact.company')}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 focus:border-red-600 rounded-none p-3 text-white"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            {t('contact.subject')} <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 focus:border-red-600 rounded-none p-3 text-white"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            {t('contact.message')} <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full bg-gray-800 border border-gray-700 focus:border-red-600 rounded-none p-3 text-white"
          ></textarea>
        </div>
        
        <div className="text-right">
          <button
            type="submit"
            className="pageclip-form__submit bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-none transition duration-300 flex items-center justify-center"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? t('contact.sending') : t('contact.send')}</span>
            {isSubmitting && (
              <svg className="animate-spin ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </button>
        </div>
      </form>
      
      {/* Legacy browser support message */}
      <div className="mt-6 text-xs text-gray-400">
        <p>{t('contact.legacy_support')}</p>
      </div>
    </div>
  );
}
