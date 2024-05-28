import { unstable_setRequestLocale } from 'next-intl/server';

import { SatinStoreView } from 'src/sections/home/view';

type Props = {
  params: { locale: string };
};
export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <SatinStoreView />;
}
