import { ClassNameProps } from '@/types/ClassNameProps';
import { ButtonHTMLAttributes } from 'react';
import { ChildrenProps } from '@/types/ChildrenProps';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> &
  ChildrenProps & {
    isDisabled?: boolean;
  };

export const Button = ({ children, isDisabled, ...props }: ButtonProps) => {
  return (
    <div>
      <button
        disabled={isDisabled}
        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        {...props}
      >
        {children}
      </button>
    </div>
  );
};
