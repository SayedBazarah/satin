import { LazyMotion, m as motion, domAnimation } from 'framer-motion';

import { Box, Grid, Paper, Stack } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { Link } from 'src/locales/navigation';

import Image from 'src/components/image';

import { ICategory } from 'src/types/product';

import HeroCarousel from './hero-carousel';

type Props = {
  categories: ICategory[];
};
export default function HomeHero({ categories }: Props) {
  const md = useResponsive('up', 'md');

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={8}>
        <HeroCarousel products={(categories.length > 0 && categories[0].products) || []} />
      </Grid>
      <Grid item xs={4}>
        {md && (
          <Paper>
            <RenderTags tags={categories.slice(0, 2)} />
          </Paper>
        )}
      </Grid>
    </Grid>
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
          {tags.map((item, index) => (
            <Box
              key={index}
              sx={{ position: 'relative' }}
              component={Link}
              href={`/categories/${item.slug}`}
            >
              <Image
                src={item.coverImage}
                sx={{
                  height: '190px',
                  width: '100%',
                  borderRadius: '8px',
                }}
              />
              {/* <Box
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
                    color: 'primary.main',
                    backgroundColor: 'white',
                  }}
                  href={`/tags/${item.slug}`}
                >
                  SHOP NOW
                </Button>
              </Box> */}
            </Box>
          ))}
        </Stack>
      </motion.div>
    </LazyMotion>
  );
}
