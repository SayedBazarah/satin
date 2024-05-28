import { LazyMotion, m as motion, domAnimation } from 'framer-motion';

import { Box, Grid, Stack } from '@mui/material';

import { paths } from 'src/routes/paths';

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
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        {categories[0]?.products[0] && <HeroCarousel product={categories[0].products[0]} />}
      </Grid>
      <Grid item xs={4}>
        {md && <RenderCategory tags={categories.slice(0, 2)} />}
      </Grid>
    </Grid>
  );
}

function RenderCategory({ tags }: { tags: { slug: string; coverImage: string }[] }) {
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
              href={paths.category.single(item.slug)}
            >
              <Image
                src={item.coverImage}
                sx={{
                  height: '190px',
                  width: '100%',
                  borderRadius: '8px',
                }}
              />
            </Box>
          ))}
        </Stack>
      </motion.div>
    </LazyMotion>
  );
}
