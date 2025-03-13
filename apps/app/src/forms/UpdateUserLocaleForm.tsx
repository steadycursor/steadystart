import { zodResolver } from '@hookform/resolvers/zod';
import { localeSelectOptions } from '@steadystart/enums';
import { updateUserSchema } from '@steadystart/validations';
import { useMutation, useQuery } from 'urql';
import { z } from 'zod';
import { useForm } from '../hooks/useForm';
import { Card } from '@/components/Card';
import { SelectField } from '@/components/SelectField';
import { SubmitButton } from '@/components/SubmitButton';
import { mutation, $, query } from '@/generated/typed-graphql-builder';
import { useFormResponseHandler } from '@/hooks/useFormResponseHandler';
import { useTranslation } from '@/hooks/useTranslation';

type FormValues = z.infer<typeof updateUserSchema>;

export function UpdateUserLocaleForm() {
  const { t, setLanguage } = useTranslation();
  const formResponseHandler = useFormResponseHandler();

  const [meQuery] = useQuery({ query: query((query) => [query.me((me) => [me.locale])]) });

  const [udpateUserMutation, updateUser] = useMutation(mutation((mutation) => [mutation.updateUser({ locale: $('locale') }, (me) => [me.id])]));

  const form = useForm<FormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      locale: meQuery.data?.me.locale,
    },
    onSubmit: async (data: FormValues) => {
      await updateUser(data).then(formResponseHandler);
      setLanguage(data.locale.toLowerCase());
    },
  });

  return (
    <Card title={t('components:UpdateUserLocaleForm.Card.title')} description={t('components:UpdateUserLocaleForm.Card.description')}>
      <form.Form>
        <SelectField register={form.register('locale')} label={{ title: t('enums:$Enums.Locale') }} options={localeSelectOptions(t)} />
        <SubmitButton isDisabled={udpateUserMutation.fetching} />
      </form.Form>
    </Card>
  );
}
