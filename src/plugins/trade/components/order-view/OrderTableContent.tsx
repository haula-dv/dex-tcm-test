import MainTable from '@/components/table/MainTable';
import { FormControl, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { useOrderStream } from '@orderly.network/hooks';
import { API, OrderStatus } from '@orderly.network/types';
import { memo, useState } from 'react';
import PendingOrder from './PendingOrder';

interface IProps {
	orderBookStatus: OrderStatus;
	symbol: string;
}

const OrderTableContent = ({ orderBookStatus, symbol }: IProps) => {
	const [side, setSide] = useState<any>('ALL');

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

	return (
		<Stack p={1}>
			<FormControl sx={{ maxWidth: '100px', pb: 1 }}>
				<Select size="small" labelId="side-select-label" id="side-select" value={side} onChange={handleChange}>
					<MenuItem value={'ALL'}>All</MenuItem>
					<MenuItem value={'BUY'}>Buy</MenuItem>
					<MenuItem value={'SELL'}>Sell</MenuItem>
				</Select>
			</FormControl>

			<MainTable headTable={headTable} isEmpty={data && data.length > 0 ? false : true}>
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
								cancelOrder={cancelOrder}
								cancelAlgoOrder={cancelAlgoOrder}
							/>
						);
					})}
			</MainTable>
		</Stack>
	);
};

export default memo(OrderTableContent);

const headTable = [
	{ title: 'Symbol', dataIndex: '1' },
	{ title: 'Type', dataIndex: '2' },
	{ title: 'Side', dataIndex: '3' },
	{ title: 'Quantity', dataIndex: '4' },
	{ title: 'Price', dataIndex: '5', hint: 'Unreal. PnL' },
	{ title: 'Trigger Price	', dataIndex: '7' },
];
