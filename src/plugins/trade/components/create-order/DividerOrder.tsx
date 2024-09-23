import { setColorThemeMode } from '@/utils/helpers';
import { Divider, useTheme } from '@mui/material';
import { memo, ReactNode } from 'react';

interface IProps {
	children?: ReactNode;
}

const DividerOrder = ({ children = 'or' }: IProps) => {
	return (
		<Divider
			sx={{
				mt: '0px !important',
				'&::before': {
					borderColor: setColorThemeMode(useTheme().palette.divider, useTheme().palette.grey[600]),
				},
				'&::after': {
					borderColor: setColorThemeMode(useTheme().palette.divider, useTheme().palette.grey[600]),
				},

				'& span': {
					color: setColorThemeMode(useTheme().palette.divider, useTheme().palette.common.white),
				},
			}}
		>
			{children}
		</Divider>
	);
};

export default memo(DividerOrder);
