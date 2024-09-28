import { IHeadCell } from '@/common';
import { BaseSelectField, ISelectFieldValue } from '@/components/form-control/BaseSelectField';
import MainTable from '@/components/table/MainTable';
import { SelectChangeEvent, Stack } from '@mui/material';
import { useOrderEntry, useOrderStream } from '@orderly.network/hooks';
import { toast } from '@orderly.network/react';
import { API, OrderSide, OrderStatus, OrderType } from '@orderly.network/types';
import { useNotifications } from '@web3-onboard/react';
import { memo, useState } from 'react';
import HistoryOrderItem from './HistoryOrderItem';

interface IProps {
	orderBookStatus: OrderStatus;
	symbol: string;
	isShowAll: boolean;
}

const OrderTableContentHistory = ({ orderBookStatus, symbol, isShowAll }: IProps) => {
	const [side, setSide] = useState<any>('ALL');
	const [status, setStatus] = useState<any>('all');
	const [loading, setLoading] = useState(false);
	const [_0, customNotification] = useNotifications();

	const [
		ordersUntyped,
		{ cancelAlgoOrder, cancelOrder, updateOrder, updateAlgoOrder, isLoading, submitting, loadMore, refresh },
	] = useOrderStream({
		symbol: isShowAll ? '' : symbol,
		side: side == 'ALL' ? '' : side,
		status: status == 'all' ? '' : status,
	});

	const { onSubmit } = useOrderEntry(
		{
			order_type: OrderType.LIMIT,
			side: OrderSide.BUY,
			symbol,
			order_quantity: undefined,
			order_price: undefined,
		},
		{ watchOrderbook: true },
	);

	const orders = ordersUntyped as (API.Order | API.AlgoOrder)[];

	const handleChange = (event: SelectChangeEvent) => {
		setSide(event.target.value as string);
	};

	const headTable: IHeadCell[] = [
		{ title: 'Symbol', width: 60 },
		{ title: 'Type', width: 50 },
		{ title: 'Side', width: 50 },
		{ title: 'Quantity' },
		{ title: 'Price' },
		{ title: 'Avg.' },
		{ title: 'Trigger' },
		{ title: 'Realized PnL', width: 100 },
		{ title: 'Est. total' },
		{ title: 'Fee' },
		{ title: 'Status', width: 50 },
		{ title: 'Time', width: 100 },
		{ title: '', width: 10 },
	];

	const handleClickOrderItem = async (
		value: { isAlgoOrder: false; order: API.Order } | { isAlgoOrder: true; order: API.AlgoOrder },
		type: string,
	) => {
		if (type == 'renew') {
			try {
				await onSubmit({
					order_type: value.order.type as any,
					side: value.order.side as any,
					symbol: value.order.symbol,
					order_price: value.order.price as any,
					order_quantity: value.order.quantity as any,
				});

				toast.success('Order opened!');
			} catch (error: any) {
				toast.error('The order does not meet the price scope requirement.');
			} finally {
				refresh();
			}
		} else if ('cancel') {
			setLoading(true);

			try {
				if (value.isAlgoOrder) {
					await cancelAlgoOrder(value.order.algo_order_id, symbol);
				} else {
					await cancelOrder(value.order.order_id, symbol);
				}

				toast.success('Order canceled!');
			} catch (err: any) {
				toast.error(err.message);
			} finally {
				setLoading(false);
				refresh();
			}
		}
	};

	const items: ISelectFieldValue[] = [
		{ label: 'All', value: 'ALL' },
		{ label: 'Buy', value: 'BUY' },
		{ label: 'Sell', value: 'SELL' },
	];

	const statusOpts: ISelectFieldValue[] = [
		{ label: 'All Status', value: 'all' },
		{ label: 'Open', value: 'OPEN' },
		{ label: 'New', value: 'NEW' },
		{ label: 'Filled', value: 'FILLED' },
		{ label: 'Partial Filled', value: 'PARTIAL_FILLED' },
		{ label: 'Cancelled', value: 'CANCELLED' },
		{ label: 'Replaced', value: 'REPLACED' },
		{ label: 'Completed', value: 'COMPLETED' },
		{ label: 'InComplete', value: 'INCOMPLETE' },
		{ label: 'Rejcted', value: 'REJECTED' },
	];

	return (
		<Stack p={1}>
			<Stack pb="10px" direction={'row'} spacing={'10px'}>
				<BaseSelectField options={items} width="100px" handleChange={(val) => setSide(val)} />

				<BaseSelectField options={statusOpts} width="100px" handleChange={(val) => setStatus(val)} />
			</Stack>

			<MainTable headTable={headTable} isEmpty={orders && orders.length > 0 ? false : true} isLoading={isLoading}>
				{orders &&
					orders.length > 0 &&
					orders.map((item, index) => {
						let order: { isAlgoOrder: false; order: API.Order } | { isAlgoOrder: true; order: API.AlgoOrder };
						if ((item as API.Order).algo_order_id) {
							order = { isAlgoOrder: true, order: item as API.AlgoOrder };
						} else {
							order = { isAlgoOrder: false, order: item as API.Order };
						}

						return (
							<HistoryOrderItem
								key={order.isAlgoOrder ? order.order.algo_order_id : order.order.order_id}
								order={order}
								handleClickOrderItem={handleClickOrderItem}
								symbol={symbol}
							/>
						);
					})}
			</MainTable>
		</Stack>
	);
};

export default memo(OrderTableContentHistory);
