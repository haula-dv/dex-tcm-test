import { ReactNode } from 'react';

export interface IChartType {
	label: string;
	value: string;
	icon: ReactNode;
}

export interface IChartIndicator {
	userId: number;
	scriptName: string;
	scriptSource: string;
	scriptAccess: string;
	scriptIdPart: string;
	version: string;
	extra: Extra;
	lastVersionMaj: string;
}

export interface Extra {
	isAuto: boolean;
	isBeta: boolean;
	isBuiltIn: boolean;
	isNew: boolean;
	isPineEditorNewTemplate: boolean;
	isUpdated: boolean;
	kind: string;
	shortDescription: string;
	sourceInputsCount: number;
	tags: any[];
}
