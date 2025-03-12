import { useTranslation } from './useTranslation';
import { CombinedError } from 'urql';
import { useGraphqlError } from './useGraphqlError';
import { toast } from './../lib/toast';

type CallbackProps<T> = {
  data?: T;
  error?: Pick<CombinedError, 'message'> | undefined;
};

type UseFormResponseHandlerArgs = {
  onDone?: () => void;
  onError?: () => void;
};

export type UseFormResponseHandlerPayload = <T>(props: CallbackProps<T>) => CallbackProps<T>;

export const useFormResponseHandler = ({ onDone, onError }: UseFormResponseHandlerArgs = {}): UseFormResponseHandlerPayload => {
  const { t } = useTranslation();
  const graphqlError = useGraphqlError();

  return (args) => {
    if (!!args.data) {
      toast.success({ message: t('components:useFormResponseHandler.defaultToastMessages.success') });
      onDone?.();

      return args;
    }

    if (!args.error) {
      return args;
    }

    const errorMessage = graphqlError(args.error);

    if (!errorMessage) {
      return args;
    }

    toast.warning({ message: errorMessage });
    onError?.();

    return args;
  };
};
