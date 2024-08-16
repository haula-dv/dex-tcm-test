import { Chip, ChipProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactElement } from 'react';

interface IProps extends ChipProps {
	label?: string | null;
	icon?: ReactElement;
}

export const MainChip = ({ icon, label, ...props }: IProps) => {
	return <CustomChip label={label} icon={icon} {...props} />;
};

const CustomChip = styled(Chip)(({ theme }) => ({
	borderColor: theme.palette.divider,
}));
