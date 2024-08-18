'use client';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Card, CardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IProps extends CardProps {
	children?: React.ReactNode;
	maxWidth?: string;
	isHover?: boolean;
	backgroudColor?: 'white' | 'grey' | 'darkgrey';
	disablePadding?: boolean;
	padding?: string;
	borderRadius?: string;
}

export const MainCard = ({
	children,
	maxWidth,
	backgroudColor = 'darkgrey',
	isHover,
	disablePadding,
	padding,
	borderRadius,
	...props
}: IProps) => {
	return (
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
	);
};

interface ICard {
	backgroudColor?: 'white' | 'grey' | 'darkgrey';
	disablePadding?: boolean;
}

const CustomCard = styled(Card, {
	shouldForwardProp: (prop) => prop !== 'backgroudColor' && prop !== 'disablePadding',
})<ICard>(({ theme, backgroudColor = 'grey', disablePadding }) => ({
	borderRadius: TSizes.borderRadiusMd,
	'&.MuiPaper-root': {
		boxShadow: 'none',
	},
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
