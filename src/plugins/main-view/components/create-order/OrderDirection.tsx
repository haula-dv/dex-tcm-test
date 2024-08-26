import { theme } from '@/utils';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { WalletState } from '@orderly.network/hooks/esm/walletConnectorContext';
import { memo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Inputs } from './CreateOrderForm';

interface IProps {
	formContext: UseFormReturn<Inputs>;
	wallet: WalletState | null;
}

const OrderDirection = ({ formContext, wallet }: IProps) => {
	const [currentDirection, setCurrentDirection] = useState('Buy');

	const handleChangeDirection = (side: any) => {
		formContext.setValue('direction', side);
		setCurrentDirection(side);
	};

	return (
		<Stack direction={'row'} spacing={1} bgcolor={theme.palette.grey[50]} borderRadius={TSizes.borderRadius}>
			{['Buy', 'Sell'].map((label, index) => (
				<TabItem
					key={index}
					fullWidth
					color="inherit"
					selected={currentDirection === label}
					onClick={() => handleChangeDirection(label)}
				>
					{label}
				</TabItem>
			))}
		</Stack>
	);
};

export default memo(OrderDirection);

interface IITabItem {
	selected: boolean;
}

const TabItem = styled(Button, { shouldForwardProp: (prop) => prop !== 'selected' })<IITabItem>(
	({ theme, selected }) => ({
		transition: '0.6s',
		backgroundColor: theme.palette.grey[50],
		color: theme.palette.grey[500],
		border: `1px solid ${theme.palette.grey[50]}`,
		fontSize: '13px',
		minHeight: TSizes.buttonHeightSmall,
		height: TSizes.buttonHeightSmall,

		...(selected && {
			borderColor: theme.palette.success.main,
			color: theme.palette.success.main,
		}),
		'&:hover': {
			backgroundColor: theme.palette.grey[50],
		},
	}),
);
