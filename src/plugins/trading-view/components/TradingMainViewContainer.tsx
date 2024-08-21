import { OrderlyConfig } from '@/utils/config/orderly';
import { Box } from '@mui/material';
import { TradingPage } from '@orderly.network/react';
import { API } from '@orderly.network/types';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: API.Symbol) => void;
}
export const TradingMainViewContainer = ({ onSymbolChange, symbol }: IProps) => {
	const { tradingViewConfig } = OrderlyConfig();

	return (
		<Box height={'100vh'}>
			<TradingPage symbol={symbol} tradingViewConfig={tradingViewConfig} onSymbolChange={onSymbolChange} />
		</Box>
	);
};
