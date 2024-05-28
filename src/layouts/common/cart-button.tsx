import React from 'react';

import { Badge, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';

import { Link } from 'src/locales/navigation';

import Iconify from 'src/components/iconify';

type Props = {
  totalItems: number;
};

export default function CartButton({ totalItems }: Props) {
  return (
    <IconButton
      component={Link}
      href={paths.product.checkout}
      sx={{
        borderRadius: 9999,
        display: 'flex',
        cursor: 'pointer',
        color: 'text.primary',
        padding: 2,
        '&:hover': { opacity: 0.72 },
      }}
    >
      <Badge showZero badgeContent={totalItems} color="error" max={99}>
        <Iconify icon="solar:cart-3-bold" width={24} />
      </Badge>
    </IconButton>
  );
}
