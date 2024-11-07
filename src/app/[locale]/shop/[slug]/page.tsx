import { unstable_setRequestLocale } from 'next-intl/server';
import axios, { endpoints } from 'src/utils/axios';
import { ShopProductDetailsView } from 'src/sections/shop/view';

interface PageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default function Page({ params }: PageProps) {
  // Set the locale for the request
  unstable_setRequestLocale(params.locale);

  return <ShopProductDetailsView slug={params.slug} />;
}
