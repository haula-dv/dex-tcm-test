import { MainCard } from '@/components/card/MainCard';
import { theme } from '@/utils';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { usePositionStream } from '@orderly.network/hooks';
import { memo } from 'react';

interface IProps {
	symbol: string;
}

const headTable = [
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
];

const PositionContent = ({ symbol }: IProps) => {
	const [{ aggregated, rows, totalCollateral, totalUnrealizedROI, totalValue }] = usePositionStream(symbol);

	return (
		<>
			<Stack direction={'row'} spacing={2} pb={'10px'}>
				<Stack>
					<Typography fontSize={'12px'} color={theme.palette.grey[400]}>
						Unreal. PnL
					</Typography>
					<Typography>0.00 (0.00%)</Typography>
				</Stack>

				<Stack>
					<Typography fontSize={'12px'} color={theme.palette.grey[400]}>
						Notional
					</Typography>
					<Typography>--</Typography>
				</Stack>
			</Stack>

			{/* <MainCard backgroudColor="primaryLight" width="100%" height="100%"> */}
			<TableContainer component={MainCard}>
				<Table aria-label="position-table">
					<TableHead>
						<TableRow>
							{headTable.map((item, index) => (
								<TableCell key={index}>{item.title}</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			  >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
					</TableBody>
				</Table>
			</TableContainer>
			{/* </MainCard> */}

			{/* <Table
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
			></Table> */}
		</>
	);
};

export default memo(PositionContent);
