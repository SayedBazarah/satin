// ----------------------------------------------------------------------

import { unstable_setRequestLocale } from 'next-intl/server';

import WholesaleView from 'src/sections/home/view/wholesale-view';

export const metadata = {
  title: 'Wholesale',
};

type Props = {
  params: { locale: string };
};
export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <WholesaleView />;
}
