import { ReactNode } from 'react';
import { Div } from './Div';

export type CardProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
};

export const Card = ({ title, description, children, actions }: CardProps) => (
  <Div className="border rounded-lg shadow-md sm:mt-0 border-gray-20 w-full">
    {(title || description || actions) && (
      <Div className="flex p-4 rounded-t-lg bg-gray-10 md:col-span-1 items-center bg-brand">
        <Div className="flex-1">
          {title && <h3 className="font-medium leading-6 text-black text-md">{title}</h3>}
          {description && <p className="mt-2 text-sm leading-5 text-gray-600">{description}</p>}
        </Div>
        <Div className="self-end">{actions}</Div>
      </Div>
    )}
    <Div className={['md:col-span-2 bg-white p-4', title || description ? 'rounded-b-lg' : 'rounded-lg']}>{children}</Div>
  </Div>
);
