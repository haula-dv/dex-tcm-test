import { MainButton } from '@/components/button/MainButton';
import { MainChip } from '@/components/chip/MainChip';
import { usdFormatter } from '@/utils/formatters/number';
import { Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import { API } from '@orderly.network/types';
import dayjs from 'dayjs';
import { memo, useState } from 'react';
import { match } from 'ts-pattern';

interface IProps {
	order: { isAlgoOrder: false; order: API.Order } | { isAlgoOrder: true; order: API.AlgoOrder };
	cancelTPSLOrder: (order: any) => void;
	isLoadingCancel: boolean;
}

const TPSLOrderItem = ({ order, cancelTPSLOrder, isLoadingCancel }: IProps) => {
	const [prep, base, quote] = order.order.symbol.split('_');
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (type: string) => {
		setAnchorEl(null);
		// handleClickOrderItem(order, type);
	};

	const [POSITIONAL, TP, SL] = (order.order as any).algo_type.split('_');

	const isShowLine2 = (order.order as any).child_orders[1].trigger_price ? true : false;
	const isShowLine1 = (order.order as any).child_orders[0].trigger_price ? true : false;

	return (
		<TableRow>
			<TableCell>
				<Stack>
					<Typography>
						{base}-{prep}
					</Typography>

					<Stack direction={'row'} spacing={'4px'}>
						<MainChip size="small" color="success" label={POSITIONAL} />
						{isShowLine1 && <MainChip size="small" label={`${TP}`} color="default" />}
						{isShowLine2 && <MainChip size="small" label={`${SL}`} color="default" />}
						{isShowLine1 && isShowLine2 && <MainChip size="small" label={`${TP}/${SL}`} color="default" />}
					</Stack>
				</Stack>
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

			<TableCell>Entire position</TableCell>

			<TableCell>
				{isShowLine1 && (
					<Typography>
						{TP} -{' '}
						<span style={{ color: theme.palette.success.main }}>
							{usdFormatter.format((order.order as any).child_orders[0].trigger_price)}
							{'.00'}
						</span>
					</Typography>
				)}

				{isShowLine2 && (
					<Typography>
						{SL} -{' '}
						<span style={{ color: theme.palette.error.main }}>
							{usdFormatter.format((order.order as any).child_orders[1].trigger_price)}
							{'.00'}
						</span>
					</Typography>
				)}
			</TableCell>

			<TableCell>
				{isShowLine1 && (
					<Typography>
						{TP} - <span style={{ color: theme.palette.grey[500] }}>Market</span>
					</Typography>
				)}

				{isShowLine2 && (
					<Typography>
						{SL} - <span style={{ color: theme.palette.grey[500] }}>Market</span>
					</Typography>
				)}
			</TableCell>

			<TableCell>Entire position</TableCell>

			<TableCell> {dayjs(order.order.created_time).format('YYYY-MM-DD HH:mm:ss')}</TableCell>

			<TableCell align="right" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Stack direction={'row'} spacing={'6px'}>
					<MainButton size="xsmall" variant="outlined">
						Edit
					</MainButton>

					<MainButton
						size="xsmall"
						variant="outlined"
						onClick={() => cancelTPSLOrder(order.order)}
						isLoading={isLoadingCancel}
					>
						Cancel
					</MainButton>
				</Stack>
			</TableCell>
		</TableRow>
	);
};

export default memo(TPSLOrderItem);
