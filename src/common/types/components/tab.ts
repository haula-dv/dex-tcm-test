import { ReactNode } from 'react';

export interface ITab {
	label: string;
	value: string | number | any;
	children?: ReactNode;
}
