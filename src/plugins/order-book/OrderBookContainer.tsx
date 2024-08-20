import { theme } from '@/utils';
import { Box } from '@mui/material';
import { Divider, TabPane, Tabs } from '@orderly.network/react';
import { useState } from 'react';
import { OrderBookContent } from './OrderBookContent';
import { OrderLastTradeContent } from './OrderLastTradeContent';

interface IProps {
	symbol: string;
	onSymbolChange?: (symbol: string) => void;
}

export const OrderBookContainer = ({ symbol }: IProps) => {
	const [value, setValue] = useState('1');

	const handleChange = (newValue: string) => {
		setValue(newValue);
	};

	return (
		<Box
			width={'400px'}
			flexShrink={0}
			borderRight={1}
			borderRadius={0}
			borderColor={theme.palette.divider}
			height={'660px'}
		>
			<Divider />

			<Tabs value={value} onTabChange={handleChange} fullWidth tabBarClassName="orderly-tab-header-orderbook">
				<TabPane title="Orderbook" value="1">
					<OrderBookContent symbol={symbol} />
				</TabPane>

				<TabPane title="Last trades" value="2">
					<OrderLastTradeContent symbol={symbol} />
				</TabPane>
			</Tabs>
		</Box>
	);
};
