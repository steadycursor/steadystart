/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { ClassNameProps } from '../types/ClassNameProps';

export type ImgProps = Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'className'> & ClassNameProps;

export const Img = (props: ImgProps) => <img {...props} className={twMerge(props.className)} />;
