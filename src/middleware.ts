import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { locales, defaultLocale } from './locales/navigation';

// export default createMiddleware({
//   // A list of all locales that are supported

//   locales: ['ar', 'en'],
//   // Used when no locale matches
//   defaultLocale: 'ar',
// });

// import { NextRequest } from 'next/server';
// import createMiddleware from 'next-intl/middleware';

// import { locales } from './locales/navigation';

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Get current locale from URL
  const localeParmas = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Save current locale to cookies
  if (localeParmas) {
    request.cookies.set('locale-cookies', localeParmas);
  }

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
  });

  // accept-lanuage will override the defaultLocale, so remove it.
  request.headers.set('accept-language', '');
  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*'],
};

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(ar/en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
// };
