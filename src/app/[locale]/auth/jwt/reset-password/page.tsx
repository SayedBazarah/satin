// ----------------------------------------------------------------------

import { unstable_setRequestLocale } from 'next-intl/server';

import { ResetPasswordView } from 'src/sections/auth/jwt';

export const metadata = {
  title: 'Dashboard: Reset Password',
};

type Props = {
  params: { locale: string };
};
export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <ResetPasswordView />;
}
