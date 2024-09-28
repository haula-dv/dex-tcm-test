import { MainButton } from '@/components/button/MainButton';
import { baseFormatter, usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import { API } from '@orderly.network/types';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { match } from 'ts-pattern';

interface IProps {
	order: { isAlgoOrder: false; order: API.Order } | { isAlgoOrder: true; order: API.AlgoOrder };
	symbol: string;
	handleClickOrderItem: (order: any, type: string) => void;
}

const HistoryOrderItem = ({ order, symbol, handleClickOrderItem }: IProps) => {
	const [prep, base, quote] = order.order.symbol.split('_');
	const theme = useTheme();

	const totalEstPrice = useMemo(() => {
		const quantity = order.order.quantity ?? 0;
		const average_executed_price = (order.order as any).average_executed_price ?? 0;

		const total = (quantity * average_executed_price) / 100;
		const totalWithPrecision = Math.floor(total * 100) / 100;

		// Format số với dấu phẩy và 1 chữ số thập phân
		return totalWithPrecision.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	}, [order.order]);

	return (
		<TableRow
			sx={{
				backgroundColor:
					(order.order as any).status === 'CANCELLED'
						? setColorThemeMode(theme.palette.grey[100], '#3f3f3f61')
						: '' || (order.order as any).algo_status === 'CANCELLED'
						? setColorThemeMode(theme.palette.grey[100], '#3f3f3f61')
						: '',

				opacity:
					(order.order as any).status === 'CANCELLED'
						? '0.6'
						: '1' || (order.order as any).algo_status === 'CANCELLED'
						? '0.6'
						: '1',
				'&:hover': {
					backgroundColor:
						(order.order as any).status === 'CANCELLED'
							? `${setColorThemeMode(theme.palette.grey[100], '#3f3f3f61')} !important`
							: '' || (order.order as any).algo_status === 'CANCELLED'
							? `${setColorThemeMode(theme.palette.grey[100], '#3f3f3f61')} !important`
							: '',
				},
			}}
		>
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

			<TableCell> {(order.order as any).realized_pnl}</TableCell>

			<TableCell> {totalEstPrice}</TableCell>

			<TableCell> {order.order.total_fee}</TableCell>

			<TableCell> {(order.order as any).status ?? (order.order as any).algo_status}</TableCell>

			<TableCell width={'200px'}> {dayjs(order.order.created_time).format('YYYY-MM-DD HH:mm')}</TableCell>

			<TableCell align="right" padding="checkbox">
				<Stack direction={'row'}>
					{(order.order as any).status === 'CANCELLED' && (
						<MainButton size="xsmall" variant="outlined" onClick={() => handleClickOrderItem(order, 'renew')}>
							Renew
						</MainButton>
					)}

					{(order.order as any).status == 'NEW' && (
						<MainButton size="xsmall" variant="outlined" onClick={() => handleClickOrderItem(order, 'cancel')}>
							Cancel
						</MainButton>
					)}

					{(order.order as any).algo_status == 'NEW' && (
						<MainButton size="xsmall" variant="outlined" onClick={() => handleClickOrderItem(order, 'cancel')}>
							Cancel
						</MainButton>
					)}
				</Stack>
			</TableCell>
		</TableRow>
	);
};

export default HistoryOrderItem;
