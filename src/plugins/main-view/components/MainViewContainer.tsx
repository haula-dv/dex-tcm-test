import { TradingMainView } from '@/plugins/trading-view/components/TradingView';
import { theme } from '@/utils';
import { Box, Stack } from '@mui/material';
import { Deposit } from '@orderly.network/react';
import { SymbolHeader } from './SymbolHeader';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

export const MainViewContainer = ({ onSymbolChange, symbol }: IProps) => {
	return (
		<Stack>
			<SymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} />

			<TradingMainView symbol={symbol} />

			<Box px={1} mx={1} bgcolor={theme.palette.background.default} maxWidth={'400px'}>
				<Deposit />
			</Box>

			{/* <Box maxWidth={'400px'} bgcolor={theme.palette.background.paper} p={2}>
				<Deposit />
				<Withdraw />

				<OrderBookContainer />

				<AssetsProvider>
					<OrderEntryContainer />
				</AssetsProvider>
			</Box> */}
		</Stack>
	);
};
