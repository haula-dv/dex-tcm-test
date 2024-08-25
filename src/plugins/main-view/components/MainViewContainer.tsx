import { OrderViewContainer } from '@/plugins/main-view/components/order-view/OrderViewContainer';
import { OrderBookContainer } from '@/plugins/main-view/order-book/OrderBookContainer';
import { TradingMainView } from '@/plugins/trading-view/components/TradingView';
import { theme } from '@/utils';
import { Box, Stack } from '@mui/material';
import { AssetAndMarginSheet, Deposit, Divider, SystemStatusBar, Withdraw } from '@orderly.network/react';
import { DepositAndWithdraw } from '@orderly.network/react/esm/block/depositAndwithdraw';
import { CreateOrderContainer } from './create-order/CreateOrderContainer';
import { SymbolHeader } from './SymbolHeader';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

export const MainViewContainer = ({ onSymbolChange, symbol }: IProps) => {
	return (
		<Stack bgcolor={theme.palette.background.paper}>
			<Stack direction={'row'} width={'100%'}>
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
			</Box>
		</Stack>
	);
};
