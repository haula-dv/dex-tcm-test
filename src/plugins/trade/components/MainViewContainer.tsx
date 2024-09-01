import { MainCard } from '@/components/card/MainCard';
import { Box, Grid, Stack } from '@mui/material';
import MarketSlider from '../markets/MarketSlider';
import { TradingMainView } from '../trading-view/TradingView';
import SymbolHeader from './SymbolHeader';
import { OrderViewContainer } from './order-view/OrderViewContainer';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

export const MainViewContainer = ({ onSymbolChange, symbol }: IProps) => {
	return (
		<Box>
			<MarketSlider />

			<Grid container spacing={'16px'} height={'100%'} sx={{ display: 'flex' }}>
				<Grid item md={7} sx={{ display: 'flex', flexDirection: 'column' }}>
					<Box>
						<SymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} />

						<MainCard backgroudColor="primary" width="100%">
							<Box sx={{ height: 'calc(-200px + 100vh)', minHeight: '800px' }}>
								<Box height={'100%'} display={'flex'} flexDirection={'column'}>
									<TradingMainView symbol={symbol} onSymbolChange={onSymbolChange} />
									<OrderViewContainer symbol={symbol} />
								</Box>
							</Box>
						</MainCard>
					</Box>
				</Grid>

				<Grid item md={2.5} sx={{ display: 'flex', flexDirection: 'column', height: 'auto' }}>
					{/* <OrderBookContainer symbol={symbol} /> */}
				</Grid>

				<Grid item md={2.5}>
					<Stack spacing={'10px'} height={'100%'}>
						{/* <MarketsContainer onSymbolChange={onSymbolChange} symbol={symbol} />
						<BoxConnectWallet />
						<CreateOrderForm symbol={symbol} /> */}
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
};
