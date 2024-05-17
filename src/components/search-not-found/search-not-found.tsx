import { useTranslations } from 'next-intl';

import Typography from '@mui/material/Typography';
import Paper, { PaperProps } from '@mui/material/Paper';

// ----------------------------------------------------------------------

interface Props extends PaperProps {
  query?: string;
}

export default function SearchNotFound({ query, sx, ...other }: Props) {
  const t = useTranslations('common');
  return query ? (
    <Paper
      sx={{
        bgcolor: 'unset',
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" gutterBottom>
        {t('not-found')}
      </Typography>

      <Typography variant="body2">
        {t('no-results')} &nbsp;
        <strong>&quot;{query}&quot;</strong>.
        <br /> {t('try-check')}
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2" sx={sx}>
      {t('enter-key')}
    </Typography>
  );
}
