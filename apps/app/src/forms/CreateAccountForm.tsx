import { useForm } from '../hooks/useForm';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAccountSchema } from '@steadystart/validations';
import { useMutation } from 'urql';
import { mutation, $ } from '@/generated/typed-graphql-builder';
import { TextField } from '@/components/TextField';
import { SubmitButton } from '@/components/SubmitButton';
import { useFormResponseHandler } from '@/hooks/useFormResponseHandler';
import { useTranslation } from '@/hooks/useTranslation';
import { useRouter } from 'next/router';
import { routes } from '@steadystart/routes';

type FormValues = z.infer<typeof createAccountSchema>;

export function CreateAccountForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const formResponseHandler = useFormResponseHandler();

  const [createAccountMutation, createAccount] = useMutation(
    mutation((mutation) => [mutation.createAccount({ name: $('name') }, (account) => [account.id])]),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(createAccountSchema),
    onSubmit: async (data) => {
      await createAccount(data)
        .then(formResponseHandler)
        .then((response) => {
          if (!response.data?.createAccount.id) {
            return;
          }

          router.push(routes.accounts.posts.index({ account: response.data.createAccount.id }));
        });
    },
  });

  return (
    <form.Form>
      <TextField register={form.register('name')} label={{ title: t('fields:name') }} />
      <SubmitButton isDisabled={createAccountMutation.fetching} />
    </form.Form>
  );
}
