import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';

import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';
import { Box, Container, Typography } from '@mui/material';

import axios, { endpoints } from 'src/utils/axios';

import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

export default function ContactForm() {
  const t = useTranslations('landing');

  const [formSuccess, setFormSucess] = useState(false);
  const [isError, setError] = useState(false);

  const formSchema = Yup.object().shape({
    name: Yup.string().required(t('yup.name-require')),
    email: Yup.string().required(t('yup.email-require')),
    phone: Yup.string().required(t('yup.phone-require')),
    business: Yup.string(),
    address: Yup.string().required(t('yup.address-require')),
    message: Yup.string().required(t('yup.message')),
  });

  const methods = useForm({
    resolver: yupResolver(formSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post(endpoints.wholesale, data);
      setFormSucess(true);
    } catch (error) {
      console.error(error);
      setFormSucess(false);
      setError(true);
    }
  });

  return (
    <Container sx={{ backgroundColor: 'primary.main', p: 3, borderRadius: '32px' }}>
      <Grid container rowGap={3} justifyContent="space-between">
        <Grid item xs={12} md={5} color="white" mt={{ xs: 0, md: (formSuccess && 5) || 0 }}>
          <Typography variant="h4">{t('join')}</Typography>
          <Typography variant="h4">{t('partner')}</Typography>
          <Typography variant="caption">{t('trusted')}</Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ backgroundColor: 'white', p: 3, borderRadius: '32px' }}>
          {!isError && (
            <Typography my={2} textAlign="center" color="error.main">
              {t('yup.error')}
            </Typography>
          )}
          {(formSuccess && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Typography>{t('yup.sucess')}</Typography>
            </Box>
          )) || (
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <RHFTextField name="name" label={t('yup.name')} variant="filled" />
                </Grid>
                <Grid item xs={6}>
                  <RHFTextField name="email" label={t('yup.email')} variant="filled" />
                </Grid>
                <Grid item xs={6}>
                  <RHFTextField name="phone" label={t('yup.phone')} variant="filled" />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField name="business" label={t('yup.business-name')} variant="filled" />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField name="address" label={t('yup.address')} variant="filled" />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    name="message"
                    label={t('yup.message')}
                    rows={10}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {t('yup.submit')}
                  </LoadingButton>
                </Grid>
              </Grid>
            </FormProvider>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
