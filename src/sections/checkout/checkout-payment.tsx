import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import axios, { endpoints } from 'src/utils/axios';

import Iconify from 'src/components/iconify';
import FormProvider from 'src/components/hook-form';

import { ICheckoutPaymentOption, ICheckoutDeliveryOption } from 'src/types/checkout';

import { useCheckoutContext } from './context';
import CheckoutSummary from './checkout-summary';
import CheckoutDelivery from './checkout-delivery';
import CheckoutBillingInfo from './checkout-billing-info';
import CheckoutPaymentMethods from './checkout-payment-methods';

// ----------------------------------------------------------------------

export default function CheckoutPayment() {
  const checkout = useCheckoutContext();

  const t = useTranslations('checkout');

  const DELIVERY_OPTIONS: ICheckoutDeliveryOption[] = [
    {
      value: 50,
      label: t('delivery-option.postal'),
      description: t('delivery-option.postal-details'),
    },
  ];

  const PAYMENT_OPTIONS: ICheckoutPaymentOption[] = [
    {
      value: 'cash',
      label: t('cash'),
      description: t('cash-delivery'),
    },
  ];

  const PaymentSchema = Yup.object().shape({
    payment: Yup.string().required('Payment is required'),
  });

  const defaultValues = {
    delivery: checkout.shipping,
    payment: 'cash',
  };

  const methods = useForm({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const order = {
        shipping: checkout.shipping,
        discount: checkout.discount,
        subTotal: checkout.subTotal,
        totalAmount: checkout.total,
        items: checkout.items,
        billing: checkout.billing,
        payment: data.payment,
      };
      await axios.post(endpoints.order.create, order);
      checkout.onNextStep();
      checkout.onReset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <CheckoutDelivery onApplyShipping={checkout.onApplyShipping} options={DELIVERY_OPTIONS} />

          <CheckoutPaymentMethods options={PAYMENT_OPTIONS} sx={{ my: 3 }} />

          <Button
            size="small"
            color="inherit"
            onClick={checkout.onBackStep}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            {t('back')}
          </Button>
        </Grid>

        <Grid xs={12} md={4}>
          <CheckoutBillingInfo billing={checkout.billing} onBackStep={checkout.onBackStep} />

          <CheckoutSummary
            total={checkout.total}
            subTotal={checkout.subTotal}
            discount={checkout.discount}
            shipping={checkout.shipping}
            onEdit={() => checkout.onGotoStep(0)}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {t('complete')}
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
