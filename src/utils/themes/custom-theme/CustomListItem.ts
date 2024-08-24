import { Theme } from '@mui/material';

export const CustomListItem = (theme: Theme) => {
	return {
		MuiListItemButton: {
			styleOverrides: {
				root: {
					padding: '6px 16px',
					transition: '0.4s',

					'&.Mui-selected': {
						backgroundColor: theme.palette.grey[50],
						'&:hover': {
							backgroundColor: theme.palette.grey[50],
						},
					},
				},
			},
		},
	};
};
