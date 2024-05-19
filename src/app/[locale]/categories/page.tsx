// ----------------------------------------------------------------------

import { unstable_setRequestLocale } from 'next-intl/server';

import CategoriesView from 'src/sections/shop/view/tags-view';

export const metadata = {
  title: 'Shop All Tags',
};
type Props = {
  params: { locale: string };
};
export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <CategoriesView />;
}
