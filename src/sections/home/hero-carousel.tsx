import React, { useEffect } from 'react';
import { m as motion } from 'framer-motion';

import { Box, Grid, Paper, Stack, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Carousel, { useCarousel } from 'src/components/carousel';

import { IProductItem } from 'src/types/product';

type Props = {
  products: IProductItem[];
};

export default function HeroCarousel({ products }: Props) {
  const carouselLarge = useCarousel({
    rtl: false,
    autoplay: true, // Enable auto-scroll
    autoplaySpeed: 2000, // Set auto-scroll speed (in milliseconds)
    infinite: true,
  });

  useEffect(() => {
    carouselLarge.onSetNav();
  }, [carouselLarge]);

  return (
    <motion.div
      initial={{ x: '-100vw' }} // Start position (off-screen to the right)
      animate={{ x: 0 }} // End position (move to the center)
      transition={{ type: 'tween', stiffness: 50, duration: 1 }} // Animation transition
    >
      <Carousel {...carouselLarge.carouselSettings} ref={carouselLarge.carouselRef}>
        {products.map((product, index) => (
          <SliderItem key={index} product={product} />
        ))}
      </Carousel>
    </motion.div>
  );
}

const SliderItem = ({ product }: { product: IProductItem }) => {
  console.log('product');
  console.log(product.category);
  return (
    <Box component={RouterLink} href={`/shop/${product.slug}`} sx={{ textDecoration: 'none' }}>
      <Grid container spacing={2} px="10px">
        <Grid item xs={6}>
          <Paper>
            <Stack height={400} justifyContent="space-between">
              <Box mb={3}>
                <Label variant="filled">{product.saleLabel && product.saleLabel.content}</Label>
                <Typography fontWeight={700} fontSize={26}>
                  {product.name}
                </Typography>
              </Box>
              <Typography variant="caption" color="primary.main">
                Category:
              </Typography>
              <Typography variant="button" fontWeight={700}>
                {product.description}
              </Typography>
              <Image
                src={product.coverUrl}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Image
              src={product.coverUrl}
              sx={{
                height: '400px',
                width: '100%',
                borderRadius: '8px',
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
