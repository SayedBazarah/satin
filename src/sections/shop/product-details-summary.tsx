import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import { useRouter } from 'src/locales/navigation';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import FormProvider from 'src/components/hook-form';

import { IProductItem } from 'src/types/product';
import { ICheckoutItem } from 'src/types/checkout';

import IncrementerButton from './common/incrementer-button';

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
  items?: ICheckoutItem[];
  disabledActions?: boolean;
  onGotoStep?: (step: number) => void;
  onAddCart?: (cartItem: ICheckoutItem) => void;
};

export default function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  disabledActions,
  ...other
}: Props) {
  const router = useRouter();

  const t = useTranslations('shop');

  const {
    _id,
    name,
    price,
    images,
    newLabel,
    available,
    priceSale,
    saleLabel,
    totalRatings,
    totalReviews,
    inventoryType,
    subDescription,
  } = product;

  const existProduct = !!items?.length && items.map((item) => item.id).includes(_id);

  const isMaxQuantity =
    !!items?.length &&
    items.filter((item) => item.id === _id).map((item) => item.quantity)[0] >= available;

  const defaultValues = {
    id: _id,
    name,
    coverUrl: images[0],
    available,
    price,
    priceSale: priceSale || 0,
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!existProduct) {
        onAddCart?.({
          ...data,
          subTotal: values.priceSale
            ? values.priceSale * values.quantity
            : values.price * values.quantity,
        });
      }
      onGotoStep?.(0);
      router.push(paths.product.checkout);
    } catch (error) {
      console.error(error);
    }
  });

  const handleAddCart = useCallback(() => {
    try {
      onAddCart?.({
        ...values,
        subTotal: values.priceSale
          ? values.priceSale * values.quantity
          : values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values]);

  const renderPrice = (
    <Box sx={{ typography: 'h5' }}>
      {!priceSale ||
        (priceSale !== 0 && (
          <Box
            component="span"
            sx={{
              color: 'text.disabled',
              textDecoration: 'line-through',
              mr: 0.5,
            }}
          >
            {fCurrency(price)}
          </Box>
        ))}

      {fCurrency((priceSale && priceSale) || price)}
    </Box>
  );

  // const renderShare = (
  //   <Stack direction="row" spacing={3} justifyContent="center">
  //     <Link
  //       variant="subtitle2"
  //       sx={{
  //         color: 'text.secondary',
  //         display: 'inline-flex',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <Iconify icon="mingcute:add-line" width={16} sx={{ mr: 1 }} />
  //       Compare
  //     </Link>

  //     <Link
  //       variant="subtitle2"
  //       sx={{
  //         color: 'text.secondary',
  //         display: 'inline-flex',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <Iconify icon="solar:heart-bold" width={16} sx={{ mr: 1 }} />
  //       Favorite
  //     </Link>

  //     <Link
  //       variant="subtitle2"
  //       sx={{
  //         color: 'text.secondary',
  //         display: 'inline-flex',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <Iconify icon="solar:share-bold" width={16} sx={{ mr: 1 }} />
  //       Share
  //     </Link>
  //   </Stack>
  // );

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        {t('description')}
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
          quantity={values.quantity}
          disabledDecrease={values.quantity <= 1}
          disabledIncrease={values.quantity >= available}
          onIncrease={() => setValue('quantity', values.quantity + 1)}
          onDecrease={() => setValue('quantity', values.quantity - 1)}
        />

        <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          {t('available')}: {available}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        disabled={isMaxQuantity || disabledActions}
        size="large"
        color="primary"
        variant="contained"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        onClick={handleAddCart}
        sx={{ whiteSpace: 'nowrap' }}
      >
        {t('add-to-cart')}
      </Button>

      <Button fullWidth size="large" type="submit" variant="contained" disabled={disabledActions}>
        {t('buy-now')}
      </Button>
    </Stack>
  );

  const renderSubDescription = (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {subDescription}
    </Typography>
  );

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        color: 'text.disabled',
        typography: 'body2',
      }}
    >
      <Rating size="small" value={totalRatings} precision={0.1} readOnly sx={{ mr: 1 }} />
      {`(${fShortenNumber(totalReviews)} ${t('reviews')} )`}
    </Stack>
  );

  const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
    <Stack direction="row" alignItems="center" spacing={1}>
      {newLabel.enabled && <Label color="info">{newLabel.content}</Label>}
      {saleLabel.enabled && <Label color="error">{saleLabel.content}</Label>}
    </Stack>
  );

  const renderInventoryType = (
    <Box
      component="span"
      sx={{
        typography: 'overline',
        color:
          (inventoryType === 'out of stock' && 'error.main') ||
          (inventoryType === 'low stock' && 'warning.main') ||
          'success.main',
      }}
    >
      {inventoryType}
    </Box>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {renderLabels}

          {renderInventoryType}

          <Typography variant="h5">{name}</Typography>

          {renderRating}

          {renderPrice}

          {renderSubDescription}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderQuantity}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderActions}

        {/* {renderShare} */}
      </Stack>
    </FormProvider>
  );
}
