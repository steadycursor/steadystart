import * as ReactHookForm from 'react-hook-form';
import { Stack } from '@/components/Stack';
import { ChildrenProps } from '@/types/ChildrenProps';

type UseFormProps<T extends ReactHookForm.FieldValues> = ReactHookForm.UseFormProps<T> & {
  onSubmit: (data: T) => Promise<void>;
};

export const useForm = <T extends ReactHookForm.FieldValues>(props: UseFormProps<T>) => {
  const form = ReactHookForm.useForm<T>(props);

  const values = form.watch();

  const Form = ({ children }: ChildrenProps) => (
    <form onSubmit={form.handleSubmit(props.onSubmit)}>
      <ReactHookForm.FormProvider {...form}>
        <Stack>{children}</Stack>
      </ReactHookForm.FormProvider>
    </form>
  );

  return { ...form, values, onSubmit: props.onSubmit, Form };
};
