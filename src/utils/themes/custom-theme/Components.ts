// project imports
import { Theme } from '@mui/material';
import { CustomMuiButton } from './CustomButton';
import { CustomMuiChip } from './CustomChip';
import { CustomFormControl } from './CustomFormControl';
import { CustomListItem } from './CustomListItem';
import { TSizes } from './sizes';

const components = (theme: Theme) => {
	return {
		...CustomMuiButton(theme),
		...CustomFormControl(theme),
		...CustomListItem(theme),
		...CustomMuiChip(theme),

		MuiCssBaseline: {
			styleOverrides: {
				'*': {
					boxSizing: 'border-box',
				},
				'html': {
					height: '100%',
					width: '100%',
				},
				'a': {
					textDecoration: 'none',
				},
				'body': {
					height: '100%',
					margin: 0,
					padding: 0,
				},
				'#root': {
					height: '100%',
				},
				"*[dir='rtl'] .buyNowImg": {
					transform: 'scaleX(-1)',
				},
				'.border-none': {
					border: '0px',
					td: {
						border: '0px',
					},
				},
				'.btn-xs': {
					minWidth: '30px !important',
					width: '30px',
					height: '30px',
					borderRadius: '6px !important',
					padding: '0px !important',
				},
				'.hover-text-primary:hover .text-hover': {
					color: theme.palette.primary.main,
				},

				'.hoverCard:hover': {
					scale: '1.01',
					transition: ' 0.3s ease-in',
					// borderColor: theme.palette.grey[400],
					boxShadow: theme.shadows[1],
				},
				'.signup-bg': {
					position: 'absolute',
					top: 0,
					right: 0,
					height: '100%',
				},
				'.MuiBox-root': {
					borderRadius: theme.shape.borderRadius,
				},
				'.MuiCardHeader-action': {
					alignSelf: 'center !important',
				},
				'.emoji-picker-react .emoji-scroll-wrapper': {
					overflowX: 'hidden',
				},
				'.scrollbar-container': {
					borderRight: '0 !important',
				},
				'.theme-timeline .MuiTimelineOppositeContent-root': {
					minWidth: '90px',
				},
				'.MuiAlert-root .MuiAlert-icon': {
					color: 'inherit!important',
				},
				'.MuiTimelineConnector-root': {
					width: '1px !important',
				},
				' .simplebar-scrollbar:before': {
					background: `${theme.palette.grey[300]} !important`,
				},
				'@keyframes gradient': {
					'0%': {
						backgroundPosition: '0% 50%',
					},
					'50%': {
						backgroundPosition: ' 100% 50%',
					},
					'100% ': {
						backgroundPosition: ' 0% 50%',
					},
				},
				'.rounded-bars .apexcharts-bar-series.apexcharts-plot-series .apexcharts-series path': {
					clipPath: 'inset(0 0 5% 0 round 20px)',
				},
			},
		},

		MuiButtonGroup: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
				},
			},
		},

		MuiAccordion: {
			styleOverrides: {
				root: {
					':before': {
						backgroundColor: theme.palette.grey[100],
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: TSizes.borderRadius,
					backgroundImage: 'none',
				},
			},
		},
		MuiStepConnector: {
			styleOverrides: {
				line: {
					borderColor: theme.palette.divider,
				},
			},
		},
		MuiFab: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
				},
				sizeSmall: {
					width: 30,
					height: 30,
					minHeight: 30,
				},
			},
		},

		MuiCardHeader: {
			styleOverrides: {
				root: {
					padding: '16px 24px',
				},
				title: {
					fontSize: '1.125rem',
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					width: '100%',
					padding: '15px',
					backgroundImage: 'none',
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: '24px',
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					'borderBottom': `1px solid ${theme.palette.divider}`,
					'fontSize': '14px',
					'color': theme.palette.grey[500],
					'fontWeight': 500,

					'& .MuiButtonBase-root': {
						'fontSize': '12px',
						'fontWeight': 500,
						'color': theme.palette.grey[400],
						'textTransform': 'uppercase',
						'letterSpacing': '0.5px',
						'& .MuiTableSortLabel-icon': {
							color: theme.palette.grey[400],
						},
					},
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					'& .MuiTableBody-root:last-child tr': {
						borderBottom: 0,
					},

					'&.Mui-selected': {
						// backgroundColor: theme.palette.grey[100],
						'backgroundColor': 'transparent !important',

						'&:hover': {
							// backgroundColor: `${theme.palette.grey[100]}`,
							backgroundColor: 'transparent !important',
						},
					},

					'&:hover': {
						backgroundColor: 'transparent !important',
					},
				},
			},
		},
		MuiGridItem: {
			styleOverrides: {
				root: {
					paddingTop: '30px',
					paddingLeft: '30px !important',
				},
			},
		},
		MuiLinearProgress: {
			styleOverrides: {
				root: {
					backgroundColor: theme.palette.grey[200],
					borderRadius: '6px',
				},
			},
		},
		MuiTimelineConnector: {
			styleOverrides: {
				root: {
					backgroundColor: theme.palette.divider,
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: theme.palette.divider,
				},
			},
		},

		MuiAlert: {
			styleOverrides: {
				filledSuccess: {
					color: 'white',
				},
				filledInfo: {
					color: 'white',
				},
				filledError: {
					color: 'white',
				},
				filledWarning: {
					color: 'white',
				},
				standardSuccess: {
					backgroundColor: theme.palette.success.light,
					color: theme.palette.success.main,
				},
				standardError: {
					backgroundColor: theme.palette.error.light,
					color: theme.palette.error.main,
				},
				standardWarning: {
					backgroundColor: theme.palette.warning.light,
					color: theme.palette.warning.main,
				},
				standardInfo: {
					backgroundColor: theme.palette.info.light,
					color: theme.palette.info.main,
				},
				outlinedSuccess: {
					borderColor: theme.palette.success.main,
					color: theme.palette.success.main,
				},
				outlinedWarning: {
					borderColor: theme.palette.warning.main,
					color: theme.palette.warning.main,
				},
				outlinedError: {
					borderColor: theme.palette.error.main,
					color: theme.palette.error.main,
				},
				outlinedInfo: {
					borderColor: theme.palette.info.main,
					color: theme.palette.info.main,
				},
				successIcon: {
					color: theme.palette.info.main,
				},
			},
		},

		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					color: theme.palette.background.paper,
					background: theme.palette.text.primary,
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				paper: {
					borderColor: `${theme.palette.divider}`,
				},
			},
		},
		MuiDialogContent: {
			styleOverrides: {
				root: {
					padding: '16px',
				},
			},
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					fontSize: '1.25rem',
				},
			},
		},
		MuiPopover: {
			styleOverrides: {
				paper: {
					boxShadow: 'rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
				},
			},
		},
	};
};
export default components;
