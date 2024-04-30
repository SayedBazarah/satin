import React from 'react';

import { Stack, Container } from '@mui/material';

import MainLayout from 'src/layouts/main';
import { useGetLandingPage } from 'src/api/product';

import CartIcon from 'src/sections/shop/common/cart-icon';
import { useCheckoutContext } from 'src/sections/checkout/context';

import HomeHero from '../home-hero';
import SectionTitle from '../section-title';
import CategorySection from '../category-section';
import ProductsScroller from '../products-scroller';

export default function HomeView() {
  const { categories, trendy } = useGetLandingPage();

  const checkout = useCheckoutContext();

  return (
    <MainLayout>
      <CartIcon totalItems={checkout.totalItems} />
      <Container>
        <Stack spacing={6}>
          <HomeHero categories={categories} />
          <Stack spacing={2}>
            <SectionTitle title="Trendy Products" />
            <ProductsScroller products={trendy || []} />
          </Stack>
          {categories &&
            categories.map((category, index) => (
              <Container key={index}>
                <CategorySection coverImage={category.coverImage} href={category.slug} />
                <ProductsScroller products={category.products} />
              </Container>
            ))}
        </Stack>
      </Container>
    </MainLayout>
  );
}
