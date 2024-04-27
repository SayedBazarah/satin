import Button from '@mui/material/Button';
import { Theme, SxProps } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';


// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  return (
    <Button component={RouterLink} href={paths.auth.login} variant="outlined" sx={{ mr: 1, ...sx }}>
      Login
    </Button>
  );
}
