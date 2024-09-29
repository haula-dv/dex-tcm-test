import MainCard from '@/components/card/MainCard';
import { CheckBoxBase } from '@/components/form-control/CheckBoxBase';
import MainTab from '@/components/tab/MainTab';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
import { OrderStatus } from '@orderly.network/types';
import { useState } from 'react';
import PositionContent from '../position/PositionContent';
import OrderTableContentFilled from './OrderTableContentFilled';
import OrderTableContentHistory from './OrderTableContentHistory';
import OrderTableContentPending from './OrderTableContentPending';
import OrderTableContentTPSL from './OrderTableContentTPSL';

interface IProps {
	symbol: string;
}

export const OrderViewContainer = ({ symbol }: IProps) => {
	const [isShowAllInstrument, setShowAllInstrument] = useState(true);

	const tabs = [
		{
			label: 'Positions',
			value: 'positions',
			children: <PositionContent symbol={symbol} isShowAll={isShowAllInstrument} />,
		},
		{
			label: 'Pending',
			value: 'pending',
			children: (
				<OrderTableContentPending
					orderBookStatus={OrderStatus.INCOMPLETE}
					symbol={symbol}
					isShowAll={isShowAllInstrument}
				/>
			),
		},
		{
			label: 'TP/SL',
			value: 'TP/SL',
			children: (
				<OrderTableContentTPSL orderBookStatus={OrderStatus.NEW} symbol={symbol} isShowAll={isShowAllInstrument} />
			),
		},
		{
			label: 'Filled',
			value: 'filled',
			children: (
				<OrderTableContentFilled orderBookStatus={OrderStatus.FILLED} symbol={symbol} isShowAll={isShowAllInstrument} />
			),
		},
		{
			label: 'Order history',
			value: 'order_history',
			children: (
				<OrderTableContentHistory
					orderBookStatus={OrderStatus.COMPLETED}
					symbol={symbol}
					isShowAll={isShowAllInstrument}
				/>
			),
		},
	];

	const onShowAllInstrument = (value: boolean) => {
		setShowAllInstrument(value);
	};

	return (
		<Box height={'20.5617%'} minHeight={'320px'} overflow={'hidden'} pt="10px" borderRadius={'16px'}>
			<MainTab
				tabs={tabs}
				rightSideTab={
					<Box flexShrink={0}>
						<CheckBoxBase label="Show all symbols" onChange={onShowAllInstrument} defaultValue={isShowAllInstrument} />
					</Box>
				}
			>
				<MainCard
					backgroudColor="primaryLight"
					height="100%"
					width="100%"
					disablePadding
					sx={{ overflowY: 'auto', height: '100%', pb: '50px' }}
				>
					{tabs.map((item) => (
						<TabPanel key={item.value} value={item.value} sx={{ p: 0, overflowY: 'auto', height: '100%' }}>
							{item.children}
						</TabPanel>
					))}
				</MainCard>
			</MainTab>
		</Box>
	);
};
