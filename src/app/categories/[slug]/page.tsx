// ----------------------------------------------------------------------

import axios, { endpoints } from 'src/utils/axios';

import CategoryShopView from 'src/sections/shop/view/category-shop-view';

export const metadata = {
  title: 'Shop By Category',
};

export default function Page({ params }: { params: { slug: string } }) {
  return <CategoryShopView slug={params.slug} />;
}

export async function generateStaticParams() {
  const res = await axios.get(endpoints.product.slugs);
  return res.data.slugs;
}
