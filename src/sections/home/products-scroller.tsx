import React from 'react';
import { m as motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';

import { useResponsive } from 'src/hooks/use-responsive';

import Carousel, { useCarousel } from 'src/components/carousel';

import { IProductItem } from 'src/types/product';

import ProductItem from './product-item';

type Props = {
  products: IProductItem[];
  title: string;
};

export default function ProductsScroller({ title, products }: Props) {
  const md = useResponsive('up', 'md');

  const isArabic = usePathname().includes('/ar/');
  console.log(isArabic);

  const carousel = useCarousel({
    rtl: (isArabic && true) || false,
    rows: 1, // Display only one row
    slidesToShow: (md && 4) || 2,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  return (
    <Stack>
      <Box
        fontWeight="200"
        display="flex"
        gap="5px"
        position="relative"
        fontSize={{ xs: 32, md: 38 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'primary.main',
        }}
      >
        <Box fontWeight="700">{title.split(' ')[0]}</Box>
        {title.split(' ').splice(1).join(' ')}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 10,
            zIndex: -1,
          }}
        >
          <Box sx={{ height: '20px', width: '200px', backgroundColor: 'primary.lighter' }} />
        </Box>
      </Box>
      <motion.div
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'keyframes', stiffness: 50, duration: 1 }}
      >
        {products.length > 1 &&
          ((
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {products.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))}
            </Carousel>
          ) || <ProductItem product={products[0]} />)}
      </motion.div>
    </Stack>
  );
}
