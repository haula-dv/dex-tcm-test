import { MainButton } from '@/components/button/MainButton';
import { baseFormatter, usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { TableCell, TableRow } from '@mui/material';
import { API } from '@orderly.network/types';
import dayjs from 'dayjs';
import { memo } from 'react';

interface IProps {
	order: { isAlgoOrder: false; order: API.Order } | { isAlgoOrder: true; order: API.AlgoOrder };
	symbol: string;
	handleClickOrderItem: (order: any) => void;
	isHideCancel?: boolean;
}

const PendingOrder = ({ order, symbol, handleClickOrderItem, isHideCancel }: IProps) => {
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
