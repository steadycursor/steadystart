import { ButtonHTMLAttributes } from 'react';
import { ChildrenProps } from '@/types/ChildrenProps';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> &
  ChildrenProps & {
    isDisabled?: boolean;
  };

export const Button = ({ children, isDisabled, ...props }: ButtonProps) => {
  return (
    <div>
      <button
        disabled={isDisabled}
        className={twMerge([
          'px-3 py-2 text-sm font-semibold rounded-md cursor-pointer',
          'bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
          isDisabled && 'opacity-35 cursor-not-allowed',
        ])}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};
