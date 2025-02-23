import { ClassNameProps } from '../types/ClassNameProps';
import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

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

export type ButtonProps = {
  variant?: Parameters<typeof variants>[0];
  isDisabled?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> &
  ClassNameProps;

export const Button = (props: ButtonProps) => (
  <button {...props} className={twMerge(props.className, variants({ isDisabled: props.isDisabled })(props.variant))} disabled={props.isDisabled} />
);
