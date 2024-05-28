import React, { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image/image';

type Props = {
  title: string;
  description: ReactNode;
  coverImage: string;
  dir?: 'default' | 'reverse';
};

export default function BriefBox({ title, description, dir = 'default', coverImage }: Props) {
  return (
    <Grid
      container
      direction={(dir === 'default' && 'row') || 'row-reverse'}
      sx={{
        backgroundColor: 'primary.lighter',
        justifyContent: 'space-between',
        borderRadius: '32px',
      }}
    >
      <Grid item xs={12} md={5} p={2}>
        <Box
          component={Image}
          src={coverImage}
          maxHeight={{ xs: 300, md: '100%' }}
          sx={{ width: '100%', height: '100%', borderRadius: '32px' }}
        />
      </Grid>
      <Grid item xs={12} md={7} alignSelf="center" p={{ xs: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h5" color="primary.main" mb={2}>
            {title}
          </Typography>
          {description}
        </Stack>
      </Grid>
    </Grid>
  );
}
