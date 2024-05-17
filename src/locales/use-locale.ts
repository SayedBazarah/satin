import { useCallback } from 'react';
import { usePathname } from 'next/navigation';

import { useSettingsContext } from 'src/components/settings';

import { useRouter } from './navigation';

export const allLangs = [
  {
    label: 'Arabic',
    value: 'ar',
    icon: 'flagpack:eg',
  },
  {
    label: 'English',
    value: 'en',
    icon: 'flagpack:gb-nir',
  },
];

export const useLocale = () => {
  const router = useRouter();

  const pathname = usePathname();

  const settings = useSettingsContext();

  const currentLang =
    allLangs.find((lang) => lang.value === ((pathname.includes('en') && 'en') || 'ar')) ||
    allLangs[0];

  const changeLang = useCallback(
    (newLang: string) => {
      router.replace(pathname.replace(/en|ar/, ''), {
        locale: newLang,
      });

      // axios.defaults.headers.common.locale = newLang;

      settings.onChangeDirectionByLang(newLang);
    },
    [pathname, router, settings]
  );

  return {
    currentLang,
    allLangs,
    changeLang,
  };
};
