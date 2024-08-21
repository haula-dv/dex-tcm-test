import { Box, Stack } from '@mui/material';
import { useOrderStream, usePositionStream } from '@orderly.network/hooks';
import { OrdersView, PositionsView, TabPane, Tabs } from '@orderly.network/react';
import { OrderStatus } from '@orderly.network/types';
import { useState } from 'react';

interface IProps {
	symbol: string;
}

export const OrderViewContainer = ({ symbol }: IProps) => {
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
	] = useOrderStream({ status: OrderStatus.NEW });
	const [{ aggregated, rows, totalCollateral, totalUnrealizedROI, totalValue }] = usePositionStream(symbol);
	const [currentTab, setCurrentTab] = useState('positions');

	const tabs = [
		{
			title: 'Positions',
			value: 'positions',
			children: <PositionsView dataSource={rows as any} aggregated={aggregated} />,
		},
		{
			title: 'Pending',
			value: 'pending',
			children: <Box>12</Box>,
		},
		{
			title: 'Filled',
			value: 'filled',
			children: <Box>12</Box>,
		},
		{
			title: 'Cancelled',
			value: 'cancelled',
			children: <Box>12</Box>,
		},
		{
			title: 'Rejected',
			value: 'rejected',
			children: <Box>12</Box>,
		},
		{
			title: 'Order History',
			value: 'order-history',
			children: <Box>12</Box>,
		},
	];

	const onTabChange = (newValue: string) => {
		setCurrentTab(newValue);
	};

	return (
		<div>
			<Stack>
				<Tabs value={currentTab} onTabChange={onTabChange}>
					{tabs.map((item) => (
						<TabPane key={item.value} title={item.title} value={item.value}>
							{item.children}
						</TabPane>
					))}
				</Tabs>
			</Stack>
			<OrdersView
				dataSource={data as any}
				symbol="PERP_ETH_USDC"
				cancelOrder={cancelOrder}
				cancelAlgoOrder={cancelAlgoOrder}
				cancelTPSLOrder={cancelTPSLChildOrder}
				editAlgoOrder={updateAlgoOrder}
				editOrder={updateOrder}
				isLoading={isLoading}
				loadMore={loadMore}
			/>
		</div>
	);
};
