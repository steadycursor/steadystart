import { zodResolver } from '@hookform/resolvers/zod';
import { routes } from '@steadystart/routes';
import { createWorkspaceSchema } from '@steadystart/validations';
import { useRouter } from 'next/router';
import { useMutation } from 'urql';
import { z } from 'zod';
import { useForm } from '../hooks/useForm';
import { SubmitButton } from '@/components/SubmitButton';
import { TextField } from '@/components/TextField';
import { mutation, $ } from '@/generated/typed-graphql-builder';
import { useFormResponseHandler } from '@/hooks/useFormResponseHandler';
import { useTranslation } from '@/hooks/useTranslation';

type FormValues = z.infer<typeof createWorkspaceSchema>;

export function CreateWorkspaceForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const formResponseHandler = useFormResponseHandler();

  const [createWorkspaceMutation, createWorkspace] = useMutation(
    mutation((mutation) => [mutation.createWorkspace({ title: $('title') }, (workspace) => [workspace.id])]),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(createWorkspaceSchema),
    onSubmit: async (data) => {
      await createWorkspace(data)
        .then(formResponseHandler)
        .then((response) => {
          if (!response.data?.createWorkspace.id) {
            return;
          }

          router.push(routes.workspaces.posts.index({ workspace: response.data.createWorkspace.id }));
        });
    },
  });

  return (
    <form.Form>
      <TextField register={form.register('title')} label={{ title: t('fields:title') }} />
      <SubmitButton isDisabled={createWorkspaceMutation.fetching} />
    </form.Form>
  );
}
