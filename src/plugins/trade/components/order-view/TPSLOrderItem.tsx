import { MainButton } from '@/components/button/MainButton';
import { MainChip } from '@/components/chip/MainChip';
import { usdFormatter } from '@/utils/formatters/number';
import { Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import { useMarkPrice } from '@orderly.network/hooks';
import { API } from '@orderly.network/types';
import dayjs from 'dayjs';
import { useState } from 'react';
import { match } from 'ts-pattern';

interface IProps {
	order: API.AlgoOrder;
	cancelTPSLOrder: (order: any) => Promise<void>;
	onClickItem: (order: API.AlgoOrder, type: string) => void;
}

const TPSLOrderItem = ({ order, cancelTPSLOrder, onClickItem }: IProps) => {
	const [prep, base, quote] = order.symbol.split('_');
	const theme = useTheme();

	const [isLoadingCancel, setIsLoadingCancel] = useState(false);

	const child_orders: any[] = (order as any).child_orders.length > 0 ? (order as any).child_orders : [];

	const isEntriePosition = order.algo_type == 'POSITIONAL_TP_SL';

	const TAKE_PROFIT =
		child_orders.find(
			(item) => item.algo_type === 'TAKE_PROFIT' && item.trigger_price && typeof item.trigger_price == 'number',
		) ?? null;

	const STOP_LOSS =
		child_orders.find(
			(item) => item.algo_type === 'STOP_LOSS' && item.trigger_price && typeof item.trigger_price == 'number',
		) ?? null;

	const STOP_LOSS_N_TAKE_PROFIT: any[] = TAKE_PROFIT != null && STOP_LOSS != null ? child_orders : [];

	const isTPnSL = STOP_LOSS_N_TAKE_PROFIT.length == 2;

	const { data: markPrice } = useMarkPrice(order.symbol);

	const notional = () => {
		const value = order.quantity * markPrice;
		return usdFormatter.format(value);
	};

	const cancelTPSL = async (item: API.AlgoOrder) => {
		setIsLoadingCancel(true);
		await cancelTPSLOrder(item);
		setIsLoadingCancel(false);
	};

	return (
		<TableRow>
			<TableCell>
				<Stack>
					<Typography>
						{base}-{prep}
					</Typography>

					<Stack direction={'row'} spacing={'4px'}>
						{isEntriePosition && <MainChip label={'Position'} size="small" color="info" />}

						{isTPnSL ? (
							<MainChip size="small" label={'TP/SL'} color="default" />
						) : (
							<>
								{TAKE_PROFIT ? <MainChip size="small" label={'TP'} color="default" /> : ''}

								{STOP_LOSS ? <MainChip size="small" label={'TS'} color="default" /> : ''}
							</>
						)}
					</Stack>
				</Stack>
			</TableCell>

			<TableCell>
				<Typography
					fontWeight={600}
					color={match(order.side)
						.with('BUY', () => theme.palette.success.main)
						.otherwise(() => theme.palette.error.main)}
				>
					{order.side}
				</Typography>
			</TableCell>

			<TableCell>{isEntriePosition ? 'Entire position' : order.quantity}</TableCell>

			<TableCell>
				{TAKE_PROFIT && (
					<Typography>
						TP -{' '}
						<span style={{ color: theme.palette.success.main }}>
							{usdFormatter.format(TAKE_PROFIT.trigger_price)}
							{'.00'}
						</span>
					</Typography>
				)}

				{STOP_LOSS && (
					<Typography>
						SL -{' '}
						<span style={{ color: theme.palette.error.main }}>
							{usdFormatter.format(STOP_LOSS.trigger_price)}
							{'.00'}
						</span>
					</Typography>
				)}
			</TableCell>

			<TableCell>
				{TAKE_PROFIT && (
					<Typography>
						TP - <span style={{ color: theme.palette.grey[500] }}>{TAKE_PROFIT.type}</span>
					</Typography>
				)}

				{STOP_LOSS && (
					<Typography>
						SL - <span style={{ color: theme.palette.grey[500] }}>{STOP_LOSS.type}</span>
					</Typography>
				)}
			</TableCell>

			<TableCell>{isEntriePosition ? 'Entire position' : notional()}</TableCell>

			<TableCell> {dayjs(order.created_time).format('YYYY-MM-DD HH:mm:ss')}</TableCell>

			<TableCell align="right" padding="checkbox">
				<Stack direction={'row'} spacing={'6px'}>
					<MainButton size="xsmall" variant="outlined" onClick={() => onClickItem(order, 'edit')}>
						Edit
					</MainButton>

					<MainButton size="xsmall" variant="outlined" onClick={() => cancelTPSL(order)} isLoading={isLoadingCancel}>
						Cancel
					</MainButton>
				</Stack>
			</TableCell>
		</TableRow>
	);
};

export default TPSLOrderItem;
