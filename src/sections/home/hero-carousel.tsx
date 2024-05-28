import React from 'react';
import { m as motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Box, Card, Paper, Stack, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import { fCurrency } from 'src/utils/format-number';

import { useRouter } from 'src/locales/navigation';

import Label from 'src/components/label';
import Image from 'src/components/image';

import { IProductItem } from 'src/types/product';

import { useCheckoutContext } from '../checkout/context';

type Props = {
  product: IProductItem;
};

export default function HeroCarousel({ product }: Props) {
  const { items, onAddToCart, onGotoStep } = useCheckoutContext();

  const { _id, name, coverUrl, price, subDescription, available, priceSale } = product;

  const md = useResponsive('down', 'md');

  const t = useTranslations();

  const router = useRouter();

  const existProduct = !!items?.length && items.map((item) => item.id).includes(_id);

  const newProduct = {
    id: _id,
    name,
    coverUrl,
    available,
    price,
    priceSale: priceSale || 0,
    quantity: 1,
  };

  const handleAddCart = async () => {
    try {
      onAddToCart(newProduct);
      onGotoStep?.(0);
    } catch (error) {
      console.error(error);
    }
  };
  const handleBuyNow = async () => {
    try {
      if (!existProduct) {
        onAddToCart(newProduct);
      }
      onGotoStep?.(0);
      router.push(paths.product.checkout);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ x: '-100vw' }} // Start position (off-screen to the right)
      animate={{ x: 0 }} // End position (move to the center)
      transition={{ type: 'tween', stiffness: 50, duration: 1 }} // Animation transition
    >
      <Card
        sx={{
          height: (md && 300) || 400,
          position: 'relative',
          textDecoration: 'none',
        }}
      >
        <Image
          src={coverUrl}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        />
        <Paper
          sx={{
            position: 'absolute',
            // backgroundColor: 'transparent',
            backgroundColor: 'black',
            opacity: 0.4,
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <Paper
          sx={{
            position: 'absolute',
            backgroundColor: 'transparent',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            color: 'white',
          }}
        >
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Stack p={2} spacing={1} direction="row">
              {(priceSale !== 0 && (
                <>
                  <Label variant="filled" color="error">
                    <Typography
                      sx={{
                        textDecoration: 'line-through',
                      }}
                    >
                      {fCurrency(price)}
                    </Typography>
                  </Label>
                  <Label variant="filled">
                    <Typography>{fCurrency(priceSale)}</Typography>
                  </Label>
                </>
              )) || (
                <Label variant="filled">
                  <Typography>{fCurrency(price)}</Typography>
                </Label>
              )}
            </Stack>
            <Box alignSelf="center" display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h2">{name}</Typography>
              <Typography variant="caption">{subDescription}</Typography>
              <Stack spacing={2} direction="row" mt={2}>
                <Button variant="contained" color="primary" onClick={handleBuyNow}>
                  {t('shop.buy-now')}
                </Button>
                <Button variant="contained" onClick={handleAddCart}>
                  {t('shop.add-to-cart')}
                </Button>
              </Stack>
            </Box>
            <Box />
          </Stack>
        </Paper>
      </Card>
    </motion.div>
  );
}
