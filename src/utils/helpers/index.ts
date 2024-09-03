import { Theme, useTheme } from '@mui/material';

export const setColorThemeMode = (colorLight: string, colorDark: string, themeEx?: Theme): any => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const theme = useTheme();

	if ((themeEx ? themeEx.palette.mode : theme.palette.mode) === 'dark') {
		return colorDark;
	} else {
		return colorLight;
	}
};
