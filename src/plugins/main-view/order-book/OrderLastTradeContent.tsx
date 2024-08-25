import { Box } from '@mui/material';
import { useMarketTradeStream } from '@orderly.network/hooks';
import { TradeHistory } from '@orderly.network/react';

interface IProps {
	symbol: string;
}

export const OrderLastTradeContent = ({ symbol }: IProps) => {
	const { data: tradeHistory, isLoading: tradeHistoryLoading } = useMarketTradeStream(symbol);

	return (
		<Box height={'600px'}>
			<TradeHistory dataSource={tradeHistory} loading={tradeHistoryLoading} />;
		</Box>
	);
};
