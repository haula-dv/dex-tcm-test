import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Stack } from '@mui/material';
import { useState } from 'react';

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
		<MainCard backgroudColor="primary" width="100%" height={TSizes.tradeBodyHeight}>
			<Stack direction={'row'} pb={'16px'} spacing={'6px'}>
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

			{/* {value == 'orderbook' && <OrderBookContentCustom symbol={symbol} />} */}
			{/* {value == 'trades' && <OrderLastTradeContent symbol={symbol} />} */}
		</MainCard>
	);
};
