'use client';

import { Box, Container, Typography } from '@mui/material';

import { useGetCategories } from 'src/api/product';

import CategorySection from 'src/sections/home/category-section';
import ProductsScroller from 'src/sections/home/products-scroller';
import { useCheckoutContext } from 'src/sections/checkout/context';

import CartIcon from '../common/cart-icon';

export default function CategoriesView() {
  const { categories } = useGetCategories();
  const checkout = useCheckoutContext();

  return (
    <Container>
      <CartIcon totalItems={checkout.totalItems} />
      <Box>
        <Typography variant="h1" align="center" my={7}>
          Shop By Category
        </Typography>
      </Box>
      {categories &&
        categories.map((category, index) => (
          <Container key={index}>
            <CategorySection coverImage={category.coverImage} href={category.slug} />
            <ProductsScroller products={category.products} />
          </Container>
        ))}
    </Container>
  );
}
