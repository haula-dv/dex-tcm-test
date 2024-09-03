import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack, useTheme } from '@mui/material';
import { useState } from 'react';
import OrderBookContentCustom from './OrderBookContentCustom';
import OrderLastTradeContent from './OrderLastTradeContent';

interface IProps {
	symbol: string;
	onSymbolChange?: (symbol: string) => void;
}

export const OrderBookContainer = ({ symbol }: IProps) => {
	const [value, setValue] = useState('orderbook');

	const handleChange = (newValue: string) => {
		setValue(newValue);
	};

	const tabs = [
		{ label: 'Orderbook', value: 'orderbook' },
		{ label: 'Trades', value: 'trades' },
	];

	return (
		<MainCard backgroudColor="primary" width="100%">
			<Stack direction={'row'} spacing={'6px'} height={'56px'}>
				{tabs.map((item) => (
					<MainButton
						key={item.value}
						fullWidth
						variant={value == item.value ? 'contained' : 'text'}
						color={value == item.value ? 'white' : 'inherit'}
						onClick={() => handleChange(item.value)}
					>
						{item.label}
					</MainButton>
				))}
			</Stack>

			<Box
				sx={{ height: 'calc(-220px + 100vh)', minHeight: 'calc(800px - 20px)', overflowY: 'auto' }}
				bgcolor={useTheme().palette.primary.light}
				borderRadius={TSizes.borderRadius}
				p="10px"
			>
				{value == 'orderbook' && <OrderBookContentCustom symbol={symbol} />}

				{value == 'trades' && <OrderLastTradeContent symbol={symbol} />}
			</Box>
		</MainCard>
	);
};
