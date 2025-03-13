import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { ClassNameProps } from '../types/ClassNameProps';

export type ButtonProps = {
  variant?: Parameters<typeof variants>[0];
  isDisabled?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> &
  ClassNameProps;

const variants = (defaultVariants: { isDisabled?: boolean }) =>
  tv({
    base: 'cursor-pointer rounded-md',
    variants: {
      size: {
        default: 'px-3 py-2 font-semibold border text-xs',
      },
      color: {
        primary: 'bg-yellow-300 border-yellow-400',
        default: 'bg-gray-200 border-gray-300',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: { color: 'default', size: 'default', isDisabled: defaultVariants.isDisabled },
  });

export const Button = ({ className, isDisabled, ...props }: ButtonProps) => (
  <button {...props} className={twMerge(variants({ isDisabled })(props.variant), className)} disabled={isDisabled} />
);
