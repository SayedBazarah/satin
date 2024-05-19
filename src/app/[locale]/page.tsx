import { unstable_setRequestLocale } from 'next-intl/server';

import HomeView from 'src/sections/home/view/home-view';

type Props = {
  params: { locale: string };
};
export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <HomeView />;
}
