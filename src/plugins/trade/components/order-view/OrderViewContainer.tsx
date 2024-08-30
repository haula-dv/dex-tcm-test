import { ITab } from '@/common/types/components/tab';
import { MainCard } from '@/components/card/MainCard';
import MainTab from '@/components/tab/MainTab';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
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
		<Box height={'20.5617%'} minHeight={'350px'} overflow={'hidden'} pt="52px" borderRadius={'16px'}>
			<MainTab tabs={tabs as any} onChange={onTabChange}>
				<MainCard backgroudColor="primaryLight" height="100%" width="100%" disablePadding>
					{tabs.map((item) => (
						<TabPanel key={item.value} value={item.value} sx={{ p: 0, overflow: 'auto' }}>
							{item.children}
						</TabPanel>
					))}
				</MainCard>
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
