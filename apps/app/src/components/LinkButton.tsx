import { ClassNameProps } from '../types/ClassNameProps';
import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type LinkButton = {
  isDisabled?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> &
  ClassNameProps;

export const LinkButton = ({ className, isDisabled, ...props }: LinkButton) => (
  <button
    {...props}
    type="button"
    className={twMerge(
      'inline-flex items-center font-semibold rounded-sm focus:outline-none cursor-pointer select-none underline whitespace-nowrap',
      isDisabled ? 'cursor-not-allowed text-gray-500' : 'text-primary',
      className,
    )}
    disabled={isDisabled}
  />
);
