import { ClassNameProps } from '../types/ClassNameProps';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type ImgProps = Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'className'> & ClassNameProps;

export const Img = (props: ImgProps) => <img {...props} className={twMerge(props.className)} />;
