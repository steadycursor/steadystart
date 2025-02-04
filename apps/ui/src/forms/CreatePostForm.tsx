import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema } from '@steadysass/validations';
import { useMutation } from 'urql';
import { mutation, $ } from '@/generated/typed-graphql-builder';
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
      <input {...form.register('name')} placeholder="Name" />
      {form.formState.errors.name && <p>{form.formState.errors.name.message}</p>}

      <button type="submit" disabled={createPostMutation.fetching}>
        Submit
      </button>
    </form.Form>
  );
}
