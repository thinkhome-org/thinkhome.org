import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { compileMDX } from 'next-mdx-remote/rsc';

// Define the content types
export type ContentType = 'products' | 'services' | 'pages' | 'docs';

// Interface for content metadata
export interface ContentMeta {
  title: string;
  description: string;
  date?: string;
  slug: string;
  lang?: string;
  image?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  [key: string]: any; // Allow for additional custom fields
}

// Interface for content data
export interface ContentData {
  meta: ContentMeta;
  content: string;
  slug: string;
  type: ContentType;
}

/**
 * Get all content files of a specific type
 * @param type The content type (products, services, pages, docs)
 * @param locale The locale to filter by (optional)
 * @returns Array of content data
 */
export async function getAllContent(type: ContentType, locale?: string): Promise<ContentData[]> {
  const contentDirectory = path.join(process.cwd(), 'src/content', type);
  const fileNames = fs.readdirSync(contentDirectory);
  
  const allContent = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove .md or .mdx extension from file name to get slug
      const slug = fileName.replace(/\.mdx?$/, '');
      
      // Get content data
      const content = await getContentBySlug(type, slug);
      
      // Filter by locale if provided
      if (locale && content.meta.lang && content.meta.lang !== locale) {
        return null;
      }
      
      return content;
    })
  );
  
  // Filter out null values and sort by date if available
  return allContent
    .filter((content): content is ContentData => content !== null)
    .sort((a, b) => {
      if (a.meta.date && b.meta.date) {
        return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
      }
      return 0;
    });
}

/**
 * Get content by slug
 * @param type The content type (products, services, pages, docs)
 * @param slug The content slug
 * @returns Content data
 */
export async function getContentBySlug(type: ContentType, slug: string): Promise<ContentData> {
  // Try both .md and .mdx extensions
  let filePath = path.join(process.cwd(), 'src/content', type, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'src/content', type, `${slug}.mdx`);
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Use gray-matter to parse the metadata section
  const { data, content } = matter(fileContents);
  
  return {
    meta: data as ContentMeta,
    content,
    slug,
    type,
  };
}

/**
 * Process markdown content to HTML
 * @param content The markdown content
 * @returns Processed HTML content
 */
export async function markdownToHtml(content: string): Promise<string> {
  const result = await remark().use(html).process(content);
  return result.toString();
}

/**
 * Compile MDX content with React components
 * @param content The MDX content
 * @returns Compiled MDX content
 */
export async function compileMdxContent(content: string) {
  const { content: compiledContent } = await compileMDX({
    source: content,
    options: { parseFrontmatter: true }
  });
  
  return compiledContent;
}

/**
 * Get all available locales from content
 * @returns Array of available locales
 */
export function getAvailableLocales(): string[] {
  const locales = new Set<string>();
  const contentTypes: ContentType[] = ['products', 'services', 'pages', 'docs'];
  
  contentTypes.forEach(type => {
    const contentDirectory = path.join(process.cwd(), 'src/content', type);
    
    if (fs.existsSync(contentDirectory)) {
      const fileNames = fs.readdirSync(contentDirectory);
      
      fileNames.forEach(fileName => {
        const filePath = path.join(contentDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        if (data.lang) {
          locales.add(data.lang);
        }
      });
    }
  });
  
  return Array.from(locales);
}
