import { FC, useState, ButtonHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';

type ToggleInputProps = {
  id: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ToggleInput: FC<ToggleInputProps> = ({ id, ...props }) => {
  const { control } = useFormContext();
  const { field } = useController({ name: id, control });
  const [enabled, setEnabled] = useState(field.value || false);

  const toggle = () => {
    setEnabled((prev: boolean) => {
      const newVal = !prev;
      field.onChange(newVal);

      return newVal;
    });
  };

  return (
    <button
      {...props}
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={toggle}
      className={`${
        enabled ? 'bg-brand' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2`}
    >
      <span
        aria-hidden="true"
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
};
