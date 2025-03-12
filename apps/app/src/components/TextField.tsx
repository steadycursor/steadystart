import { InputHTMLAttributes } from 'react';
import { useFormContext, FieldValues, UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapper } from './FieldWrapper';
import { LabelProps } from './Label';
import { TextInput } from './TextInput';

type TextFieldProps = {
  register: UseFormRegisterReturn;
  label: LabelProps;
  placeholder?: string;
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const TextField = <T extends FieldValues>({ label, register, placeholder, ...props }: TextFieldProps) => {
  const formContext = useFormContext<T>();

  const name = register.name;

  return (
    <FieldWrapper
      label={label} //
      error={{ message: formContext.formState.errors[name]?.message as string }}
    >
      <TextInput
        {...props}
        {...register}
        id={name}
        placeholder={placeholder}
        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200 sm:text-sm/6"
      />
    </FieldWrapper>
  );
};
