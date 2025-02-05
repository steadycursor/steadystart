import * as ReactHookForm from 'react-hook-form';
import { ChildrenProps } from '@/types/ChildrenProps';

type UseFormProps<T extends ReactHookForm.FieldValues> = ReactHookForm.UseFormProps<T> & {
  onSubmit: (data: T) => Promise<void>;
};

export const useForm = <T extends ReactHookForm.FieldValues>(props: UseFormProps<T>) => {
  const form = ReactHookForm.useForm<T>(props);

  const Form = ({ children }: ChildrenProps) => <form onSubmit={form.handleSubmit(props.onSubmit)}>{children}</form>;

  return { ...form, onSubmit: props.onSubmit, Form };
};
