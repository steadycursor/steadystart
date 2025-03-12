import { useFormContext, FieldValues, UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapper } from './FieldWrapper';
import { LabelProps } from './Label';
import { SelectInput } from './SelectInput';

type Option = { id: string | number; label: string };

type SelectFieldProps = {
  register: UseFormRegisterReturn;
  label: LabelProps;
  options: Option[];
};

export const SelectField = <T extends FieldValues>({ label, register, options }: SelectFieldProps) => {
  const formContext = useFormContext<T>();
  const name = register.name;

  return (
    <FieldWrapper label={label} error={{ message: formContext.formState.errors[name]?.message as string }}>
      <SelectInput {...register}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </SelectInput>
    </FieldWrapper>
  );
};
