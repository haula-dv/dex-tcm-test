import { Theme } from '@mui/material';

export const CustomListItem = (theme: Theme) => {
	return {
		MuiListItemButton: {
			styleOverrides: {
				root: {
					'padding': '5px 15px',

					'&.Mui-selected': {
						'backgroundColor': theme.palette.grey[100],
						'&:hover': {
							backgroundColor: theme.palette.grey[100],
						},
					},
				},
			},
		},
	};
};
