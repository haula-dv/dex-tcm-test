import { setColorThemeMode } from '@/utils/helpers';
import { Theme } from '@mui/material';
import { TSizes } from './sizes';

export const CustomMuiButton = (theme: Theme) => {
	return {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					boxShadow: 'none',
					fontWeight: 600,
					padding: '8px 16px',
					lineHeight: '100%',
					borderRadius: TSizes.borderRadius,
					whiteSpace: 'nowrap',
					'&.Mui-disabled': {
						pointerEvents: 'all',
						cursor: 'not-allowed !important',
						backgroundColor: theme.palette.grey[200],
						color: theme.palette.grey[300],
						'&:hover': {
							color: theme.palette.grey[300],
							backgroundColor: theme.palette.grey[200],
						},
					},
				},

				containedPrimary: {
					backgroundColor: theme.palette.primary.dark,
					'&:hover': {
						backgroundColor: theme.palette.primary.dark,
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

				// Grey Primary
				containedDarkGrey: {
					'& p': {
						color: theme.palette.primary.light,
					},
					'& svg': {
						// color: '#fff',
					},
				},

				// SUCCESS
				containedSuccess: {
					'&:hover': {
						backgroundColor: theme.palette.success.main,
					},
				},

				filledTonalInherit: {
					backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
					'&:hover': {
						backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
					},
				},

				filledTonalDarkGrey: {
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

				filledTonalDarkPrimary: {
					backgroundColor: theme.palette.grey[400],
					color: theme.palette.common.white,

					'&:hover': {
						backgroundColor: theme.palette.grey[400],
						color: theme.palette.common.white,
					},
				},

				textLinkWhite: {
					color: '#fff !important',
					'& svg': {
						color: '#fff !important',
					},
				},

				//========================= SIZE =====================//
				sizeLarge: {
					height: '56px !important',
					padding: '8px 16px',
				},

				sizeMedium: {
					fontSize: '14px',
					height: '40px',
				},

				sizeSmall: {
					padding: '2px 4px',
					fontSize: '12px',
					height: TSizes.buttonHeightSmall,
					borderRadius: '6px !important',
					minWidth: 'auto',
				},

				sizeXsmall: {
					height: '28px',
					fontSize: '11px',
					padding: '0px 8px',
					minWidth: 'auto',
					borderRadius: '6px !important',
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
					color: theme.palette.primary.dark,
				},

				textPrimary: {
					color: theme.palette.primary.dark,

					'&:hover': {
						backgroundColor: theme.palette.primary.light,
					},
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
					color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.dark,
					backgroundColor: 'transparent',
					borderColor: setColorThemeMode(theme.palette.primary.light, theme.palette.grey[900], theme),

					'&:hover': {
						backgroundColor: setColorThemeMode(theme.palette.primary.main, theme.palette.grey[900], theme),
						borderColor: setColorThemeMode(theme.palette.primary.light, theme.palette.grey[900], theme),
						color: theme.palette.primary.dark,
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
