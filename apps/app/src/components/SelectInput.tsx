import { ChevronDown24Regular } from '@fluentui/react-icons';
import { FC, SelectHTMLAttributes } from 'react';

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement>;

export const SelectInput: FC<SelectInputProps> = ({ children, ...props }) => (
  <div className="grid grid-cols-1">
    <select
      {...props}
      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brand sm:text-sm/6 cursor-pointer"
    >
      {children}
    </select>
    <ChevronDown24Regular className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
  </div>
);
