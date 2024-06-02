import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { paths } from 'src/routes/paths';

import { fCurrency } from 'src/utils/format-number';

import { Link as I18nLink } from 'src/locales/navigation';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

import { IProductItem } from 'src/types/product';

import { useCheckoutContext } from '../checkout/context';

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
};

export default function ProductItem({ product, ...props }: Props) {
  const { onAddToCart } = useCheckoutContext();

  const { _id, name, slug, coverUrl, price, available, priceSale, newLabel, saleLabel } = product;

  const linkTo = paths.product.details(slug);

  const handleAddCart = async () => {
    const newProduct = {
      id: _id,
      name,
      coverUrl,
      available,
      price,
      priceSale: priceSale || 0,
      quantity: 1,
    };
    try {
      onAddToCart(newProduct);
    } catch (error) {
      console.error(error);
    }
  };
  const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ position: 'absolute', zIndex: 9, top: 16, right: 16 }}
    >
      {newLabel.enabled && (
        <Label variant="filled" color="info">
          {newLabel.content}
        </Label>
      )}
      {saleLabel.enabled && (
        <Label variant="filled" color="error">
          {saleLabel.content}
        </Label>
      )}
    </Stack>
  );
  const renderImg = (
    <Box sx={{ position: 'relative', p: 1 }}>
      {!!available && (
        <Fab
          color="primary"
          size="medium"
          className="add-cart-btn"
          onClick={handleAddCart}
          sx={{
            right: 16,
            bottom: 16,
            zIndex: 9,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('all', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Iconify icon="solar:cart-plus-bold" width={24} />
        </Fab>
      )}

      <Tooltip title={!available && 'Out of stock'} placement="bottom-end">
        <Image
          alt={name}
          src={coverUrl}
          ratio="1/1"
          sx={{
            borderRadius: 1.5,
            ...(!available && {
              opacity: 0.48,
              filter: 'grayscale(1)',
            }),
          }}
        />
      </Tooltip>
    </Box>
  );

  const renderContent = (
    <Stack spacing={2.5} p={{ xs: 0, md: 2 }} sx={{ p: 3, pt: 2, textAlign: 'left' }}>
      <Link
        component={I18nLink}
        href={linkTo}
        color="inherit"
        variant="subtitle2"
        sx={{ textWrap: 'nowrap', textAlign: 'right' }}
      >
        {name}
      </Link>

      {(priceSale !== 0 && (
        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
          <Box
            component="span"
            sx={{ width: '100%', color: 'text.disabled', textDecoration: 'line-through' }}
          >
            {fCurrency(price)}
          </Box>
          <Box component="span">{fCurrency(priceSale)}</Box>
        </Stack>
      )) || <Box component="span">{fCurrency(price)}</Box>}
    </Stack>
  );

  return (
    <Card
      sx={{
        my: 2,
        mr: 1,
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      {renderLabels}

      {renderImg}

      {renderContent}
    </Card>
  );
}
