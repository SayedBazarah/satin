import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

import { useCheckoutContext } from './context';
import CheckoutSummary from './checkout-summary';

// ----------------------------------------------------------------------

export default function CheckoutBillingAddress() {
  const checkout = useCheckoutContext();

  const AddressSchema = Yup.object().shape({
    name: Yup.string().required('Fullname is required'),
    address: Yup.string().required('Address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    email: Yup.string(),
  });

  const defaultValues = {
    name: checkout.billing?.name || '',
    address: checkout.billing?.address || '',
    phoneNumber: checkout.billing?.phoneNumber || '',
    email: checkout.billing?.email || '',
  };

  const methods = useForm({
    resolver: yupResolver(AddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    checkout.onCreateBilling(data);
    checkout.onNextStep();
  });
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Grid xs={12} md={8}>
          <Stack spacing={3}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Full Name" />

              <RHFTextField name="phoneNumber" label="Phone Number" />
            </Box>
            <RHFTextField name="email" label="Email" />

            <RHFTextField name="address" label="Address" />
          </Stack>
          <Box mt={2}>
            <Button
              size="small"
              color="inherit"
              onClick={checkout.onBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Back
            </Button>
          </Box>
        </Grid>
        <Grid xs={12} md={4}>
          <CheckoutSummary
            total={checkout.total}
            subTotal={checkout.subTotal}
            discount={checkout.discount}
          />
          <Stack direction="row" justifyContent="space-between">
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Complete Order
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
