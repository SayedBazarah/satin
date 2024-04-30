import React from 'react';
import { m as motion } from 'framer-motion';

import { Box, Stack } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Carousel, { useCarousel } from 'src/components/carousel';

import { IProductItem } from 'src/types/product';

import ProductItem from './product-item';

type Props = {
  products: IProductItem[];
};

export default function ProductsScroller({ products }: Props) {
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
      <motion.div
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'keyframes', stiffness: 50, duration: 1 }}
      >
        <Box>
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {products.length > 1 &&
              products.map((product, index) => <ProductItem key={index} product={product} />)}
          </Carousel>
        </Box>
      </motion.div>
    </Stack>
  );
}
