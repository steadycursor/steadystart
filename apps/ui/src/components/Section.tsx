import { Div } from './Div';
import { ChildrenProps } from '@/types/ChildrenProps';

type SectionProps = ChildrenProps & {
  title: string;
};

export const Section = ({ title, children }: SectionProps) => {
  return (
    <Div className="mb-6">
      <Div className="mb-2 text-lg font-semibold">{title}</Div>
      <Div>{children}</Div>
    </Div>
  );
};
