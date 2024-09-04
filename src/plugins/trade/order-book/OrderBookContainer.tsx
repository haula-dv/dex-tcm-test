import { ITab } from '@/common/types/components/tab';
import { MainCard } from '@/components/card/MainCard';
import MainTab from '@/components/tab/MainTab';
import { TColors } from '@/utils';
import { setColorThemeMode } from '@/utils/helpers';
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
	const [value, setValue] = useState<any>('orderbook');

	const handleChange = (newValue: ITab) => {
		setValue(newValue.value);
	};

	const tabs = [
		{ label: 'Orderbook', value: 'orderbook' },
		{ label: 'Trades', value: 'trades' },
	];

	return (
		<MainCard backgroudColor="primary" width="100%">
			<Stack direction={'row'} spacing={'6px'} height={'56px'} width={'100%'}>
				<MainTab tabs={tabs as any} onChange={handleChange} fullWidth height={TSizes.buttonHeight} />
			</Stack>

			<Box
				sx={{ height: 'calc(-220px + 100vh)', minHeight: 'calc(800px - 20px)', overflowY: 'auto' }}
				bgcolor={setColorThemeMode(useTheme().palette.primary.light, TColors.brownnDark)}
				borderRadius={TSizes.borderRadius}
				p="10px"
			>
				{value == 'orderbook' && <OrderBookContentCustom symbol={symbol} />}

				{value == 'trades' && <OrderLastTradeContent symbol={symbol} />}
			</Box>
		</MainCard>
	);
};
