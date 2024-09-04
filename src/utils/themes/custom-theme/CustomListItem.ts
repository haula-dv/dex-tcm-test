import { setColorThemeMode } from '@/utils/helpers';
import { Theme } from '@mui/material';

export const CustomListItem = (theme: Theme) => {
	return {
		MuiListItemButton: {
			styleOverrides: {
				root: {
					padding: '6px 16px',
					transition: '0.4s',
				},

				selected: {
					backgroundColor: `${setColorThemeMode(
						theme.palette.grey[50],
						theme.palette.primary.light,
						theme,
					)} !important`,

					'&:hover': {
						backgroundColor: `${setColorThemeMode(
							theme.palette.grey[50],
							theme.palette.primary.light,
							theme,
						)} !important`,
					},
				},
			},
		},
	};
};
