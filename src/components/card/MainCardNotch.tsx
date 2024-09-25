'use client';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Card, CardProps, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconNotchCard from '../icons/notch';

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
}

export const MainCardNotch = ({
	children,
	maxWidth,
	backgroudColor = 'white',
	isHover,
	disablePadding,
	padding,
	borderRadius,
	width,
	isSelected,
	height,
	minHeight,
	maxHeight,
	...props
}: IProps) => {
	return (
		<Box width={width} height={height} minHeight={minHeight} maxHeight={maxHeight}>
			<Stack
				display={'inline-flex'}
				flexDirection={'column'}
				width={width}
				height={height}
				minHeight={minHeight}
				maxHeight={maxHeight}
			>
				<IconNotchCard />

				<CustomCard
					elevation={0}
					disablePadding={disablePadding}
					isSelected={isSelected}
					sx={{
						maxWidth: maxWidth,
						cursor: isHover ? 'pointer' : '',
						padding: padding,
						borderRadius: borderRadius,
						transition: '0.6s',
						height: height,
						minHeight: minHeight,
						maxHeight: maxHeight,
					}}
					backgroudColor={backgroudColor}
					{...props}
				>
					{children}
				</CustomCard>
			</Stack>
		</Box>
	);
};

interface ICard {
	backgroudColor?: 'primary' | 'primaryLight' | 'white' | 'grey' | 'darkgrey' | 'transparent' | 'common';
	disablePadding?: boolean;
	isSelected?: boolean;
}

const CustomCard = styled(Card, {
	shouldForwardProp: (prop) => prop !== 'backgroudColor' && prop !== 'disablePadding' && prop !== 'isSelected',
})<ICard>(({ theme, backgroudColor = 'grey', disablePadding, isSelected }) => ({
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

	padding: disablePadding ? 0 : TSizes.card_padding,
}));
