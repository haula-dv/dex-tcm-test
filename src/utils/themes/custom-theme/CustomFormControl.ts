import { Theme } from '@mui/material';
import { TSizes } from './sizes';

export const CustomFormControl = (theme: Theme) => {
	return {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'backgroundColor': '#fff',
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.grey[100],
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.grey[200],
					},
				},

				input: {
					padding: '12px 14px',
				},

				inputSizeSmall: {
					padding: '8px 14px',
				},
			},
		},

		MuiInputBase: {
			styleOverrides: {
				root: {
					'&.MuiInputBase-sizeXsmall': {
						'& input': {
							padding: '6px 12px !important',
						},
					},
				},
			},
		},

		MuiFilledInput: {
			styleOverrides: {
				root: {
					'border': `1px solid ${theme.palette.grey[100]}`,
					'backgroundColor': theme.palette.common.white,
					'borderRadius': TSizes.borderRadius,
					'overflow': 'hidden',
					'paddingLeft': '4px',

					'&:before': {
						borderBottom: 0,
					},

					'&:hover': {
						'backgroundColor': theme.palette.common.white,

						'&:before': {
							borderBottom: 0,
						},
					},

					'&:after': {
						borderBottom: '0px',
					},

					'& .Mui-focused': {
						backgroundColor: theme.palette.common.white,
					},
				},

				input: {
					backgroundColor: theme.palette.common.white,
					borderRadius: TSizes.borderRadius,
					overflow: 'hidden',
				},
			},
		},

		MuiInputLabel: {
			styleOverrides: {
				filled: {
					// lineHeight: "180%",
					'color': theme.palette.grey[700],
					'fontSize': '14px',
					'paddingLeft': '4px',
					'transform': 'translate(16px, 18px) scale(1)',
					'transition': 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1)',

					'&.Mui-focused': {
						transform: 'translate(14px, 7px) scale(0.75)',
						color: theme.palette.grey[700],
						fontWeight: 400,
					},

					// When the label has data-shrink="true"
					'&[data-shrink="true"]': {
						transform: 'translate(14px, 7px) scale(0.75) !important',
					},
				},
			},
		},
	};
};
