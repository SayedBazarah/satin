'use client';

import { useTranslations } from 'next-intl';

import { Stack, Container, Typography } from '@mui/material';

import MainLayout from 'src/layouts/main';
import ContactForm from 'src/layouts/common/contact-form';

import BriefBox from '../brief-box';
import HeroTextOverImage from '../hero-text-over-image';

export default function WholesaleView() {
  const t = useTranslations('landing');

  return (
    <MainLayout>
      <HeroTextOverImage withAction={false} />
      <Container>
        <Stack spacing="100px" mt="100px">
          <BriefBox
            dir="reverse"
            title={t('brand-brief.title')}
            coverImage="/assets/images/home/brand.jpg"
            description={
              <>
                <Typography>{t('brand-brief.brief-1')}</Typography>
                <Typography>{t('brand-brief.brief-2')}</Typography>
                <Typography>{t('brand-brief.brief-3')}</Typography>
              </>
            }
          />
          <ContactForm />
        </Stack>
      </Container>
    </MainLayout>
  );
}
