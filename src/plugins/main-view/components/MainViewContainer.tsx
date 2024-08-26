import BoxConnectWallet from '@/plugins/wallet/components/BoxConnectWallet';
import { Grid, Stack } from '@mui/material';
import MarketsContainer from '../markets/components/MarketsContainer';
import { OrderBookContainer } from '../order-book/OrderBookContainer';
import CreateOrderForm from './create-order/CreateOrderForm';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

export const MainViewContainer = ({ onSymbolChange, symbol }: IProps) => {
	return (
		<Grid container pt={'48px'} spacing={'16px'} height={'calc(100vh - 68px)'}>
			<Grid item md={3.5}>
				<Stack spacing={'10px'} height={'100%'}>
					<MarketsContainer onSymbolChange={onSymbolChange} symbol={symbol} />
					<BoxConnectWallet />
					<CreateOrderForm symbol={symbol} />
				</Stack>
			</Grid>

			<Grid item md={3.5}>
				<OrderBookContainer symbol={symbol} />
			</Grid>

			{/* <Stack direction={'row'} width={'100%'}>
				<Stack width={'100%'}>
					<Stack direction={'row'} width={'100%'}>
						<Box width={'100%'}>
							<SymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} />

							<TradingMainView symbol={symbol} />
						</Box>

						<OrderBookContainer symbol={symbol} />
					</Stack>

					<Divider />

					<OrderViewContainer symbol={symbol} />

					<SystemStatusBar />
				</Stack>

				<CreateOrderContainer symbol={symbol} />
			</Stack>

			<Box px={1} bgcolor={theme.palette.background.default}>
				More
				<Stack maxWidth={'400px'} spacing={2}>
					<Box bgcolor={theme.palette.grey[800]}>
						<Deposit />
					</Box>
					<Withdraw />
					<AssetAndMarginSheet />
					<DepositAndWithdraw activeTab="deposit" />
				</Stack>
			</Box> */}
		</Grid>
	);
};
