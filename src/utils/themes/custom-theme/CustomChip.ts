import { Theme } from '@mui/material';

export const CustomMuiChip = (theme: Theme) => {
	return {
		MuiChip: {
			styleOverrides: {
				root: {
					fontWeight: 600,
					fontSize: '0.75rem',
				},

				colorWhite: {
					color: theme.palette.common.black,
					backgroundColor: '#fff',
				},
			},
		},
	};
};
