import React from 'react';

import { Box, Typography } from '@mui/material';

export default function SectionTitle({ title }: { title: string }) {
  return (
    <Box
      sx={{
        width: 'fit-content',
        position: 'relative',
        '&::after': {
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
  );
}
