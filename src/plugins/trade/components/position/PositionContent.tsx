import MainTable from '@/components/table/MainTable';
import { baseFormatter, usdFormatter } from '@/utils/formatters/number';
import { Box, TableCell, TableRow } from '@mui/material';
import { useAccount, usePositionStream } from '@orderly.network/hooks';
import { PositionsView } from '@orderly.network/react';
import { memo } from 'react';

interface IProps {
	symbol: string;
}

const headTable = [
	{ title: 'Symbol', dataIndex: '1' },
	{ title: 'Quantity', dataIndex: '2' },
	{ title: 'Avg. open', dataIndex: '3' },
	{ title: 'Mark price', dataIndex: '4' },
	{ title: 'Liq. price', dataIndex: '5', hint: 'Unreal. PnL' },
	{
		title: 'Unreal. PnL',
		dataIndex: '6',
		hint: `Current unrealized profit or loss on your open positions across all widgets calculated using Mark Price.`,
	},
];

const PositionContent = ({ symbol }: IProps) => {
	const [{ aggregated, rows, totalCollateral, totalUnrealizedROI, totalValue }] = usePositionStream(symbol);
	const { state } = useAccount();

	return (
		<Box px={'10px'} pt={'10px'} pb={7} height={'100%'}>
			<Box className="position-head">
				<PositionsView aggregated={aggregated} dataSource={[]} />
			</Box>

			<MainTable headTable={headTable} isEmpty={rows && rows.length > 0 ? false : true}>
				{rows &&
					rows.length > 0 &&
					rows.map((item, index) => {
						const [_, base, quote] = item.symbol.split('_');

						return (
							<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component="th" scope="row">
									{base} / {quote}
								</TableCell>
								<TableCell>{baseFormatter.format(item.position_qty)}</TableCell>
								<TableCell align="right">{usdFormatter.format(item.average_open_price)}</TableCell>
								<TableCell align="right">{usdFormatter.format(item.mark_price)}</TableCell>
								<TableCell align="right">
									{item.est_liq_price ? usdFormatter.format(item.est_liq_price) : '-'}
								</TableCell>
								<TableCell align="right">
									{usdFormatter.format(item.unrealized_pnl)} ({usdFormatter.format(item.unrealized_pnl_ROI * 100)}%)
								</TableCell>
							</TableRow>
						);
					})}
			</MainTable>
		</Box>
	);
};

export default memo(PositionContent);
