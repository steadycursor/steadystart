import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema } from '@steadysass/validations';
import { useMutation } from 'urql';
import { SubmitButton } from '@/components/SubmitButton';
import { mutation, $ } from '@/generated/typed-graphql-builder';
import { TextField } from '@/components/TextField';
import { useForm } from '../hooks/useForm';

type FormValues = z.infer<typeof createPostSchema>;

export function CreatePostForm() {
  const [createPostMutation, createPost] = useMutation(mutation((mutation) => [mutation.createPost({ name: $('name') }, (post) => [post.id])]));

  const form = useForm<FormValues>({
    resolver: zodResolver(createPostSchema),
    onSubmit: async (data: FormValues) => {
      await createPost(data);
    },
  });

  return (
    <form.Form>
      <TextField register={form.register('name')} label={{ title: 'Name' }} />
      <SubmitButton isDisabled={createPostMutation.fetching} />
    </form.Form>
  );
}
