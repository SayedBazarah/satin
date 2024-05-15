import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Used when no locale matches
  defaultLocale: 'ar',
  // A list of all locales that are supported
  locales: ['en', 'ar'],
  localePrefix: 'as-needed',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*'],
};
