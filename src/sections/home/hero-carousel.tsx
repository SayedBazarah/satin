import React, { useEffect } from 'react';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { m as motion, LazyMotion, domAnimation } from 'framer-motion';
import Label from 'src/components/label';
import Image from 'src/components/image';
import Carousel, { useCarousel } from 'src/components/carousel';

export default function HeroCarousel() {
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
        <SliderItem />
        <SliderItem />
        <SliderItem />
      </Carousel>
    </motion.div>
  );
}

const SliderItem = () => (
  <Grid container spacing={2} px="10px">
    <Grid item xs={6}>
      <Paper>
        <Stack height={400} justifyContent="space-between">
          <Box mb={3}>
            <Label variant="filled">NEW PRODUCT</Label>
            <Typography fontWeight={700} fontSize={26}>
              Top quality seafood from Royal Blue
            </Typography>
          </Box>
          <Typography variant="caption" color="primary.main">
            Category: Seafood
          </Typography>
          <Typography variant="button" fontWeight={700}>
            Royal Blue Medium Shrimp
          </Typography>
          <Image
            src="http://localhost:3000/media/images/resourses/hero.jpg"
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
          src="http://localhost:3000/media/images/resourses/cover.jpg"
          sx={{
            height: '400px',
            width: '100%',
            borderRadius: '8px',
          }}
        />
      </Paper>
    </Grid>
  </Grid>
);
