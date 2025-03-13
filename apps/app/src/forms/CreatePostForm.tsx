import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema } from '@steadystart/validations';
import { useMutation } from 'urql';
import { z } from 'zod';
import { useForm } from '../hooks/useForm';
import { SubmitButton } from '@/components/SubmitButton';
import { TextField } from '@/components/TextField';
import { mutation, $ } from '@/generated/typed-graphql-builder';
import { useFormResponseHandler } from '@/hooks/useFormResponseHandler';
import { useTranslation } from '@/hooks/useTranslation';

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
