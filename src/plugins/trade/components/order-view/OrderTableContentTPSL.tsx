import { IHeadCell } from '@/common';
import MainTable from '@/components/table/MainTable';
import { signAndSendRequest } from '@/utils/config/signer';
import { getBaseUrl } from '@/utils/constants/orderly';
import { loadOrderlyKey } from '@/utils/helpers/orderlyHelper';
import { FormControl, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { useAccount, useOrderStream } from '@orderly.network/hooks';
import { toast } from '@orderly.network/react';
import { AlgoOrderRootType, API, OrderStatus } from '@orderly.network/types';
import { memo, useState } from 'react';
import TPSLOrderItem from './TPSLOrderItem';

interface IProps {
	orderBookStatus: OrderStatus;
	symbol: string;
	isShowAll: boolean;
}

const OrderTableContentTPSL = ({ orderBookStatus, symbol, isShowAll }: IProps) => {
	const [side, setSide] = useState<any>('ALL');

	const [ordersUntyped, { isLoading }] = useOrderStream({
		symbol: isShowAll ? '' : symbol,
		status: orderBookStatus,
		side: side == 'ALL' ? '' : side,
		includes: [AlgoOrderRootType.TP_SL, AlgoOrderRootType.POSITIONAL_TP_SL],
	});

	const orders = ordersUntyped as API.AlgoOrder[];

	const { account: accountInfo } = useAccount();

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
		try {
			const orderlyAccountId = accountInfo?.accountId;

			if (!orderlyAccountId) {
				return;
			}

			const orderlyKey: any = loadOrderlyKey(accountInfo.address ?? '');

			await signAndSendRequest(
				orderlyAccountId ?? '',
				orderlyKey,
				`${getBaseUrl()}/algo/order?order_id=${order.algo_order_id}&symbol=${order.symbol}`,
				{
					method: 'DELETE',
				},
			);

			toast.success('Order Canceled!');
		} catch (error: any) {
			toast.error(error.message);
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
						return <TPSLOrderItem key={index} order={item} cancelTPSLOrder={cancelTPSLOrder} />;
					})}
			</MainTable>
		</Stack>
	);
};

export default memo(OrderTableContentTPSL);
