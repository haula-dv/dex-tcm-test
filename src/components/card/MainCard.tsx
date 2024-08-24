'use client';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Card, CardProps, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconNotchCard from '../icons/notch';

interface IProps extends CardProps {
	children?: React.ReactNode;
	maxWidth?: string;
	isHover?: boolean;
	backgroudColor?: 'primary' | 'white' | 'grey' | 'darkgrey';
	disablePadding?: boolean;
	padding?: string;
	borderRadius?: string;
	isNotch?: boolean;
	width?: string;
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
	...props
}: IProps) => {
	return (
		<Box width={width}>
			<Stack display={'inline-flex'} flexDirection={'column'} width={width}>
				{isNotch && <IconNotchCard />}

				<CustomCard
					elevation={0}
					disablePadding={disablePadding}
					sx={{
						maxWidth: maxWidth,
						cursor: isHover ? 'pointer' : '',
						padding: padding,
						borderRadius: borderRadius,
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
	backgroudColor?: 'primary' | 'white' | 'grey' | 'darkgrey';
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
		backgroundColor: theme.palette.primary.main,
	}),

	...(backgroudColor === 'white' && {
		backgroundColor: '#fff',
	}),

	...(backgroudColor === 'grey' && {
		backgroundColor: theme.palette.grey[50],
	}),

	...(backgroudColor === 'darkgrey' && {
		backgroundColor: theme.palette.grey[900],
	}),
	padding: disablePadding ? 0 : TSizes.margin_base,
}));
