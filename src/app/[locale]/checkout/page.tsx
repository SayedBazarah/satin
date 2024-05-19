// ----------------------------------------------------------------------

import { unstable_setRequestLocale } from 'next-intl/server';

import { CheckoutView } from 'src/sections/checkout/view';

export const metadata = {
  title: 'Checkout',
};

type Props = {
  params: { locale: string };
};
export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return <CheckoutView />;
}
