import { Box } from '@mui/material';
import { usePositionStream } from '@orderly.network/hooks';
import { Divider, Table } from '@orderly.network/react';
import { PositionOverview } from '@orderly.network/react/esm/block/positions/overview';
import { memo } from 'react';

interface IProps {
	symbol: string;
}

const PositionContent = ({ symbol }: IProps) => {
	const [{ aggregated, rows, totalCollateral, totalUnrealizedROI, totalValue }] = usePositionStream(symbol);

	return (
		<Box pb={10} height={'400px'}>
			<Box maxWidth={'200px'}>
				<PositionOverview aggregated={aggregated} />
			</Box>

			<Divider />

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
	);
};

export default memo(PositionContent);
