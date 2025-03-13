import { Div } from './Div';
import { Label, LabelProps } from './Label';
import { ChildrenProps } from '@/types/ChildrenProps';
import { ClassNameProps } from '@/types/ClassNameProps';

type FieldWrapperProps = ChildrenProps &
  ClassNameProps & {
    label: LabelProps;
    error?: { message?: string };
  };

export const FieldWrapper = ({ label, error, className, children }: FieldWrapperProps) => {
  return (
    <Div className={[className, 'space-y-1.5']}>
      <Label {...label} />
      <Div>{children}</Div>
      {error && <Div className="text-sm text-red-600">{error.message}</Div>}
    </Div>
  );
};
