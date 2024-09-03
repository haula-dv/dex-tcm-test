import { setColorThemeMode } from '@/utils/helpers';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { memo } from 'react';

const MainTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	cursor: 'pointer',
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: setColorThemeMode(theme.palette.common.white, theme.palette.grey[900]),
		color: setColorThemeMode(theme.palette.grey[900], theme.palette.common.white),
		boxShadow: theme.shadows[1],
		fontSize: 11,
		'&:first-letter': {
			textTransform: 'uppercase',
		},
	},

	[`& .${tooltipClasses.arrow}`]: {
		color: setColorThemeMode(theme.palette.common.white, theme.palette.grey[900]),
	},
}));

export default memo(MainTooltip);
