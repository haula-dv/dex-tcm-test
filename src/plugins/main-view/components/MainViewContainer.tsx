import { TradingMainView } from '@/plugins/trading-view/components/TradingView';
import { Box } from '@mui/material';
import { Deposit, Withdraw } from '@orderly.network/react';
import { API } from '@orderly.network/types';
import { OrderBookContainer } from './OrderBook';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: API.Symbol) => void;
}

export const MainViewContainer = ({ onSymbolChange, symbol }: IProps) => {
	return (
		<div>
			<TradingMainView />

			<Box maxWidth={'400px'}>
				<Deposit />
				<Withdraw />

				<OrderBookContainer />
			</Box>
		</div>
	);
};
