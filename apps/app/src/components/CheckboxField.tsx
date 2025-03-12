import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Div } from './Div';

import { LabelProps } from './Label';
import { CheckboxInput } from './CheckboxInput';

type CheckboxFieldProps = {
  register: UseFormRegisterReturn;
  label: LabelProps;
} & InputHTMLAttributes<HTMLInputElement>;

export const CheckboxField = ({ label, register, ...props }: CheckboxFieldProps) => {
  const name = register.name;

  return (
    <Div className="flex gap-3 items-center">
      <CheckboxInput
        {...props}
        {...register}
        id={name}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-200"
      />
      <Div>{label.title}</Div>
    </Div>
  );
};
