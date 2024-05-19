// ----------------------------------------------------------------------

import { unstable_setRequestLocale } from 'next-intl/server';

import TokenExpiredView from 'src/sections/auth/jwt/token-expired';

export const metadata = {
  title: 'Dashboard: Token Expired',
};

type Props = {
  params: { locale: string };
};
export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <TokenExpiredView />;
}
