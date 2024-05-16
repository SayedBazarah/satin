import React from 'react';

import { Box, Grid, Stack, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';

import { IProductItem } from 'src/types/product';

import ProductItem from './product-item';

type Props = {
  products?: IProductItem[];
  coverImage?: string;
  title?: string;
  href?: string;
};
export default function CategorySection({ title, href, coverImage = '', products = [] }: Props) {
  const md = useResponsive('up', 'md');

  return (
    <Box
      component={RouterLink}
      href={(href && href) || ''}
      sx={{
        textDecoration: 'none',
        bgcolor: '#000',
        width: '100%',
      }}
    >
      <Stack spacing={1}>
        <Box position="relative">
          {coverImage && (
            <Image
              src={coverImage}
              width="100%"
              alt=""
              borderRadius={2}
              sx={{
                height: (md && 300) || 250,
              }}
            />
          )}
          <Box
            sx={
              {
                // ['&::after']: {
                //   content: '""',
                //   position: 'absolute',
                //   opacity: 0.2,
                //   backgroundColor: 'black',
                //   top: 0,
                //   bottom: 0,
                //   left: 0,
                //   right: 0,
                //   borderRadius: 2,
                // },
              }
            }
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
              {title}
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
    </Box>
  );
}
