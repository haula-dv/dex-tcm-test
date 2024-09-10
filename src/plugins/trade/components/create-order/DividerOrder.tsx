import { setColorThemeMode } from '@/utils/helpers';
import { Divider, useTheme } from '@mui/material';
import { memo } from 'react';

const DividerOrder = () => {
	return (
		<Divider
			sx={{
				'&::before': {
					borderColor: setColorThemeMode(useTheme().palette.divider, useTheme().palette.common.white),
				},
				'&::after': {
					borderColor: setColorThemeMode(useTheme().palette.divider, useTheme().palette.common.white),
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
