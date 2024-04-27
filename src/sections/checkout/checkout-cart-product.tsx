import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

import { ICheckoutItem } from 'src/types/checkout';

import IncrementerButton from '../shop/common/incrementer-button';

// ----------------------------------------------------------------------

type Props = {
  row: ICheckoutItem;
  onDelete: VoidFunction;
  onDecrease: VoidFunction;
  onIncrease: VoidFunction;
};

export default function CheckoutCartProduct({ row, onDelete, onDecrease, onIncrease }: Props) {
  const { name, price, priceSale, coverUrl, quantity, available } = row;

  const subTotal = ((priceSale && priceSale) || price) * quantity;
  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Avatar variant="rounded" alt={name} src={coverUrl} sx={{ width: 64, height: 64, mr: 2 }} /> */}
        <Image alt={name} src={coverUrl} sx={{ width: 64, height: 64, mr: 2, borderRadius: 1 }} />

        <Stack spacing={0.5}>
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography
          sx={{
            ...(priceSale && {
              textDecoration: 'line-through',
              color: 'gray',
            }),
          }}
        >
          {fCurrency(price)}
        </Typography>
        <Typography>{fCurrency(priceSale)}</Typography>
      </TableCell>

      <TableCell>
        <Box sx={{ width: 88, textAlign: 'right' }}>
          <IncrementerButton
            quantity={quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={quantity <= 1}
            disabledIncrease={quantity >= available}
          />

          <Typography variant="caption" component="div" sx={{ color: 'text.secondary', mt: 1 }}>
            available: {available}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="right">{fCurrency(subTotal)}</TableCell>

      <TableCell align="right" sx={{ px: 1 }}>
        <IconButton onClick={onDelete}>
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
