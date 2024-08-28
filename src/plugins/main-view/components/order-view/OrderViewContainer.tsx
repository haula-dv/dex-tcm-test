import { ITab } from '@/common/types/components/tab';
import MainTab from '@/components/tab/MainTab';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Stack } from '@mui/material';
import { OrderStatus } from '@orderly.network/types';
import PositionContent from '../position/PositionContent';
import OrderTableContent from './OrderTableContent';

interface IProps {
	symbol: string;
}

export const OrderViewContainer = ({ symbol }: IProps) => {
	const tabs = [
		{
			label: 'Positions',
			value: 'positions',
			children: <PositionContent symbol={symbol} />,
		},
		{
			label: 'Orders',
			value: 'orders',
			children: <OrderTableContent orderBookStatus={OrderStatus.INCOMPLETE} />,
		},
		{
			label: 'Fills',
			value: 'fills',
			children: <OrderTableContent orderBookStatus={OrderStatus.FILLED} />,
		},
		{
			label: 'Payments',
			value: 'payments',
			children: <OrderTableContent orderBookStatus={OrderStatus.CANCELLED} />,
		},
	];

	const onTabChange = (newValue: ITab) => {
		// setCurrentTab(newValue);
	};

	return (
		<Box px={'10px'} height={'100%'}>
			<MainTab tabs={tabs as any} onChange={onTabChange}>
				<Stack pt={'10px'}>
					{tabs.map((item) => (
						<TabPanel key={item.value} value={item.value} sx={{ p: 0 }}>
							{item.children}
						</TabPanel>
					))}
				</Stack>
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
