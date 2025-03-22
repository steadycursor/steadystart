import { TranslationQuery } from 'next-translate';
// eslint-disable-next-line no-restricted-imports
import setLanguage from 'next-translate/setLanguage';
// eslint-disable-next-line no-restricted-imports
import nextTranslateUseTranslation from 'next-translate/useTranslation';

export const useTranslation = () => {
  const { t, lang } = nextTranslateUseTranslation();

  return {
    t: (key: string, query?: TranslationQuery | null) => t(key, query) as string,
    lang,
    setLanguage,
  };
};
