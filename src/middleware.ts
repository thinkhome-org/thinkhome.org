import { NextRequest, NextResponse } from 'next/server';
import { getAvailableLocales } from './lib/mdx';

// Default locale
const defaultLocale = 'en';

// Supported locales
const supportedLocales = ['en', 'cs']; // Will be dynamically updated based on content

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;
  
  // Get locale from cookie or headers
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const acceptLanguage = request.headers.get('Accept-Language');
  
  // Determine locale based on cookie, Accept-Language header, or default to 'en'
  let locale = cookieLocale || defaultLocale;
  
  if (!cookieLocale && acceptLanguage) {
    // Parse Accept-Language header to get preferred language
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => supportedLocales.includes(lang.substring(0, 2)));
    
    if (preferredLocale) {
      locale = preferredLocale.substring(0, 2);
    }
  }
  
  // Skip middleware for API routes and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // Set locale cookie if it doesn't exist
  const response = NextResponse.next();
  
  if (!cookieLocale) {
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
