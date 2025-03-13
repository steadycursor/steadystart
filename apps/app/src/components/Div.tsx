import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { ClassNameProps } from '../types/ClassNameProps';

export type DivProps = Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'className'> & ClassNameProps;

export const Div = (props: DivProps) => <div {...props} className={twMerge(props.className)} />;
