import { FC } from 'react';
import { Div } from './Div';
import { ChildrenProps } from '../types/ChildrenProps';
import { ClassNameProps } from '../types/ClassNameProps';

type StackProps = ChildrenProps & ClassNameProps & {
  direction?: "column" | "row"
};

export const Stack: FC<StackProps> = ({ direction, children, className }) => (
  <Div
    className={[
      'flex gap-3', //
      direction !== "row" && "flex-col",
      className,
    ]}
  >
    {children}
  </Div>
);
