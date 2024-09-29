import { MainIconButton } from '@/components/button/MainIconButton';
import { MainPopup } from '@/components/popup/MainPopup';
import { getDecimalsFromTick } from '@/utils/formatters/api';
import { baseFormatter, usdFormatter } from '@/utils/formatters/number';
import { MenuItem, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import { useSymbolsInfo } from '@orderly.network/hooks';
import { API } from '@orderly.network/types';
import { IconCancel, IconDots, IconEdit } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { memo, useState } from 'react';
import { match } from 'ts-pattern';

interface IProps {
	order: { isAlgoOrder: false; order: API.Order } | { isAlgoOrder: true; order: API.AlgoOrder };
	symbol: string;
	handleClickOrderItem: (order: any, type: string) => void;
}

const PendingOrder = ({ order, symbol, handleClickOrderItem }: IProps) => {
	const [prep, base, quote] = order.order.symbol.split('_');
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (type: string) => {
		setAnchorEl(null);
		handleClickOrderItem(order, type);
	};

	const symbolsInfo = useSymbolsInfo();
	const symbolInfo = symbolsInfo[order.order.symbol]();
	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

	const totalEstPrice = (quantity: number, price: number, baseDecimals: number) => {
		const total = quantity * price;
		return total ? total.toLocaleString() : '--';
	};

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

			<TableCell>{totalEstPrice(order.order.quantity, order.order.price ?? 0, quoteDecimals)}</TableCell>

			<TableCell> {order.order.total_fee}</TableCell>

			<TableCell> {dayjs(order.order.created_time).format('YYYY-MM-DD HH:mm:ss')}</TableCell>

			<TableCell align="right" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<MainIconButton
					size="small"
					id="order-button"
					aria-controls={open ? 'order-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					<IconDots size={'1rem'} />
				</MainIconButton>
			</TableCell>

			<MainPopup
				id="order-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={() => handleClose('close')}
				MenuListProps={{
					'aria-labelledby': 'order-button',
				}}
			>
				<MenuItem onClick={() => handleClose('update')}>
					<IconEdit size={'0.9rem'} />
					<Typography pl={'10px'}>Update</Typography>
				</MenuItem>

				<MenuItem onClick={() => handleClose('cancel')}>
					<IconCancel size={'0.9rem'} />
					<Typography pl={'10px'}>Cancel</Typography>
				</MenuItem>
			</MainPopup>
		</TableRow>
	);
};

export default memo(PendingOrder);
