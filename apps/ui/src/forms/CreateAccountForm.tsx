import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAccountSchema } from '@steadysass/validations';
import { useMutation } from 'urql';
import { mutation, $ } from '@/generated/typed-graphql-builder';

type FormValues = z.infer<typeof createAccountSchema>;

export function CreateAccountForm() {
  const [createAccountMutation, createAccount] = useMutation(
    mutation((mutation) => [mutation.createAccount({ name: $('name') }, (account) => [account.id])]),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit = (data: FormValues) => createAccount(data);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('name')} placeholder="Name" />
      {form.formState.errors.name && <p>{form.formState.errors.name.message}</p>}

      <button type="submit" disabled={createAccountMutation.fetching}>
        Submit
      </button>
    </form>
  );
}
