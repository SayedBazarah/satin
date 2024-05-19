import { unstable_setRequestLocale } from 'next-intl/server';

import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Jwt: Login',
};

type Props = {
  params: { locale: string };
};
export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <JwtLoginView />;
}
