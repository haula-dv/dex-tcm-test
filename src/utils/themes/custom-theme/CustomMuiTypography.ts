import { setColorThemeMode } from '@/utils/helpers';
import { Theme } from '@mui/material';

export const CustomMuiTypography = (theme: Theme) => {
	return {
		MuiTypography: {
			styleOverrides: {
				root: { color: setColorThemeMode(theme.palette.grey[900], theme.palette.common.white, theme) },
			},
		},
	};
};
