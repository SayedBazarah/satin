// ----------------------------------------------------------------------

import { unstable_setRequestLocale } from 'next-intl/server';

import { locales } from 'src/locales/navigation';

import { ForgotPasswordView } from 'src/sections/auth/jwt';

export const metadata = {
  title: 'Dashboard: Forgot Password',
};

type Props = {
  params: { locale: string };
};
export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return <ForgotPasswordView />;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
