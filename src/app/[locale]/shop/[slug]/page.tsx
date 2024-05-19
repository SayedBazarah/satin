// ----------------------------------------------------------------------

import { unstable_setRequestLocale } from 'next-intl/server';

import axios, { endpoints } from 'src/utils/axios';

import { ShopProductDetailsView } from 'src/sections/shop/view';

export default function Page({ params }: { params: { slug: string; locale: string } }) {
  unstable_setRequestLocale(params.locale);
  return <ShopProductDetailsView slug={params.slug} />;
}

export async function generateStaticParams() {
  const res = await axios.get(endpoints.product.slugs);

  return res.data.slugs;
}
