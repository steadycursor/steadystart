import { errors, ErrorMessage } from '@steadystart/errors';
import { CombinedError } from 'urql';
import { useTranslation } from './useTranslation';

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
