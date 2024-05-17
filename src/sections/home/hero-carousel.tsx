import React, { useEffect } from 'react';
import { m as motion } from 'framer-motion';

import { Box, Card, Paper, Stack, Button, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { fCurrency } from 'src/utils/format-number';

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
  const md = useResponsive('down', 'md');

  useEffect(() => {
    carouselLarge.onSetNav();
  }, [carouselLarge]);
  console.log(products);
  return (
    <motion.div
      initial={{ x: '-100vw' }} // Start position (off-screen to the right)
      animate={{ x: 0 }} // End position (move to the center)
      transition={{ type: 'tween', stiffness: 50, duration: 1 }} // Animation transition
    >
      <Carousel {...carouselLarge.carouselSettings} ref={carouselLarge.carouselRef}>
        {products.map((product, index) => (
          <Card
            component={RouterLink}
            href={`/shop/${product.slug}`}
            sx={{ height: (md && 300) || 400, position: 'relative', textDecoration: 'none' }}
          >
            <SliderItem key={index} product={product} />
          </Card>
        ))}
      </Carousel>
    </motion.div>
  );
}

const SliderItem = ({ product }: { product: IProductItem }) => (
  <>
    <Image
      src={product.coverUrl}
      sx={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: '8px',
        cursor: 'pointer',
      }}
    />
    <Paper
      sx={{
        position: 'absolute',
        // backgroundColor: 'transparent',
        backgroundColor: 'black',
        opacity: 0.4,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
     />
    <Paper
      sx={{
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        color: 'white',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Stack p={2} spacing={1} direction="row">
          {(product.priceSale !== 0 && (
            <>
              <Label variant="filled" color="error">
                <Typography
                  sx={{
                    textDecoration: 'line-through',
                  }}
                >
                  {fCurrency(product.price)}
                </Typography>
              </Label>
              <Label variant="filled">
                <Typography>{fCurrency(product.priceSale)}</Typography>
              </Label>
            </>
          )) || (
            <Label variant="filled">
              <Typography>{fCurrency(product.price)}</Typography>
            </Label>
          )}
        </Stack>
        <Box alignSelf="center" display="flex" flexDirection="column" alignItems="center">
          <Typography fontWeight={700} variant="h2">
            {product.name}
          </Typography>
          <Button variant="contained">شراء الان</Button>
        </Box>
        <Box />
      </Stack>
    </Paper>
  </>
);
