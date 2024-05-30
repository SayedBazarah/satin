import { useTranslations } from 'use-intl';

import Stack from '@mui/material/Stack';
import { Box, Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { Link } from 'src/locales/navigation';

import Image from 'src/components/image/image';

import { ICategory } from 'src/types/product';

type Props = {
  categories: ICategory[];
};
export default function Categories({ categories }: Props) {
  const t = useTranslations('landing');

  const renderCategories = (
    <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
      {categories.map((category, index) => (
        <CategoryItem key={index} category={category} />
      ))}
    </Stack>
  );

  return (
    <Stack spacing={4} direction="column">
      <Typography variant="h3" mx={3} textAlign="center">
        {t('categories-view-title')}
      </Typography>
      {renderCategories}
    </Stack>
  );
}

function CategoryItem({ category }: { category: ICategory }) {
  return (
    <Box
      component={Link}
      href={paths.category.single(category.slug)}
      sx={{ textDecoration: 'none', color: 'GrayText' }}
    >
      <Stack
        sx={{
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {(category.icon && (
          <Box
            component={Image}
            src={category.icon}
            sx={{ width: '156px', height: '156px', borderRadius: '8px' }}
          />
        )) || <Avatar title={category.title} />}
        <Typography>{category.title}</Typography>
      </Stack>
    </Box>
  );
}
