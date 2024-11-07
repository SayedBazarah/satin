// ----------------------------------------------------------------------

import CategoryShopView from 'src/sections/shop/view/category-shop-view';

export const metadata = {
  title: 'Shop By Category',
};

export default function Page({ params }: { params: { slug: string } }) {
  return <CategoryShopView slug={params.slug} />;
}
