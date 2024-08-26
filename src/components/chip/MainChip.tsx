import { Chip, ChipProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactElement } from 'react';

interface IProps extends ChipProps {
	label?: string | null;
	icon?: ReactElement;
	fullRounded?: boolean;
	labelColor?: string;
	disabledPadding?: boolean;
}

export const MainChip = ({ icon, label, fullRounded, labelColor, disabledPadding, ...props }: IProps) => {
	return (
		<CustomChip
			label={label}
			icon={icon}
			disabledPadding={disabledPadding}
			sx={{ borderRadius: fullRounded ? '44px' : '', color: labelColor }}
			{...props}
		/>
	);
};

interface ICustomProps {
	disabledPadding?: boolean;
}

const CustomChip = styled(Chip, { shouldForwardProp: (prop) => prop !== 'disabledPadding' })<ICustomProps>(
	({ theme, disabledPadding }) => ({
		borderColor: theme.palette.divider,
		...(disabledPadding && {
			height: 'auto',
			minWidth: 'auto',

			'& .MuiChip-label': {
				paddingLeft: '6px',
				paddingRight: '6px',
			},
		}),
		// '& .'
	}),
);
