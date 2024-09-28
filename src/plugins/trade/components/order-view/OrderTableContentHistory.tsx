import { IHeadCell } from '@/common';
import MainTable from '@/components/table/MainTable';
import { FormControl, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { useOrderStream } from '@orderly.network/hooks';
import { AlgoOrderRootType, API, OrderStatus } from '@orderly.network/types';
import { useNotifications } from '@web3-onboard/react';
import { memo, useState } from 'react';

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
		status: orderBookStatus,
		side: side == 'ALL' ? '' : side,
		excludes: [AlgoOrderRootType.TP_SL, AlgoOrderRootType.POSITIONAL_TP_SL], // Do not show TP/SL orders
	});

	const orders = ordersUntyped as (API.Order | API.AlgoOrder)[];

	const handleChange = (event: SelectChangeEvent) => {
		setSide(event.target.value as string);
	};

	const headTable: IHeadCell[] = [
		{ title: 'Symbol', width: 80 },
		{ title: 'Type', width: 100 },
		{ title: 'Side', width: 80 },
		{ title: 'Quantity', width: 100 },
		{ title: 'Order Price' },
		{ title: 'Avg. price' },
		{ title: 'Trigger' },
		{ title: 'Est. total' },
		{ title: 'Fee' },
		{ title: 'Status' },
		{ title: 'Order time', width: 120 },
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

						return <div key={index}>{index}</div>;
					})}
			</MainTable>
		</Stack>
	);
};

export default memo(OrderTableContentHistory);
