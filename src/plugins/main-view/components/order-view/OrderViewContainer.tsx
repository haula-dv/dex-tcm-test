import { ITab } from '@/common/types/components/tab';
import MainTab from '@/components/tab/MainTab';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
import { OrderStatus } from '@orderly.network/types';
import { useState } from 'react';
import OrderTableContent from './OrderTableContent';

interface IProps {
	symbol: string;
}

export const OrderViewContainer = ({ symbol }: IProps) => {
	const [currentTab, setCurrentTab] = useState('positions');

	const tabs = [
		{
			label: 'Positions',
			value: 'positions',
			children: <Box>Positions</Box>,
		},
		{
			label: 'Pending',
			value: 'pending',
			children: <OrderTableContent orderBookStatus={OrderStatus.INCOMPLETE} />,
		},
		{
			label: 'Filled',
			value: 'filled',
			children: <OrderTableContent orderBookStatus={OrderStatus.FILLED} />,
		},
		{
			label: 'Cancelled',
			value: 'cancelled',
			children: <OrderTableContent orderBookStatus={OrderStatus.CANCELLED} />,
		},
		{
			label: 'Rejected',
			value: 'rejected',
			children: <OrderTableContent orderBookStatus={OrderStatus.REJECTED} />,
		},
		{
			label: 'Order History',
			value: 'order-history',
			children: <OrderTableContent orderBookStatus={OrderStatus.COMPLETED} />,
		},
	];

	const onTabChange = (newValue: ITab) => {
		// setCurrentTab(newValue);
	};

	return (
		<Box px={'10px'}>
			<MainTab tabs={tabs as any} onChange={onTabChange}>
				<>
					{tabs.map((item) => (
						<TabPanel key={item.value} value={item.value} sx={{ p: 0 }}>
							{item.children}
						</TabPanel>
					))}
				</>
			</MainTab>
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
		</Box>
	);
};
