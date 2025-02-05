export type LabelProps = { title: string };

export const Label = ({ title }: LabelProps) => {
  return <label className="block text-sm/6 font-medium text-gray-900">{title}</label>;
};
