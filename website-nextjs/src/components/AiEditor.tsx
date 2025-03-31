'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/language-context';
import config from '@/config';

// AI Editing component with documentation
export default function AiEditor() {
  const [mounted, setMounted] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [contentType, setContentType] = useState('product');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [instruction, setInstruction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const { t } = useTranslation();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Process content with AI
  const processWithAi = async () => {
    setIsProcessing(true);
    setResult('');
    
    try {
      // In a real implementation, this would call the AI editing API
      // For now, we'll simulate a response
      setTimeout(() => {
        // Simple simulation of AI editing
        let aiResult = content;
        
        if (instruction.toLowerCase().includes('improve')) {
          aiResult = `# Improved Content\n\n${content}\n\n## Additional Information\n\nThis content has been enhanced with more details and better formatting.`;
        } else if (instruction.toLowerCase().includes('summarize')) {
          aiResult = `# Summary\n\n${content.split('\n').slice(0, 3).join('\n')}\n\n...`;
        } else if (instruction.toLowerCase().includes('translate')) {
          if (instruction.toLowerCase().includes('czech')) {
            aiResult = `# Přeložený obsah\n\nToto je ukázka přeloženého obsahu do češtiny.`;
          } else {
            aiResult = `# Translated Content\n\nThis is a sample of translated content.`;
          }
        } else {
          aiResult = `# Processed Content\n\n${content}\n\n_Processed according to instruction: "${instruction}"_`;
        }
        
        setResult(aiResult);
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error('Error processing with AI:', error);
      setResult(`Error: ${error.message}`);
      setIsProcessing(false);
    }
  };
  
  // Apply AI changes
  const applyChanges = () => {
    setContent(result);
    setResult('');
  };
  
  if (!mounted || !config.features.aiEditing) {
    return null;
  }
  
  return (
    <div className="ai-editor bg-gray-900 dark:bg-black p-6 border-l-4 border-red-600">
      <h2 className="text-2xl font-bold mb-6">{t('ai_editor.title')}</h2>
      
      <div className="mb-6">
        <p className="mb-4">{t('ai_editor.description')}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowDocs(!showDocs)}
            className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-none transition duration-300"
          >
            {showDocs ? t('ai_editor.hide_docs') : t('ai_editor.show_docs')}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="content-type" className="block text-sm font-medium mb-2">
            {t('ai_editor.content_type')}
          </label>
          <select
            id="content-type"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 focus:border-red-600 rounded-none p-3 text-white"
          >
            <option value="product">{t('ai_editor.product')}</option>
            <option value="page">{t('ai_editor.page')}</option>
            <option value="doc">{t('ai_editor.documentation')}</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="slug" className="block text-sm font-medium mb-2">
            {t('ai_editor.slug')}
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder={t('ai_editor.slug_placeholder')}
            className="w-full bg-gray-800 border border-gray-700 focus:border-red-600 rounded-none p-3 text-white"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          {t('ai_editor.content')}
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          placeholder={t('ai_editor.content_placeholder')}
          className="w-full bg-gray-800 border border-gray-700 focus:border-red-600 rounded-none p-3 text-white font-mono text-sm"
        ></textarea>
      </div>
      
      <div className="mb-6">
        <label htmlFor="instruction" className="block text-sm font-medium mb-2">
          {t('ai_editor.instruction')}
        </label>
        <input
          type="text"
          id="instruction"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder={t('ai_editor.instruction_placeholder')}
          className="w-full bg-gray-800 border border-gray-700 focus:border-red-600 rounded-none p-3 text-white"
        />
      </div>
      
      <div className="flex justify-end mb-6">
        <button
          onClick={processWithAi}
          disabled={!content || !instruction || isProcessing}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-none transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('ai_editor.processing')}
            </>
          ) : (
            t('ai_editor.process')
          )}
        </button>
      </div>
      
      {result && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            {t('ai_editor.result')}
          </label>
          <div className="bg-gray-800 border border-gray-700 rounded-none p-4 text-white font-mono text-sm h-64 overflow-y-auto">
            <pre>{result}</pre>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={applyChanges}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-none transition duration-300"
            >
              {t('ai_editor.apply_changes')}
            </button>
          </div>
        </div>
      )}
      
      {showDocs && (
        <div className="ai-documentation bg-gray-800 p-6 border-l-4 border-gray-600 mt-8">
          <h3 className="text-xl font-bold mb-4">{t('ai_editor.documentation_title')}</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-2">{t('ai_editor.capabilities')}</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('ai_editor.capability_improve')}</li>
              <li>{t('ai_editor.capability_summarize')}</li>
              <li>{t('ai_editor.capability_translate')}</li>
              <li>{t('ai_editor.capability_format')}</li>
              <li>{t('ai_editor.capability_seo')}</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-2">{t('ai_editor.instruction_examples')}</h4>
            <div className="space-y-4">
              <div className="bg-gray-900 p-4">
                <p className="font-bold">{t('ai_editor.example_improve')}</p>
                <p className="text-gray-400 text-sm mt-1">{t('ai_editor.example_improve_description')}</p>
              </div>
              <div className="bg-gray-900 p-4">
                <p className="font-bold">{t('ai_editor.example_translate')}</p>
                <p className="text-gray-400 text-sm mt-1">{t('ai_editor.example_translate_description')}</p>
              </div>
              <div className="bg-gray-900 p-4">
                <p className="font-bold">{t('ai_editor.example_seo')}</p>
                <p className="text-gray-400 text-sm mt-1">{t('ai_editor.example_seo_description')}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-2">{t('ai_editor.api_usage')}</h4>
            <p className="mb-2">{t('ai_editor.api_usage_description')}</p>
            <pre className="bg-gray-900 p-4 overflow-x-auto text-sm">
              <code>
                {`POST ${config.api.endpoints.edit}
Content-Type: application/json

{
  "type": "product",
  "slug": "thinkpad-t480",
  "content": "Current content...",
  "instruction": "Improve the description and add more technical details",
  "aiProcessing": true
}

// Response format:
{
  "success": true,
  "data": {
    "original": "Current content...",
    "processed": "Improved content with more technical details..."
  }
}`}
              </code>
            </pre>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-2">{t('ai_editor.limitations')}</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('ai_editor.limitation_length')}</li>
              <li>{t('ai_editor.limitation_languages')}</li>
              <li>{t('ai_editor.limitation_formatting')}</li>
              <li>{t('ai_editor.limitation_images')}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
