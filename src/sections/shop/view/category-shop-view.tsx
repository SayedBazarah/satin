'use client';

import { useState } from 'react';
import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useGetCategoryProducts } from 'src/api/product';

import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import { IProductItem, IProductFilters } from 'src/types/product';

import ProductList from '../product-list';
import CartIcon from '../common/cart-icon';
import { useCheckoutContext } from '../../checkout/context';

// ----------------------------------------------------------------------

const defaultFilters: IProductFilters = {
  gender: [],
  tag: 'all',
  colors: [],
  rating: '',
  category: 'all',
  priceRange: [0, 200],
};

// ----------------------------------------------------------------------

type Props = {
  slug: string;
};
// ----------------------------------------------------------------------

export default function CategoryShopView({ slug }: Props) {
  const settings = useSettingsContext();

  const checkout = useCheckoutContext();

  const [sortBy] = useState('featured');

  const [filters] = useState(defaultFilters);

  const { categories, categoriesLoading, categoriesEmpty } = useGetCategoryProducts(slug);

  const dataFiltered = applyFilter({
    inputData: (categories && categories.products) || [],
    filters,
    sortBy,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = !dataFiltered.length && canReset;

  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mb: 15,
      }}
    >
      <CartIcon totalItems={checkout.totalItems} />

      <Typography
        variant="h2"
        textAlign="center"
        sx={{
          my: { xs: 3, md: 5 },
          backgroundColor: 'primary.darker',
          py: { xs: 5, md: 7 },
          color: 'white',
          borderRadius: 2,
        }}
      >
        {categories && categories.title}
      </Typography>

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {(notFound || categoriesEmpty) && renderNotFound}

      <ProductList products={dataFiltered} loading={categoriesLoading} />
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  filters,
  sortBy,
}: {
  inputData: IProductItem[];
  filters: IProductFilters;
  sortBy: string;
}) {
  const { gender, category, colors, priceRange, rating } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  // SORT BY
  if (sortBy === 'featured') {
    inputData = orderBy(inputData, ['totalSold'], ['desc']);
  }

  if (sortBy === 'newest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    inputData = orderBy(inputData, ['price'], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    inputData = orderBy(inputData, ['price'], ['asc']);
  }

  // FILTERS
  if (gender.length) {
    inputData = inputData.filter((product) => gender.includes(product.gender));
  }

  if (category !== 'all') {
    inputData = inputData.filter((product) => product.category === category);
  }

  if (colors.length) {
    inputData = inputData.filter((product) =>
      product.colors.some((color) => colors.includes(color))
    );
  }

  if (min !== 0 || max !== 200) {
    inputData = inputData.filter((product) => product.price >= min && product.price <= max);
  }

  if (rating) {
    inputData = inputData.filter((product) => {
      const convertRating = (value: string) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return product.totalRatings > convertRating(rating);
    });
  }

  return inputData;
}
