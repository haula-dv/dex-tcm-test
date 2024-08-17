import { theme } from '@/src/utils';
import { Box, ListItemButton, ListItemButtonProps, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconChevronRight } from '@tabler/icons-react';
import { ReactNode } from 'react';

interface IProps extends ListItemButtonProps {
	primaryText?: string;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
}

export const ItemList = ({
	startIcon,
	endIcon = <IconChevronRight size={'1rem'} color={theme.palette.grey[400]} />,
	primaryText,
	...props
}: IProps) => {
	return (
		<CustomListItem {...props}>
			<Stack direction={'row'} alignItems={'center'} width={'100%'} spacing={1}>
				<Box>{startIcon}</Box>

				<Typography fontSize={'16px'} fontWeight={600} flex={1}>
					{primaryText}
				</Typography>

				<Box>{endIcon}</Box>
			</Stack>
		</CustomListItem>
	);
};

const CustomListItem = styled(ListItemButton)(({ theme }) => ({
	borderRadius: '16px',
	padding: '12px 12px',
	backgroundColor: 'rgba(255, 255, 255, 0.02)',
	display: 'flex',
	alignItems: 'center',

	'&:hover': {
		backgroundColor: theme.palette.grey[900],
	},
}));
