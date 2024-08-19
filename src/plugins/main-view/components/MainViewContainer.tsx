import { TradingMainView } from '@/plugins/trading-view/components/TradingView';
import { theme } from '@/utils';
import { Box, Grid } from '@mui/material';
import { Deposit } from '@orderly.network/react';
import { API } from '@orderly.network/types';
import { SymbolHeader } from './SymbolHeader';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: API.Symbol) => void;
}

export const MainViewContainer = ({ onSymbolChange, symbol }: IProps) => {
	return (
		<Grid container>
			<Grid item md={3}>
				<Box px={1} mx={1} bgcolor={theme.palette.background.default}>
					<Deposit />
				</Box>
			</Grid>

			<Grid item md={9}>
				<SymbolHeader />

				<TradingMainView />
			</Grid>

			{/* <Box maxWidth={'400px'} bgcolor={theme.palette.background.paper} p={2}>
				<Deposit />
				<Withdraw />

				<OrderBookContainer />

				<AssetsProvider>
					<OrderEntryContainer />
				</AssetsProvider>
			</Box> */}
		</Grid>
	);
};
