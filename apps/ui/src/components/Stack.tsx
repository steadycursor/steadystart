import { ChildrenProps } from '../types/ChildrenProps';
import { ClassNameProps } from '../types/ClassNameProps';
import { Div } from './Div';

type StackProps = ChildrenProps & ClassNameProps;

export const Stack = ({ children, className }: StackProps) => (
  <Div
    className={[
      'flex flex-col gap-3', //
      className,
    ]}
  >
    {children}
  </Div>
);
