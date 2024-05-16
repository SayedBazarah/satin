import { useState } from 'react';

import Box, { BoxProps } from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { IProductItem } from 'src/types/product';

import ProductItem from './product-item';
import { ProductItemSkeleton } from './product-skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  products: IProductItem[];
  loading?: boolean;
};

export default function ProductList({ products, loading, ...other }: Props) {
  const [currentPage, setCurrentPage] = useState(0);

  const productsPerPage = 12;
  const pages = Math.ceil(products.length / productsPerPage);

  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </>
  );

  const renderList = (
    <>
      {products
        .slice(currentPage * productsPerPage, currentPage * productsPerPage + productsPerPage)
        .map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
    </>
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        {...other}
      >
        {loading ? renderSkeleton : renderList}
      </Box>

      {products.length > 12 && (
        <Pagination
          count={pages}
          onChange={(e, value) => setCurrentPage(value - 1)}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
