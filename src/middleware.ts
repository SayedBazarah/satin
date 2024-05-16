import createMiddleware from 'next-intl/middleware';

import { locales, localePrefix, defaultLocale } from './locales/navigation';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/(en|(?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)/:path*'],
};
