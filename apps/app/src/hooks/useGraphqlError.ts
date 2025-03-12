import { useTranslation } from './useTranslation';
import { CombinedError } from 'urql';
import { errors, ErrorMessage } from '@steadystart/errors';

export type UseGraphqlErrorPayload = (error: Pick<CombinedError, 'message'>) => string | null;

export const useGraphqlError = (): UseGraphqlErrorPayload => {
  const { t } = useTranslation();

  return (error) => {
    if (!error) {
      return null;
    }

    const message = error.message.replace('[GraphQL] ', '');

    if (errors.includes(message as unknown as ErrorMessage)) {
      return t(`errors:${message}`);
    }

    return t('errors:DEFAULT_ERROR');
  };
};
