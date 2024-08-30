import { Box, FormControl, Stack } from '@mui/material';
import { Divider, Select, Table } from '@orderly.network/react';
import { OrderStatus } from '@orderly.network/types';
import { memo } from 'react';

interface IProps {
	orderBookStatus: OrderStatus;
}

const OrderTableContent = ({ orderBookStatus }: IProps) => {
	// const [
	// 	data,
	// 	{
	// 		updateOrder,
	// 		cancelAlgoOrder,
	// 		cancelAlgoOrdersByTypes,
	// 		cancelAllOrders,
	// 		cancelAllTPSLOrders,
	// 		cancelOrder,
	// 		cancelTPSLChildOrder,
	// 		errors,
	// 		isLoading,
	// 		loadMore,
	// 		refresh,
	// 		updateAlgoOrder,
	// 		updateTPSLOrder,
	// 	},
	// ] = useOrderStream({ status: OrderStatus.NEW });

	return (
		<Stack p={1}>
			<FormControl sx={{ maxWidth: '100px', pb: 1 }}>
				<Select
					style={{ width: '100px' }}
					value={'all'}
					options={[
						{ label: 'All side', value: 'all' },
						{ label: 'Buy', value: 'buy' },
						{ label: 'Sell', value: 'sell' },
					]}
				/>
			</FormControl>

			<Divider />

			<Box height={'300px'}>
				<Table
					headerClassName="table-header-custom"
					bordered
					columns={[
						{ title: 'Instrument', dataIndex: '1' },
						{ title: 'Quantity', dataIndex: '2' },
						{ title: 'Avg. open', dataIndex: '3' },
						{ title: 'Mark price', dataIndex: '4' },
						{ title: 'Liq. price', dataIndex: '5', hint: 'Unreal. PnL' },
						{
							title: 'Unreal. PnL',
							dataIndex: '6',
							hint: `Current unrealized profit or loss on your open positions across all widgets calculated using Mark Price.`,
						},
						{ title: 'TP/SL', dataIndex: '7' },
						{ title: 'TP/SL', dataIndex: 'Est. total' },
						{ title: 'Margin', dataIndex: '8' },
						{ title: 'Qty.', dataIndex: '9' },
						{ title: 'Price', dataIndex: '10' },
					]}
					dataSource={[1]}
				></Table>
			</Box>
		</Stack>
	);
};

export default memo(OrderTableContent);
