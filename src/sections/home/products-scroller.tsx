import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { m as motion } from 'framer-motion';
import Carousel, { useCarousel } from 'src/components/carousel';

import { IProductItem } from 'src/types/product';
import { useResponsive } from 'src/hooks/use-responsive';

import ProductItem from './product-item';

type Props = {
  title?: string;
  products: IProductItem[];
};

export default function ProductsScroller({ title, products }: Props) {
  const md = useResponsive('up', 'md');

  const carousel = useCarousel({
    rtl: false,
    rows: 1, // Display only one row
    slidesToShow: (md && 4) || 2,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  return (
    <Stack>
      <Box
        sx={{
          width: 'fit-content',
          position: 'relative',
          ['&::after']: {
            content: '""',
            position: 'absolute',
            bottom: 5,
            left: -10,
            width: '60%',
            height: '16px',
            backgroundColor: 'primary.main',
            zIndex: -1, // Ensures the pseudo-element is behind the text
          },
        }}
      >
        <Typography variant="h3">{title}</Typography>
      </Box>
      <motion.div
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'keyframes', stiffness: 50, duration: 1 }}
      >
        <Box mt={4}>
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {products.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))}
          </Carousel>
        </Box>
      </motion.div>
    </Stack>
  );
}
