'use client';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Card, CardProps, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import IconNotchCard from '../icons/notch';

interface IProps extends CardProps {
	children?: React.ReactNode;
	maxWidth?: string;
	isHover?: boolean;
	backgroudColor?: 'primary' | 'primaryLight' | 'white' | 'grey' | 'darkgrey';
	disablePadding?: boolean;
	padding?: string;
	borderRadius?: string;
	isNotch?: boolean;
	isSelected?: boolean;
	width?: string;
	height?: string;
	minHeight?: string;
	maxHeight?: string;
}

export const MainCard = ({
	children,
	maxWidth,
	backgroudColor = 'white',
	isHover,
	disablePadding,
	padding,
	borderRadius,
	isNotch,
	width,
	isSelected,
	height,
	minHeight,
	maxHeight,
	...props
}: IProps) => {
	const theme = useTheme();

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
				{isNotch && <IconNotchCard />}

				<CustomCard
					elevation={0}
					disablePadding={disablePadding}
					sx={{
						maxWidth: maxWidth,
						cursor: isHover ? 'pointer' : '',
						padding: padding,
						borderRadius: borderRadius,
						border: isSelected ? `1px solid ${theme.palette.primary.dark}` : '',
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
	backgroudColor?: 'primary' | 'primaryLight' | 'white' | 'grey' | 'darkgrey';
	disablePadding?: boolean;
}

const CustomCard = styled(Card, {
	shouldForwardProp: (prop) => prop !== 'backgroudColor' && prop !== 'disablePadding',
})<ICard>(({ theme, backgroudColor = 'grey', disablePadding }) => ({
	borderRadius: TSizes.borderRadiusMd,
	'&.MuiPaper-root': {
		boxShadow: 'none',
	},
	...(backgroudColor === 'primary' && {
		backgroundColor: setColorThemeMode(theme.palette.primary.main, theme.palette.grey[800]),
	}),

	...(backgroudColor === 'primaryLight' && {
		backgroundColor: theme.palette.primary.light,
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
