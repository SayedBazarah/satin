'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { Stack, Container, Typography } from '@mui/material';

import MainLayout from 'src/layouts/main';
import { useGetLandingPage } from 'src/api/product';
import ContactForm from 'src/layouts/common/contact-form';

import BriefBox from '../brief-box';
import Categories from '../categories-row';
import ProductsScroller from '../products-scroller';
import HeroTextOverImage from '../hero-text-over-image';

export default function HomeView() {
  const { categories, bestSelling } = useGetLandingPage();

  const t = useTranslations('landing');

  return (
    <MainLayout>
      <HeroTextOverImage />
      <Container>
        <Stack spacing="50px" my="50px">
          <Categories categories={categories.slice(0, 5)} />
          <BriefBox
            title={t('satin-brief.title')}
            coverImage="/assets/images/home/satin.jpg"
            description={
              <>
                <Typography>{t('satin-brief.brief-1')}</Typography>
                <Typography>{t('satin-brief.brief-2')}</Typography>
                <Typography>{t('satin-brief.brief-3')}</Typography>
              </>
            }
          />
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
          <ProductsScroller products={bestSelling} title={t('new-products')} />
          <ProductsScroller products={bestSelling} title={t('best-selling')} />
          <ContactForm />
        </Stack>
      </Container>
    </MainLayout>
  );
}
