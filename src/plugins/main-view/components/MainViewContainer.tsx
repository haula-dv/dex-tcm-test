import { MainCard } from '@/components/card/MainCard';
import { TradingMainView } from '@/plugins/main-view/trading-view/TradingView';
import BoxConnectWallet from '@/plugins/wallet/components/BoxConnectWallet';
import { tradeBodyHeight } from '@/utils/themes/custom-theme/sizes';
import { Grid, Stack } from '@mui/material';
import MarketsContainer from '../markets/components/MarketsContainer';
import { OrderBookContainer } from '../order-book/OrderBookContainer';
import CreateOrderForm from './create-order/CreateOrderForm';
import { OrderViewContainer } from './order-view/OrderViewContainer';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

export const MainViewContainer = ({ onSymbolChange, symbol }: IProps) => {
	return (
		<Grid container spacing={'16px'} height={tradeBodyHeight}>
			<Grid item md={2.5} height={tradeBodyHeight}>
				<Stack spacing={'10px'} height={'100%'}>
					<MarketsContainer onSymbolChange={onSymbolChange} symbol={symbol} />
					<BoxConnectWallet />
					<CreateOrderForm symbol={symbol} />
				</Stack>
			</Grid>

			<Grid item md={2.5} height={tradeBodyHeight}>
				<OrderBookContainer symbol={symbol} />
			</Grid>

			<Grid item md={7}>
				<MainCard backgroudColor="primary" width="100%" disablePadding>
					<Stack spacing={'10px'} height={'100%'}>
						<TradingMainView symbol={symbol} onSymbolChange={onSymbolChange} />
						<OrderViewContainer symbol={symbol} />
					</Stack>
				</MainCard>
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
