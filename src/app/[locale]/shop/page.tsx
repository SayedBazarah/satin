// ----------------------------------------------------------------------

import { unstable_setRequestLocale } from 'next-intl/server';

import { ShopView } from 'src/sections/shop/view';

export const metadata = {
  title: 'Shop',
};

type Props = {
  params: { locale: string };
};
export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <ShopView />;
}
