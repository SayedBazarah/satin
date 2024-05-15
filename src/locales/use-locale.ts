import { useCallback } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { getStorage, setStorage } from 'src/hooks/use-local-storage';
import { localStorageGetItem } from 'src/utils/storage-available';

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    icon: 'flagpack:gb-nir',
  },

  {
    label: 'Arabic',
    value: 'ar',
    icon: 'flagpack:eg',
  },
];

const NEXT_LOCALE = 'NEXT_LOCALE';

export const useLocale = () => {
  const settings = useSettingsContext();

  const locale = getStorage(NEXT_LOCALE);

  const currentLang = allLangs.find((lang) => lang.value === locale) || allLangs[0];

  const changeLang = useCallback(() => {
    const newLang = (currentLang.value === 'ar' && 'en') || 'ar';

    setStorage(NEXT_LOCALE, newLang);

    settings.onChangeDirectionByLang(newLang);
  }, [settings, setStorage]);

  return {
    currentLang,
    allLangs,
    changeLang,
  };
};

export const changeLange = () => {
  const settings = useSettingsContext();
  settings.onChangeDirectionByLang('en');
};
