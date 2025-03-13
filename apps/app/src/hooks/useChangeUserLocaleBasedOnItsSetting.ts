import { useEffect } from 'react';
import { useQuery } from 'urql';
import { useTranslation } from './useTranslation';
import { query } from '@/generated/typed-graphql-builder';

export const useChangeUserLocaleBasedOnItsSetting = () => {
  const { lang, setLanguage } = useTranslation();

  const [meQuery] = useQuery({ query: query((query) => [query.me((me) => [me.locale])]) });

  useEffect(() => {
    if (!meQuery.data?.me.locale) {
      return;
    }

    if (lang === meQuery.data.me.locale) {
      return;
    }

    setLanguage(meQuery.data.me.locale.toLowerCase());
  }, [meQuery.data?.me.locale, lang, setLanguage]);
};
