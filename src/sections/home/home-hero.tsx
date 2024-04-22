import { Box, Button, Grid, Paper, Stack } from '@mui/material';
import { m as motion, LazyMotion, domAnimation } from 'framer-motion';

import Image from 'src/components/image';
import HeroCarousel from './hero-carousel';
import { useResponsive } from 'src/hooks/use-responsive';

const DATA = {
  products: [
    {
      title: 'Top quality seafood from Royal Blue',
      label: ['NEW PRODUCT'],
      category: 'Seafood',
      name: ' Royal Blue Medium Shrimp',
      image: 'http://localhost:3000/media/images/resourses/hero.jpg',
      coverImage: 'http://localhost:3000/media/images/resourses/cover.jpg',
    },
  ],
  tags: [
    {
      slug: 'fresh-fish',
      coverImage: 'http://localhost:3000/media/images/resourses/hero.jpg',
    },
    {
      slug: 'fresh-meat',
      coverImage: 'http://localhost:3000/media/images/resourses/cover.jpg',
    },
  ],
};

export default function HomeHero() {
  const md = useResponsive('up', 'md');

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <HeroCarousel />
        </Grid>
        <Grid item xs={4}>
          {md && (
            <Paper>
              <RenderTags tags={DATA.tags} />
            </Paper>
          )}
        </Grid>
      </Grid>
    </>
  );
}

function RenderTags({ tags }: { tags: { slug: string; coverImage: string }[] }) {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ x: '100vw' }} // Start position (off-screen to the right)
        animate={{ x: 0 }} // End position (move to the center)
        transition={{ type: 'tween', stiffness: 50, duration: 1 }} // Animation transition
      >
        <Stack spacing={2}>
          {tags.map((item, key) => (
            <Box sx={{ position: 'relative' }}>
              <Image
                key={key}
                src={item.coverImage}
                sx={{
                  height: '190px',
                  width: '100%',
                  borderRadius: '8px',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '10%',
                  left: '0',
                  right: '0',
                  display: 'flex',
                  justifyContent: 'center',
                  color: 'white',
                  zIndex: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '140px',
                  }}
                  href={`/tags/${item.slug}`}
                >
                  SHOP NOW
                </Button>
              </Box>
            </Box>
          ))}
        </Stack>
      </motion.div>
    </LazyMotion>
  );
}
