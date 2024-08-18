import { Theme } from '@mui/material';

export const CustomMuiButton = (theme: Theme) => {
	return {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					boxShadow: 'none',
					fontSize: '13px',
					height: '32px',
					fontWeight: 600,
					padding: '6px 12px',
					lineHeight: '100%',

					'&.Mui-disabled': {
						pointerEvents: 'all',
						cursor: 'not-allowed !important',
						backgroundColor: theme.palette.grey[100],
						color: theme.palette.grey[300],
						'&:hover': {
							backgroundColor: theme.palette.grey[100],
						},
					},
				},

				contained: {
					//   padding: "8px 16px",
				},

				containedPrimary: {
					backgroundColor: theme.palette.primary.main,
					'&:hover': {
						backgroundColor: theme.palette.primary.main,
						color: 'white',
					},
				},

				// SECONDARY
				containedSecondary: {
					backgroundColor: theme.palette.secondary.main,

					'&:hover': {
						backgroundColor: theme.palette.secondary.main,
						color: theme.palette.secondary.dark,
					},
				},

				// DARK PRIMARY
				containedDarkPrimary: {
					'&:hover': {
						backgroundColor: 'rgba(0, 0, 0, 0.8)',
					},
				},

				filledTonalInherit: {
					backgroundColor: theme.palette.grey[100],
					'&:hover': {
						backgroundColor: theme.palette.grey[200],
					},
				},

				filledTonalSecondary: {
					backgroundColor: theme.palette.secondary.light,
					color: theme.palette.common.black,
					'&:hover': {
						backgroundColor: theme.palette.secondary.light,
					},
				},

				// SIZE
				sizeSmall: {
					padding: '4px 12px',
					fontSize: '12px',
					height: '32px',
					borderRadius: '8px !important',
				},

				sizeXsmall: {
					height: '26px',
					fontSize: '11px',
					padding: '0px 8px',
					minWidth: 'auto',
					borderRadius: '6px !important',
				},

				sizeLarge: {
					height: '56px',
				},

				text: {
					padding: '8px 16px',
				},

				textLink: {
					minWidth: 'auto',
					height: 'auto',
					padding: '0px !important',
					fontWeight: '600',
					'&:hover': {
						backgroundColor: 'transparent',
					},
				},

				textLinkPrimary: {
					color: theme.palette.primary.main,
				},

				textPrimary: {
					'&:hover': {},
				},

				textSecondary: {
					backgroundColor: theme.palette.secondary.light,
					color: theme.palette.secondary.contrastText,
					'&:hover': {
						backgroundColor: theme.palette.secondary.main,
						color: theme.palette.secondary.light,
					},
				},

				textSuccess: {
					backgroundColor: theme.palette.success.light,
					'&:hover': {
						backgroundColor: theme.palette.success.main,
						color: 'white',
					},
				},

				textError: {
					backgroundColor: theme.palette.error.light,
					'&:hover': {
						backgroundColor: theme.palette.error.main,
						color: 'white',
					},
				},

				textInfo: {
					backgroundColor: theme.palette.info.light,
					'&:hover': {
						backgroundColor: theme.palette.info.main,
						color: 'white',
					},
				},

				textWarning: {
					backgroundColor: theme.palette.warning.light,
					'&:hover': {
						backgroundColor: theme.palette.warning.main,
						color: 'white',
					},
				},

				outlinedPrimary: {
					color: theme.palette.mode === 'dark' ? '#fff' : '',
					backgroundColor: 'transparent',
					borderColor: theme.palette.primary.light,

					'&:hover': {
						backgroundColor: theme.palette.primary.main,
						color: 'white',
					},
				},

				outlinedSecondary: {
					'&:hover': {
						backgroundColor: theme.palette.secondary.main,
						color: 'white',
					},
				},

				outlinedError: {
					'&:hover': {
						backgroundColor: theme.palette.error.main,
						color: 'white',
					},
				},

				outlinedSuccess: {
					'&:hover': {
						backgroundColor: theme.palette.success.main,
						color: 'white',
					},
				},

				outlinedInfo: {
					'&:hover': {
						backgroundColor: theme.palette.info.main,
						color: 'white',
					},
				},

				outlinedWarning: {
					'&:hover': {
						backgroundColor: theme.palette.warning.main,
						color: 'white',
					},
				},
			},
		},
	};
};
