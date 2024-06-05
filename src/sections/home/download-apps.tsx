'use client';
import React, { useEffect, useState } from 'react';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Image from 'src/components/image';

export default function DownloadTheApp() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      setDeferredPrompt(null);
    });
  }, []);

  const onInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
    }
  };
  return (
    <Grid
      container
      direction="row"
      gridColumn={2}
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'primary.main',
        minHeight: '250px',
        borderRadius: '32px',
        p: '10%',
        color: 'white',
        gap: 2,
      }}
    >
      <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
        <Image src="/assets/images/home/app_store.avif" />
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        <Typography variant="h4" textAlign="center" mb={2}>
          قم بتنزيل التطبيق لتتسوق منتجاتنا الفاخرة بسهولة
        </Typography>
        <Button
          onClick={onInstallClick}
          variant="contained"
          size="large"
          sx={{ backgroundColor: 'black' }}
        >
          قم بتنزيل التطبيق
        </Button>
      </Grid>
    </Grid>
  );
}
