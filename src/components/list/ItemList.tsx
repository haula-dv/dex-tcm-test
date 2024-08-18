import { theme } from '@/utils';
import { Box, ListItemButton, ListItemButtonProps, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconChevronRight } from '@tabler/icons-react';
import { ReactNode } from 'react';

interface IProps extends ListItemButtonProps {
	primaryText?: string;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	borderRadius?: string;
	disabledBg?: boolean;
	size?: 'small' | 'medium' | 'large';
	isHiddenEndIcon?: boolean;
	onClick?: () => void;
	isSelected?: boolean;
}

export const ItemList = ({
	startIcon,
	endIcon = <IconChevronRight size={'1rem'} color={theme.palette.grey[400]} />,
	primaryText,
	borderRadius = '16px',
	disabledBg,
	size = 'medium',
	isHiddenEndIcon,
	onClick,
	isSelected,
	...props
}: IProps) => {
	return (
		<CustomListItem borderRadius={borderRadius} size={size} disabledBg={disabledBg} onClick={onClick} isSelected={isSelected} {...props}>
			<Stack direction={'row'} alignItems={'center'} width={'100%'} spacing={1}>
				<Box display={'flex'} alignItems={'center'}>
					{startIcon}
				</Box>

				<Typography fontWeight={600} flex={1}>
					{primaryText}
				</Typography>

				{isHiddenEndIcon ? null : endIcon}
			</Stack>
		</CustomListItem>
	);
};

interface IItemProps {
	borderRadius?: string;
	disabledBg?: boolean;
	size?: 'small' | 'medium' | 'large';
	isSelected?: boolean;
}

const CustomListItem = styled(ListItemButton, {
	shouldForwardProp: (prop) => prop !== 'borderRadius' && prop !== 'disabledBg' && prop !== 'size' && prop !== 'isSelected',
})<IItemProps>(({ theme, borderRadius, disabledBg, size, isSelected }) => ({
	borderRadius: borderRadius,

	...(size == 'small' && {
		padding: '6px 6px',

		'& .MuiTypography-root': {
			fontSize: '13px',
		},
	}),

	...(size == 'medium' && {
		padding: '12px 12px',
		'& .MuiTypography-root': {
			fontSize: '16px',
		},
	}),

	...(isSelected
		? {
				backgroundColor: 'rgba(255, 255, 255, 0.02)',
		  }
		: {
				backgroundColor: disabledBg ? 'transparent' : 'rgba(255, 255, 255, 0.02)',
		  }),
	display: 'flex',
	alignItems: 'center',

	'&:hover': {
		backgroundColor: theme.palette.grey[900],
	},
}));
