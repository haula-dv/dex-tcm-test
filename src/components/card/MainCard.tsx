'use client';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Card, CardProps, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, ReactNode } from 'react';

interface IProps extends CardProps {
	children?: React.ReactNode;
	maxWidth?: string;
	isHover?: boolean;
	backgroudColor?: 'primary' | 'primaryLight' | 'white' | 'grey' | 'darkgrey' | 'transparent' | 'common';
	disablePadding?: boolean;
	padding?: string;
	borderRadius?: string;
	isSelected?: boolean;
	width?: string;
	height?: string;
	minHeight?: string;
	maxHeight?: string;
	heightCard?: string;
	isActionSlot?: ReactNode;
}

const MainCard = ({
	children,
	maxWidth,
	backgroudColor = 'white',
	isHover,
	disablePadding,
	padding = TSizes.card_padding,
	borderRadius,
	width,
	isSelected,
	height,
	minHeight,
	maxHeight,
	isActionSlot,
	heightCard = 'auto',
	...props
}: IProps) => {
	return (
		<CustomCard
			elevation={0}
			isSelected={isSelected}
			sx={{
				maxWidth: maxWidth,
				cursor: isHover ? 'pointer' : '',
				borderRadius: borderRadius,
				transition: '0.6s',
				height: heightCard,
				// minHeight: minHeight,
				// maxHeight: maxHeight,
				p: 0,
			}}
			backgroudColor={backgroudColor}
			{...props}
		>
			<Box height={height} minHeight={minHeight} maxHeight={maxHeight} padding={disablePadding ? 0 : padding}>
				{children}
			</Box>

			{isActionSlot ? (
				<>
					<Divider />
					<Box m={disablePadding ? 0 : padding}>{isActionSlot}</Box>
				</>
			) : null}
		</CustomCard>
	);
};

export default memo(MainCard);

interface ICard {
	backgroudColor?: 'primary' | 'primaryLight' | 'white' | 'grey' | 'darkgrey' | 'transparent' | 'common';
	isSelected?: boolean;
}

const CustomCard = styled(Card, {
	shouldForwardProp: (prop) => prop !== 'backgroudColor' && prop !== 'isSelected',
})<ICard>(({ theme, backgroudColor = 'grey', isSelected }) => ({
	borderRadius: TSizes.borderRadiusMd,
	'&.MuiPaper-root': {
		boxShadow: 'none',
		borderColor: theme.palette.divider,

		...(isSelected && {
			border: `1px solid ${setColorThemeMode(theme.palette.primary.dark, theme.palette.primary.dark)}`,
		}),
	},

	...(backgroudColor === 'transparent' && {
		backgroundColor: 'transparent',
	}),

	...(backgroudColor === 'common' && {
		backgroundColor: theme.palette.background.paper,
	}),

	...(backgroudColor === 'primary' && {
		backgroundColor: setColorThemeMode(theme.palette.primary.main, theme.palette.grey[800]),
	}),

	...(backgroudColor === 'primaryLight' && {
		backgroundColor: setColorThemeMode(theme.palette.primary.light, '#322B27'),
	}),

	...(backgroudColor === 'white' && {
		backgroundColor: '#fff',
	}),

	...(backgroudColor === 'grey' && {
		backgroundColor: theme.palette.grey[50],
	}),

	...(backgroudColor === 'darkgrey' && {
		backgroundColor: theme.palette.grey[600],
	}),

	padding: 0,
}));
