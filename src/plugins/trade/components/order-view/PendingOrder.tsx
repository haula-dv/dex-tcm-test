import { MainButton } from '@/components/button/MainButton';
import { baseFormatter, usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { TableCell, TableRow, Typography, useTheme } from '@mui/material';
import { API } from '@orderly.network/types';
import dayjs from 'dayjs';
import { memo } from 'react';
import { match } from 'ts-pattern';

interface IProps {
	order: { isAlgoOrder: false; order: API.Order } | { isAlgoOrder: true; order: API.AlgoOrder };
	symbol: string;
	handleClickOrderItem: (order: any) => void;
	isHideCancel?: boolean;
}

const PendingOrder = ({ order, symbol, handleClickOrderItem, isHideCancel }: IProps) => {
	const [_, base, quote] = order.order.symbol.split('_');
	const theme = useTheme();

	return (
		<TableRow>
			<TableCell>
				{base} / {quote}
			</TableCell>
			<TableCell>
				{order.isAlgoOrder ? order.order.algo_type : ''} {order.order.type}
			</TableCell>
			<TableCell>
				<Typography
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
				>
					{baseFormatter.format(order.order.quantity)}
				</Typography>
			</TableCell>
			<TableCell>{order.order.price ? usdFormatter.format(order.order.price) : '-'}</TableCell>
			<TableCell> {order.order.trigger_price ? usdFormatter.format(order.order.trigger_price) : '-'}</TableCell>
			<TableCell> {dayjs(order.order.created_time).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
			{!isHideCancel && (
				<TableCell align="right" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<MainButton
						size="xsmall"
						variant="contained"
						color={setColorThemeMode('greyLight', 'inherit')}
						onClick={() => handleClickOrderItem(order)}
					>
						Cancel
					</MainButton>
				</TableCell>
			)}
		</TableRow>
	);
};

export default memo(PendingOrder);
