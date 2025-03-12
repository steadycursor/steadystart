import { FC, TextareaHTMLAttributes } from 'react';

type TextAreaInputProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextAreaInput: FC<TextAreaInputProps> = ({ ...props }) => {
  return (
    <textarea
      {...props}
      className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brand disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200 sm:text-sm/6"
    />
  );
};
