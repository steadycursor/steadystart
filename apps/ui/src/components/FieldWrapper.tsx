import { ClassNameProps } from '@/types/ClassNameProps';
import { ChildrenProps } from '@/types/ChildrenProps';
import { Div } from './Div';
import { Label, LabelProps } from './Label';

type FieldWrapperProps = ChildrenProps &
  ClassNameProps & {
    label: LabelProps;
  };

export const FieldWrapper = ({ label, className, children }: FieldWrapperProps) => {
  return (
    <Div className={[className]}>
      <Label {...label} />
      <Div className={['mt-2']}>{children}</Div>
    </Div>
  );
};
