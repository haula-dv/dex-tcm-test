import { IHeadCell } from '@/common';
import MainTable from '@/components/table/MainTable';
import { FormControl, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { useAccountInfo, useOrderStream } from '@orderly.network/hooks';
import { toast } from '@orderly.network/react';
import { AlgoOrderRootType, API, OrderStatus } from '@orderly.network/types';
import { useNotifications } from '@web3-onboard/react';
import { memo, useState } from 'react';
import TPSLOrderItem from './TPSLOrderItem';

interface IProps {
	orderBookStatus: OrderStatus;
	symbol: string;
	isShowAll: boolean;
}

const OrderTableContentTPSL = ({ orderBookStatus, symbol, isShowAll }: IProps) => {
	const [side, setSide] = useState<any>('ALL');
	const [_0, customNotification] = useNotifications();
	const [isLoadingCancel, setIsLoadingCancel] = useState(false);

	const [ordersUntyped, { isLoading }] = useOrderStream({
		symbol: isShowAll ? '' : symbol,
		status: orderBookStatus,
		side: side == 'ALL' ? '' : side,
		includes: [AlgoOrderRootType.TP_SL, AlgoOrderRootType.POSITIONAL_TP_SL],
	});

	const orders = ordersUntyped as (API.Order | API.AlgoOrder)[];

	const { data: accountInfo } = useAccountInfo();

	const handleChange = (event: SelectChangeEvent) => {
		setSide(event.target.value as string);
	};

	const headTable: IHeadCell[] = [
		{ title: 'Symbol' },
		{ title: 'Side' },
		{ title: 'Quantity' },
		{ title: 'Trigger' },
		{ title: 'Price' },
		{ title: 'Notional' },
		{ title: 'Order time', width: 120 },
		{ title: '', width: 100 },
	];

	const cancelTPSLOrder = async (order: any) => {
		// setIsLoadingCancel(true);

		try {
			//
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsLoadingCancel(false);
		}
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
							<TPSLOrderItem
								key={order.isAlgoOrder ? order.order.algo_order_id : order.order.order_id}
								order={order}
								cancelTPSLOrder={cancelTPSLOrder}
								isLoadingCancel={isLoadingCancel}
							/>
						);
					})}
			</MainTable>
		</Stack>
	);
};

export default memo(OrderTableContentTPSL);
