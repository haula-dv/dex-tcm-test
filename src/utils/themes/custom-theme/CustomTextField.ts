import { Theme } from '@mui/material';

export const CustomTextField = (theme: Theme) => {
	return {
		MuiTextField: {
			styleOverrides: {
				root: {},
			},
		},
	};
};
