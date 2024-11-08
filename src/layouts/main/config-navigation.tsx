import { useTranslations } from 'next-intl';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const NavConfig = () => {
  const t = useTranslations('header');

  return [
    {
      title: t('home'),
      icon: <Iconify icon="solar:home-2-bold-duotone" />,
      path: '/',
    },
    {
      title: t('shop'),
      icon: <Iconify icon="solar:atom-bold-duotone" />,
      path: paths.shop,
    },
    {
      title: t('categories'),
      path: paths.categories,
      icon: <Iconify icon="solar:file-bold-duotone" />,
    },
    {
      title: t('wholesale'),
      path: paths.wholesale,
      icon: <Iconify icon="solar:file-bold-duotone" />,
    },

    // {
    //   title: 'Tags',
    //   path: paths.tags,
    //   icon: <Iconify icon="solar:file-bold-duotone" />,
    //   children: [
    //     {
    //       subheader: 'Daily Used',
    //       items: [
    //         { title: 'Bakery', path: paths.tag.single('bakery') },
    //         { title: 'Fruits & Vegetables', path: paths.tag.single('fruits-vegetables') },
    //         { title: 'Frozen Food ', path: paths.faqs },
    //         { title: 'Grocery', path: paths.about },
    //       ],
    //     },
    //     {
    //       subheader: 'Household',
    //       items: [
    //         { title: 'Laundry', path: paths.shop },
    //         { title: 'Dishwishing', path: paths.shop },
    //         { title: 'Cleaning Products', path: paths.shop },
    //         { title: 'Cleaning Accessories', path: paths.shop },
    //       ],
    //     },

    //     {
    //       subheader: 'Best Offers',
    //       items: [{ title: 'Nike Air Force', path: PATH_AFTER_LOGIN }],
    //     },
    //   ],
    // },
  ];
};
