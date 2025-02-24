import { ClassNameProps } from '@/types/ClassNameProps';
import { Img } from './Img';

export type IconProps = {
  family: 'material-outlined'; // https://icons8.com/icons/material-outlined
  name: string;
  size: number;
} & ClassNameProps;

export const Icon = ({ family, name, size, className }: IconProps) => {
  return <Img src={`https://img.icons8.com/${family}/${size * 2}/${name}.png`} style={{ width: size }} className={['self-center', className]} />;
};
