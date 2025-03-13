import { ButtonHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Div } from './Div';
import { LabelProps } from './Label';
import { ToggleInput } from './ToggleInput';

type ToggleFieldProps = {
  register: UseFormRegisterReturn;
  label: LabelProps;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ToggleField = ({ label, register, ...props }: ToggleFieldProps) => {
  const name = register.name;

  return (
    <Div className="flex gap-3 items-center">
      <ToggleInput {...props} {...register} id={name} />
      <Div>{label.title}</Div>
    </Div>
  );
};
