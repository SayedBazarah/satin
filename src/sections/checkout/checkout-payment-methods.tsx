import { useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';
import Paper, { PaperProps } from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';

import { ICheckoutCardOption, ICheckoutPaymentOption } from 'src/types/checkout';

import PaymentNewCardDialog from './payment-new-card-dialog';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  options: ICheckoutPaymentOption[];
  cardOptions?: ICheckoutCardOption[];
}

export default function CheckoutPaymentMethods({ options, cardOptions, ...other }: Props) {
  const { control } = useFormContext();

  const t = useTranslations('checkout');

  const newCard = useBoolean();

  return (
    <>
      <Card {...other}>
        <CardHeader title={t('payment')} />

        <Controller
          name="payment"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Stack sx={{ px: 3, pb: 3 }}>
              {options.map((option) => (
                <OptionItem
                  option={option}
                  key={option.label}
                  onOpen={newCard.onTrue}
                  selected={field.value === option.value}
                  isCredit={option.value === 'credit' && field.value === 'credit'}
                  onClick={() => {
                    field.onChange(option.value);
                  }}
                />
              ))}

              {!!error && (
                <FormHelperText error sx={{ pt: 1, px: 2 }}>
                  {error.message}
                </FormHelperText>
              )}
            </Stack>
          )}
        />
      </Card>

      <PaymentNewCardDialog open={newCard.value} onClose={newCard.onFalse} />
    </>
  );
}

// ----------------------------------------------------------------------

type OptionItemProps = PaperProps & {
  option: ICheckoutPaymentOption;
  selected: boolean;
  isCredit: boolean;
  onOpen: VoidFunction;
};

function OptionItem({ option, selected, isCredit, onOpen, ...other }: OptionItemProps) {
  const { value, label, description } = option;

  return (
    <Paper
      variant="outlined"
      key={value}
      sx={{
        p: 2.5,
        mt: 2.5,
        cursor: 'pointer',
        ...(selected && {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
        }),
      }}
      {...other}
    >
      <ListItemText
        primary={
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ flexGrow: 1 }}>
              {label}
            </Box>
            <Stack spacing={1} direction="row" alignItems="center">
              {value === 'credit' && (
                <>
                  <Iconify icon="logos:mastercard" width={24} />,
                  <Iconify icon="logos:visa" width={24} />
                </>
              )}
              {value === 'paypal' && <Iconify icon="logos:paypal" width={24} />}
              {value === 'cash' && <Iconify icon="solar:wad-of-money-bold" width={32} />}
            </Stack>
          </Stack>
        }
        secondary={description}
        primaryTypographyProps={{ typography: 'subtitle1', mb: 0.5 }}
        secondaryTypographyProps={{ typography: 'body2' }}
      />
    </Paper>
  );
}
