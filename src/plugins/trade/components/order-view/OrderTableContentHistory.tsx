import { IHeadCell } from '@/common';
import MainTable from '@/components/table/MainTable';
import { FormControl, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { useOrderStream } from '@orderly.network/hooks';
import { API, OrderStatus } from '@orderly.network/types';
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
	const [loading, setLoading] = useState(false);
	const [currentOrder, setCurrentOrder] = useState<any>(null);
	const [openModalConfirm, setOpenModalConfirm] = useState(false);
	const [isOpenModalUpdate, setIsOpenUpdate] = useState(false);
	const [_0, customNotification] = useNotifications();

	const [
		ordersUntyped,
		{ cancelAlgoOrder, cancelOrder, updateOrder, updateAlgoOrder, isLoading, submitting, loadMore, refresh },
	] = useOrderStream({
		symbol: isShowAll ? '' : symbol,
		side: side == 'ALL' ? '' : side,
	});

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
		{ title: 'Realized PnL' },
		{ title: 'Est. total' },
		{ title: 'Fee' },
		{ title: 'Status' },
		{ title: 'Time' },
		{ title: '', width: 50 },
	];

	const handleClickOrderItem = (value: any): any => {};

	return (
		<Stack p={1}>
			<FormControl sx={{ maxWidth: '100px', pb: 1 }}>
				<Select size="small" labelId="side-select-label" id="side-select" value={side} onChange={handleChange}>
					<MenuItem value={'ALL'}>All</MenuItem>
					<MenuItem value={'BUY'}>Buy</MenuItem>
					<MenuItem value={'SELL'}>Sell</MenuItem>
				</Select>
			</FormControl>

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
