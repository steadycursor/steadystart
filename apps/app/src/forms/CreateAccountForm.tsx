import { useForm } from '../hooks/useForm';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAccountSchema } from '@steadysass/validations';
import { useMutation } from 'urql';
import { mutation, $ } from '@/generated/typed-graphql-builder';
import { TextField } from '@/components/TextField';
import { SubmitButton } from '@/components/SubmitButton';

type FormValues = z.infer<typeof createAccountSchema>;

export function CreateAccountForm() {
  const [createAccountMutation, createAccount] = useMutation(
    mutation((mutation) => [mutation.createAccount({ name: $('name') }, (account) => [account.id])]),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(createAccountSchema),
    onSubmit: async (data) => {
      await createAccount(data);
    },
  });

  return (
    <form.Form>
      <TextField register={form.register('name')} label={{ title: 'Name' }} />
      <SubmitButton isDisabled={createAccountMutation.fetching} />
    </form.Form>
  );
}
