import { setColorThemeMode } from '@/utils/helpers';
import { Divider, useTheme } from '@mui/material';
import { memo } from 'react';

const DividerOrder = () => {
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
			or
		</Divider>
	);
};

export default memo(DividerOrder);
