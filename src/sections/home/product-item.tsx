import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { paths } from 'src/routes/paths';

import { fCurrency } from 'src/utils/format-number';

import { Link as RouterLink } from 'src/locales/navigation';

import Label from 'src/components/label';
import Image from 'src/components/image';

import { IProductItem } from 'src/types/product';

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
};

export default function ProductItem({ product, ...props }: Props) {
  // const { onAddToCart } = useCheckoutContext();

  const { name, slug, coverUrl, price, available, priceSale, newLabel, saleLabel } = product;

  const linkTo = paths.product.details(slug);

  // // const handleAddCart = async () => {
  //   const newProduct = {
  //     id,
  //     name,
  //     coverUrl,
  //     available,
  //     price,
  //     colors:  colors && [colors[0]] || [],
  //     size: sizes && [0] || [],
  //     quantity: 1,
  //   };
  //   try {
  //     onAddToCart(newProduct);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
    <Tooltip title={!available && 'Out of stock'} placement="bottom-end">
      <Image
        alt={name}
        src={coverUrl}
        ratio="1/1"
        sx={{
          borderTopLeftRadius: 1.5,
          borderTopRightRadius: 1.5,
          ...(!available && {
            opacity: 0.48,
            filter: 'grayscale(1)',
          }),
        }}
      />
    </Tooltip>
  );

  const renderContent = (
    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
      <Link component={RouterLink} href={linkTo} color="inherit" variant="subtitle2" noWrap>
        {name}
      </Link>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
          {priceSale !== 0 && (
            <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
              {fCurrency(priceSale)}
            </Box>
          )}

          <Box component="span">{fCurrency(price)}</Box>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Card
      sx={{
        mx: '5px',
        mb: 2,
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
