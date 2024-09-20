import { IHeadCell } from '@/common';
import { MainButton } from '@/components/button/MainButton';
import { MainDialog } from '@/components/dialog/MainDialog';
import MainTable from '@/components/table/MainTable';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useOrderStream } from '@orderly.network/hooks';
import { API, OrderStatus } from '@orderly.network/types';
import { useNotifications } from '@web3-onboard/react';
import { memo, useState } from 'react';
import PendingOrder from './PendingOrder';

interface IProps {
	orderBookStatus: OrderStatus;
	symbol: string;
}

const OrderTableContent = ({ orderBookStatus, symbol }: IProps) => {
	const [side, setSide] = useState<any>('ALL');
	const [loading, setLoading] = useState(false);

	const [currentOrder, setCurrentOrder] = useState<any>(null);
	const [openModalConfirm, setOpenModalConfirm] = useState(false);
	const [_0, customNotification] = useNotifications();

	const [
		data,
		{
			updateOrder,
			cancelAlgoOrder,
			cancelAlgoOrdersByTypes,
			cancelAllOrders,
			cancelAllTPSLOrders,
			cancelOrder,
			cancelTPSLChildOrder,
			errors,
			isLoading,
			loadMore,
			refresh,
			updateAlgoOrder,
			updateTPSLOrder,
		},
	] = useOrderStream({ status: orderBookStatus, side: side == 'ALL' ? '' : side });

	const handleChange = (event: SelectChangeEvent) => {
		setSide(event.target.value as string);
	};

	const handleClickOrderItem = (order: any) => {
		setCurrentOrder(order);
		setOpenModalConfirm(true);
	};

	const handleClose = () => {
		setCurrentOrder(null);
		setOpenModalConfirm(false);
	};

	const onHandleCancelOrder = async () => {
		setLoading(true);
		const { update } = customNotification({
			eventCode: 'cancelOrder',
			type: 'pending',
			message: 'Cancelling order...',
		});
		try {
			if (currentOrder.isAlgoOrder) {
				await cancelAlgoOrder(currentOrder.order.algo_order_id, symbol);
			} else {
				await cancelOrder(currentOrder.order.order_id, symbol);
			}
			update({
				eventCode: 'cancelOrderSuccess',
				type: 'success',
				message: 'Successfully cancelled order!',
				autoDismiss: 5_000,
			});
		} catch (err) {
			console.error(err);
			update({
				eventCode: 'cancelOrderError',
				type: 'error',
				message: 'Cancelling order failed!',
				autoDismiss: 5_000,
			});
		} finally {
			setLoading(false);
			refresh();
			handleClose();
		}
	};

	const headTable: IHeadCell[] = [
		{ title: 'Symbol' },
		{ title: 'Type' },
		{ title: 'Side' },
		{ title: 'Quantity' },
		{ title: 'Price', hint: 'Unreal. PnL' },
		{ title: 'Trigger' },
		{ title: 'Order time' },
	];

	const headTableNew: IHeadCell[] = [
		{ title: 'Symbol' },
		{ title: 'Type' },
		{ title: 'Side' },
		{ title: 'Quantity' },
		{ title: 'Price', hint: 'Unreal. PnL' },
		{ title: 'Trigger' },
		{ title: 'Order time' },
		{ title: '', align: 'right' },
	];

	return (
		<Stack p={1}>
			<FormControl sx={{ maxWidth: '100px', pb: 1 }}>
				<Select size="small" labelId="side-select-label" id="side-select" value={side} onChange={handleChange}>
					<MenuItem value={'ALL'}>All</MenuItem>
					<MenuItem value={'BUY'}>Buy</MenuItem>
					<MenuItem value={'SELL'}>Sell</MenuItem>
				</Select>
			</FormControl>

			<MainTable
				headTable={orderBookStatus === 'INCOMPLETE' ? headTableNew : (headTable as any)}
				isEmpty={data && data.length > 0 ? false : true}
			>
				{data &&
					data.length > 0 &&
					data.map((item, index) => {
						let order: { isAlgoOrder: false; order: API.Order } | { isAlgoOrder: true; order: API.AlgoOrder };
						if ((item as API.Order).algo_order_id) {
							order = { isAlgoOrder: true, order: item as API.AlgoOrder };
						} else {
							order = { isAlgoOrder: false, order: item as API.Order };
						}

						return (
							<PendingOrder
								key={order.isAlgoOrder ? order.order.algo_order_id : order.order.order_id}
								order={order}
								symbol={symbol}
								isHideCancel={orderBookStatus === 'INCOMPLETE' ? false : true}
								handleClickOrderItem={handleClickOrderItem}
							/>
						);
					})}
			</MainTable>

			<MainDialog open={openModalConfirm} handleClose={handleClose} title="Cancel order" maxWidth="xs" isDivider>
				<Typography py={4}>Are you really sure, that you want to cancel this order?</Typography>

				<Stack direction={'row'} spacing={TSizes.margin_common} justifyContent={'flex-end'}>
					<MainButton variant="contained" color="error" onClick={handleClose} size="small">
						No
					</MainButton>

					<MainButton
						variant="contained"
						color="success"
						size="small"
						onClick={onHandleCancelOrder}
						isLoading={loading}
						disabled={loading}
					>
						Yes
					</MainButton>
				</Stack>
			</MainDialog>
		</Stack>
	);
};

export default memo(OrderTableContent);
