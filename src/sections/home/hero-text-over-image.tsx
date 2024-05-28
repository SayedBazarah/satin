import { useTranslations } from 'next-intl';

import Box from '@mui/material/Box';
import { Stack, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { Link } from 'src/locales/navigation';

import Image from 'src/components/image';

type Props = {
  withAction?: boolean;
};
export default function HeroTextOverImage({ withAction = true }: Props) {
  const t = useTranslations('landing');

  return (
    <Box sx={{ position: 'relative', height: 400 }}>
      <Box
        component={Image}
        src="/assets/background/hero.jpg"
        sx={{
          width: '100%',
          height: '100%',
          filter: 'brightness(0.3)',
        }}
      />
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          width: '100%',
          maxWidth: 480,
        }}
        spacing={2}
      >
        <Typography variant="h1">{t('title')}</Typography>
        <Typography variant="subtitle2" px={2}>
          {t('sub-title')}
        </Typography>
        {withAction && (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              LinkComponent={Link}
              href={paths.shop}
              sx={{ width: '120px' }}
            >
              {t('shop-now')}
            </Button>
            <Button
              variant="outlined"
              LinkComponent={Link}
              href={paths.shop}
              sx={{ background: 'white', color: 'GrayText' }}
            >
              {t('wholesale')}
            </Button>
          </Stack>
        )}
        <Typography variant="caption">{t('trusted')}</Typography>
      </Stack>
    </Box>
  );
}
