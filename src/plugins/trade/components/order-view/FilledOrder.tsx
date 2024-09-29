import { getDecimalsFromTick } from '@/utils/formatters/api';
import { baseFormatter, usdFormatter } from '@/utils/formatters/number';
import { totalEstPrice } from '@/utils/helpers/format';
import { TableCell, TableRow, Typography, useTheme } from '@mui/material';
import { useSymbolsInfo } from '@orderly.network/hooks';
import { API } from '@orderly.network/types';
import dayjs from 'dayjs';
import { memo } from 'react';
import { match } from 'ts-pattern';

interface IProps {
	order: { isAlgoOrder: false; order: API.Order } | { isAlgoOrder: true; order: API.AlgoOrder };
}

const FilledOrder = ({ order }: IProps) => {
	const [prep, base, quote] = order.order.symbol.split('_');
	const theme = useTheme();

	const symbolsInfo = useSymbolsInfo();
	const symbolInfo = symbolsInfo[order.order.symbol]();
	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

	return (
		<TableRow>
			<TableCell>
				{base}-{prep}
			</TableCell>

			<TableCell>
				{order.isAlgoOrder ? order.order.algo_type : ''} {order.order.type}
			</TableCell>

			<TableCell>
				<Typography
					fontWeight={600}
					color={match(order.order.side)
						.with('BUY', () => theme.palette.success.main)
						.otherwise(() => theme.palette.error.main)}
				>
					{order.order.side}
				</Typography>
			</TableCell>

			<TableCell>
				<Typography
					color={match(order.order.side)
						.with('BUY', () => theme.palette.success.main)
						.otherwise(() => theme.palette.error.main)}
					fontWeight={600}
				>
					{baseFormatter.format(order.order.quantity)}
				</Typography>
			</TableCell>

			<TableCell>
				{order.order.type === 'MARKET' ? 'MARKET' : order.order.price ? usdFormatter.format(order.order.price) : '-'}
			</TableCell>

			<TableCell>
				{' '}
				{(order.order as any).average_executed_price
					? usdFormatter.format((order.order as any).average_executed_price)
					: '_'}{' '}
			</TableCell>

			<TableCell> {order.order.trigger_price ? usdFormatter.format(order.order.trigger_price) : '-'}</TableCell>

			<TableCell>
				{totalEstPrice(order.order.quantity, (order.order as any).average_executed_price ?? 0, baseDecimals)}
			</TableCell>

			<TableCell> {order.order.total_fee}</TableCell>

			<TableCell> {(order.order as any).status}</TableCell>

			<TableCell> {dayjs(order.order.created_time).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
		</TableRow>
	);
};

export default memo(FilledOrder);
