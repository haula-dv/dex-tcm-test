import { OrderBookContainer } from '@/plugins/order-book/OrderBookContainer';
import { OrderViewContainer } from '@/plugins/order-view/OrderViewContainer';
import { TradingMainView } from '@/plugins/trading-view/components/TradingView';
import { theme } from '@/utils';
import { Box, Stack } from '@mui/material';
import { Divider, SystemStatusBar } from '@orderly.network/react';
import { CreateOrderContainer } from './create-order/CreateOrderContainer';
import { SymbolHeader } from './SymbolHeader';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

export const MainViewContainer = ({ onSymbolChange, symbol }: IProps) => {
	return (
		<Stack bgcolor={theme.palette.background.paper}>
			<Stack direction={'row'}>
				<Box width={'100%'}>
					<SymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} />

					<TradingMainView symbol={symbol} />
				</Box>

				<OrderBookContainer symbol={symbol} />

				<CreateOrderContainer symbol={symbol} />
			</Stack>

			<Box px={1} bgcolor={theme.palette.background.default}>
				{/* <Box maxWidth={'400px'}>
					<Deposit />
					<AssetAndMarginSheet />
					<Withdraw />
					<WalletConnect status={1} />
					<DepositAndWithdraw activeTab="deposit" />
					</Box> */}
			</Box>

			<Divider />
			<OrderViewContainer symbol={symbol} />
			{/* <PositionMainView symbol={symbol} /> */}
			<SystemStatusBar />
		</Stack>
	);
};
