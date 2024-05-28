'use client';

import { Container } from '@mui/material';

import { useGetCategories } from 'src/api/product';

import { useSettingsContext } from 'src/components/settings';

import CategorySection from 'src/sections/home/category-section';
import ProductsScroller from 'src/sections/home/products-scroller';
import { useCheckoutContext } from 'src/sections/checkout/context';

import CartIcon from '../common/cart-icon';

export default function CategoriesView() {
  const settings = useSettingsContext();

  const { categories, categoriesLoading } = useGetCategories();

  const checkout = useCheckoutContext();

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mb: 15,
      }}
    >
      <CartIcon totalItems={checkout.totalItems} />

      {!categoriesLoading &&
        categories.map((category, index) => (
          <Container key={index} sx={{ mb: 3 }}>
            <CategorySection coverImage={category.coverImage} href={category.slug} />
            <ProductsScroller title="" products={category.products} />
          </Container>
        ))}
    </Container>
  );
}
