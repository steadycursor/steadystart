import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from '@/hooks/useTranslation';
import { createPostSchema } from '@steadystart/validations';
import { useMutation } from 'urql';
import { SubmitButton } from '@/components/SubmitButton';
import { mutation, $ } from '@/generated/typed-graphql-builder';
import { TextField } from '@/components/TextField';
import { useForm } from '../hooks/useForm';
import { useFormResponseHandler } from '@/hooks/useFormResponseHandler';

type FormValues = z.infer<typeof createPostSchema>;

export function CreatePostForm() {
  const { t } = useTranslation();
  const formResponseHandler = useFormResponseHandler();

  const [createPostMutation, createPost] = useMutation(mutation((mutation) => [mutation.createPost({ name: $('name') }, (post) => [post.id])]));

  const form = useForm<FormValues>({
    resolver: zodResolver(createPostSchema),
    onSubmit: async (data: FormValues) => {
      await createPost(data).then(formResponseHandler);
    },
  });

  return (
    <form.Form>
      <TextField register={form.register('name')} label={{ title: t('fields:name') }} />
      <SubmitButton isDisabled={createPostMutation.fetching} />
    </form.Form>
  );
}
