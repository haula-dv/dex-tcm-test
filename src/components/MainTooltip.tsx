import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { memo } from 'react';

const MainTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	cursor: 'pointer',
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.grey[800],
		boxShadow: theme.shadows[1],
		fontSize: 11,
		'&:first-letter': {
			textTransform: 'uppercase',
		},
	},

	[`& .${tooltipClasses.arrow}`]: {
		color: theme.palette.common.white,
	},
}));

export default memo(MainTooltip);
