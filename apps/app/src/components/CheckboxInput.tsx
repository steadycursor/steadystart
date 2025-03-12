import { FC, InputHTMLAttributes } from 'react';

type CheckboxInputProps = InputHTMLAttributes<HTMLInputElement>;

export const CheckboxInput: FC<CheckboxInputProps> = ({ ...props }) => {
  return (
    <input
      {...props}
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-200"
    />
  );
};
