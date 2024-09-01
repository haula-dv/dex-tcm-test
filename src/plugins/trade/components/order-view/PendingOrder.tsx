import { baseFormatter, usdFormatter } from '@/utils/formatters/number';
import { TableCell, TableRow } from '@mui/material';
import { useOrderStream } from '@orderly.network/hooks';
import { API } from '@orderly.network/types';
import { memo } from 'react';

interface IProps {
	order: { isAlgoOrder: false; order: API.Order } | { isAlgoOrder: true; order: API.AlgoOrder };
	symbol: string;
	cancelOrder: ReturnType<typeof useOrderStream>[1]['cancelOrder'];
	cancelAlgoOrder: ReturnType<typeof useOrderStream>[1]['cancelAlgoOrder'];
}

const PendingOrder = ({ order, symbol, cancelOrder, cancelAlgoOrder }: IProps) => {
	const [_, base, quote] = order.order.symbol.split('_');

	return (
		<TableRow>
			<TableCell>
				{base} / {quote}
			</TableCell>
			<TableCell>
				{order.isAlgoOrder ? order.order.algo_type : ''} {order.order.type}
			</TableCell>
			<TableCell>{order.order.side}</TableCell>
			<TableCell>{baseFormatter.format(order.order.quantity)}</TableCell>
			<TableCell>{order.order.price ? usdFormatter.format(order.order.price) : '-'}</TableCell>
			<TableCell> {order.order.trigger_price ? usdFormatter.format(order.order.trigger_price) : '-'}</TableCell>
			<TableCell> {order.order.trigger_price ? usdFormatter.format(order.order.trigger_price) : '-'}</TableCell>
		</TableRow>
	);
};

export default memo(PendingOrder);
