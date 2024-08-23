import { Stack } from '@mui/material';
import { TabPane, Tabs } from '@orderly.network/react';
import { OrderStatus } from '@orderly.network/types';
import { useState } from 'react';
import PositionContent from '../position/PositionContent';
import OrderTableContent from './OrderTableContent';

interface IProps {
	symbol: string;
}

export const OrderViewContainer = ({ symbol }: IProps) => {
	const [currentTab, setCurrentTab] = useState('positions');

	const tabs = [
		{
			title: 'Positions',
			value: 'positions',
			children: <PositionContent symbol={symbol} />,
		},
		{
			title: 'Pending',
			value: 'pending',
			children: <OrderTableContent orderBookStatus={OrderStatus.INCOMPLETE} />,
		},
		{
			title: 'Filled',
			value: 'filled',
			children: <OrderTableContent orderBookStatus={OrderStatus.FILLED} />,
		},
		{
			title: 'Cancelled',
			value: 'cancelled',
			children: <OrderTableContent orderBookStatus={OrderStatus.CANCELLED} />,
		},
		{
			title: 'Rejected',
			value: 'rejected',
			children: <OrderTableContent orderBookStatus={OrderStatus.REJECTED} />,
		},
		{
			title: 'Order History',
			value: 'order-history',
			children: <OrderTableContent orderBookStatus={OrderStatus.COMPLETED} />,
		},
	];

	const onTabChange = (newValue: string) => {
		setCurrentTab(newValue);
	};

	return (
		<>
			<Stack>
				<Tabs value={currentTab} onTabChange={onTabChange}>
					{tabs.map((item) => (
						<TabPane key={item.value} title={item.title} value={item.value}>
							{item.children}
						</TabPane>
					))}
				</Tabs>
			</Stack>

			{/* <OrdersView
				dataSource={data as any}
				symbol="PERP_ETH_USDC"
				cancelOrder={cancelOrder}
				cancelAlgoOrder={cancelAlgoOrder}
				cancelTPSLOrder={cancelTPSLChildOrder}
				editAlgoOrder={updateAlgoOrder}
				editOrder={updateOrder}
				isLoading={isLoading}
				loadMore={loadMore}
			/> */}
		</>
	);
};
