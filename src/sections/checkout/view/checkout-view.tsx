'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import { PRODUCT_CHECKOUT_STEPS } from 'src/_mock/_product';

import { useTranslations } from 'next-intl';

import { useSettingsContext } from 'src/components/settings';

import CheckoutCart from '../checkout-cart';
import CheckoutSteps from '../checkout-steps';
import { useCheckoutContext } from '../context';
import CheckoutPayment from '../checkout-payment';
import CheckoutOrderComplete from '../checkout-order-complete';
import CheckoutBillingAddress from '../checkout-billing-address';

// ----------------------------------------------------------------------

export default function CheckoutView() {
  const settings = useSettingsContext();

  const t = useTranslations('checkout');

  const checkout = useCheckoutContext();

  const PRODUCT_CHECKOUT_STEPS = [t('cart'), t('billing-address'), t('shipping')];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 10 }}>
      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        {t('root')}
      </Typography>

      <Grid container justifyContent={checkout.completed ? 'center' : 'flex-start'}>
        <Grid xs={12}>
          <CheckoutSteps activeStep={checkout.activeStep} steps={PRODUCT_CHECKOUT_STEPS} />
        </Grid>
      </Grid>

      {checkout.completed ? (
        <CheckoutOrderComplete
          open={checkout.completed}
          onReset={checkout.onReset}
          onDownloadPDF={() => {}}
        />
      ) : (
        <>
          {checkout.activeStep === 0 && <CheckoutCart />}

          {checkout.activeStep === 1 && <CheckoutBillingAddress />}

          {checkout.activeStep === 2 && <CheckoutPayment />}
        </>
      )}
    </Container>
  );
}
