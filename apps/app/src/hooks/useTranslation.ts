import setLanguage from 'next-translate/setLanguage';
import nextTranslateUseTranslation from 'next-translate/useTranslation';

export const useTranslation = () => {
  const { t, lang } = nextTranslateUseTranslation();

  return {
    t,
    lang,
    setLanguage,
  };
};
