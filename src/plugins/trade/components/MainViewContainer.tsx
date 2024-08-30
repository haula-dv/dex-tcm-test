import { MainCard } from '@/components/card/MainCard';
import BoxConnectWallet from '@/plugins/wallet/components/BoxConnectWallet';
import { tradeBodyHeight } from '@/utils/themes/custom-theme/sizes';
import { Grid, Stack } from '@mui/material';
import MarketsContainer from '../markets/components/MarketsContainer';
import MarketSlider from '../markets/MarketSlider';
import { OrderBookContainer } from '../order-book/OrderBookContainer';
import { TradingMainView } from '../trading-view/TradingView';
import CreateOrderForm from './create-order/CreateOrderForm';
import { OrderViewContainer } from './order-view/OrderViewContainer';
import SymbolHeader from './SymbolHeader';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

export const MainViewContainer = ({ onSymbolChange, symbol }: IProps) => {
	return (
		<>
			<MarketSlider />

			<Grid container spacing={'16px'} height={'100%'}>
				<Grid item md={7}>
					<SymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} />

					<MainCard backgroudColor="primary" width="100%" minHeight={tradeBodyHeight}>
						<Stack spacing={'10px'} mb={'10px'} height={'100%'} overflow={'hidden'}>
							<TradingMainView symbol={symbol} onSymbolChange={onSymbolChange} />
							<OrderViewContainer symbol={symbol} />
						</Stack>
					</MainCard>
				</Grid>

				<Grid item md={2.5}>
					<OrderBookContainer symbol={symbol} />
				</Grid>

				<Grid item md={2.5}>
					<Stack spacing={'10px'} minHeight={tradeBodyHeight} height={'100%'}>
						<MarketsContainer onSymbolChange={onSymbolChange} symbol={symbol} />
						<BoxConnectWallet />
						<CreateOrderForm symbol={symbol} />
					</Stack>
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
		</>
	);
};
