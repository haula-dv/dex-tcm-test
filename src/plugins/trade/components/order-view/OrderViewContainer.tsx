import { ITab } from '@/common/types/components/tab';
import MainTab from '@/components/tab/MainTab';
import { theme } from '@/utils';
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
		<Box height={'100%'} flex={1} overflow={'hidden'}>
			<MainTab tabs={tabs as any} onChange={onTabChange}>
				<Stack
					mt={'10px'}
					p="10px"
					bgcolor={theme.palette.primary.light}
					height={'340px'}
					borderRadius={'14px'}
					overflow={'hidden'}
				>
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
