import React from 'react';

import MainLayout from 'src/layouts/main';
import HomeHero from '../home-hero';
import { Container, Stack } from '@mui/material';
import ProductsScroller from '../products-scroller';
import { useGetProducts } from 'src/api/product';
import CategorySection from '../category-section';
import DownloadTheApp from '../download-apps';

export default function HomeView() {
  const { products } = useGetProducts();
  return (
    <MainLayout>
      <Container>
        <Stack spacing={6}>
          <HomeHero />
          <ProductsScroller title="Trendy Products" products={products || []} />
          <CategorySection products={products} />
          {/* <DownloadTheApp /> */}
        </Stack>
      </Container>
    </MainLayout>
  );
}
