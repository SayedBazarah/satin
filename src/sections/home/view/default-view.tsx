'use client';

import React from 'react';

import { Box, Stack, Container } from '@mui/material';

import MainLayout from 'src/layouts/main';
import { useGetLandingPage } from 'src/api/product';

import CartIcon from 'src/sections/shop/common/cart-icon';
import { useCheckoutContext } from 'src/sections/checkout/context';

import HomeHero from '../home-hero';
import CategorySection from '../category-section';
import ProductsScroller from '../products-scroller';

export default function HomeView() {
  const { categories } = useGetLandingPage();

  const checkout = useCheckoutContext();

  return (
    <MainLayout>
      <Container>
        <CartIcon totalItems={checkout.totalItems} />
        <Stack spacing={4}>
          <HomeHero categories={categories} />
          {categories &&
            categories.map((category, index) => (
              <Box key={index}>
                <CategorySection coverImage={category.coverImage} href={category.slug} />
                <ProductsScroller title="" products={category.products} />
              </Box>
            ))}
        </Stack>
      </Container>
    </MainLayout>
  );
}
