import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { tradeBodyHeight, TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack } from '@mui/material';
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
		<MainCard backgroudColor="primary" width="100%" minHeight={tradeBodyHeight} height="100%">
			<Box overflow={'hidden'} height={'100%'} borderRadius={TSizes.borderRadius}>
				<Stack direction={'row'} pb={'10px'} spacing={'6px'}>
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

				{value == 'orderbook' && <OrderBookContentCustom symbol={symbol} />}
				{/* {value == 'orderbook' && <OrderBookContent symbol={symbol} />} */}
				{value == 'trades' && <OrderLastTradeContent symbol={symbol} />}
			</Box>
		</MainCard>
	);
};
