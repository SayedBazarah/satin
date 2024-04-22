import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';

import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';
import { IProductItem } from 'src/types/product';
import ProductItem from './product-item';

type Props = {
  products: IProductItem[];
};
export default function CategorySection({ products }: Props) {
  const md = useResponsive('up', 'md');

  return (
    <Stack spacing={5}>
      <Box position="relative">
        <Image
          src="http://localhost:3000/media/images/resourses/cover.jpg"
          width={'100%'}
          borderRadius={2}
          sx={{
            height: (md && 300) || 250,
            ['&::after']: {
              content: '""',
              position: 'absolute',
              opacity: 0.2,
              backgroundColor: 'black',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography fontSize={64} color="white">
            FRESHFOOD
          </Typography>
        </Box>
      </Box>
      {/* ------------------------------------------------------ */}
      <Grid container>
        {products.map((product, index) => (
          <Grid xs={6} md={4}>
            <ProductItem key={index} product={product} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
