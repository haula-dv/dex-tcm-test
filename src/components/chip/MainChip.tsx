import { Chip, ChipProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactElement } from 'react';

interface IProps extends ChipProps {
	label?: string | null;
	icon?: ReactElement;
	fullRounded?: boolean;
}

export const MainChip = ({ icon, label, fullRounded, ...props }: IProps) => {
	return <CustomChip label={label} icon={icon} sx={{ borderRadius: fullRounded ? '44px' : '' }} {...props} />;
};

const CustomChip = styled(Chip)(({ theme }) => ({
	borderColor: theme.palette.divider,
}));
