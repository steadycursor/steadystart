import { ChildrenProps } from '../types/ChildrenProps';
import { ClassNameProps } from '../types/ClassNameProps';
import { Div } from './Div';

type StackProps = ChildrenProps & ClassNameProps;

export const Stack = ({ children, className }: StackProps) => (
  <Div
    className={[
      'flex flex-col', //
      'space-y-8 py-8 md:space-y-12 md:py-12',
      className,
    ]}
  >
    {children}
  </Div>
);
