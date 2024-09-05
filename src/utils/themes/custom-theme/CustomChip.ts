import { setColorThemeMode } from '@/utils/helpers';
import { Theme } from '@mui/material';

export const CustomMuiChip = (theme: Theme) => {
	return {
		MuiChip: {
			styleOverrides: {
				root: {
					fontWeight: 600,
					fontSize: '12px',
					borderRadius: '5px',
				},

				colorWhite: {
					color: theme.palette.common.black,
					backgroundColor: '#fff',
				},

				sizeSmall: {
					fontSize: '10px',
					height: '20px',
					padding: '0px',
				},

				filledTonalDefault: {
					backgroundColor: theme.palette.divider,
					color: theme.palette.common.white,
				},

				filledDefault: {
					backgroundColor: setColorThemeMode(theme.palette.primary.main, theme.palette.grey[800], theme),
				},

				label: {
					color: setColorThemeMode(theme.palette.grey[900], theme.palette.common.white, theme),
				},
			},
		},
	};
};
