import { IHeadCell } from '@/common';
import IconLoading from '@/components/icons/loading';
import MainTable from '@/components/table/MainTable';
import { usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import { useAccount, usePositionStream } from '@orderly.network/hooks';
import { AccountStatusEnum } from '@orderly.network/types';
import { memo } from 'react';
import UpdatePosition from './UpdatePosition';

interface IProps {
	symbol: string;
}

const headTable: IHeadCell[] = [
	{ title: 'Symbol' },
	{ title: 'Quantity' },
	{ title: 'Avg. open', align: 'right' },
	{ title: 'Margin(USDC)', align: 'right' },
	{ title: 'Mark price', align: 'right' },
	{ title: 'Notional(USDC)', align: 'right' },
	{ title: 'Liq. price', hint: 'Unreal. PnL', align: 'right' },
	{
		title: 'Unreal. PnL',
		hint: `Current unrealized profit or loss on your open positions across all widgets calculated using Mark Price.`,
		align: 'right',
	},
	// { title: 'Order Time'},
	{
		title: '',
		align: 'right',
	},
];

const PositionContent = ({ symbol }: IProps) => {
	const [positions, _info, { refresh, loading }] = usePositionStream(symbol);
	const { state } = useAccount();
	const theme = useTheme();

	if (state.status <= AccountStatusEnum.NotSignedIn) {
		return;
	}

	if (!positions.rows || loading) {
		return (
			<Stack spacing={TSizes.margin_common} m="10px">
				<IconLoading />
			</Stack>
		);
	}

	const unrealPnL: number = positions?.aggregated?.unrealPnL ?? 0;

	return (
		<Box px={'10px'} pt={'10px'} pb={10} height={'100%'}>
			<Stack direction={'row'} spacing={'10px'}>
				{/* <Box className="position-head">
					<PositionsView aggregated={positions.aggregated} dataSource={[]} />
				</Box> */}

				<Stack>
					<Typography fontSize={'10px'} color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}>
						Unreal. PnL
					</Typography>
					<Typography
						fontWeight={600}
						color={unrealPnL.toString().startsWith('-') ? theme.palette.error.main : theme.palette.success.main}
					>
						{usdFormatter.format(positions.aggregated?.unrealPnL) ?? '0.00'}
					</Typography>
				</Stack>

				<Stack>
					<Typography fontSize={'10px'} color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}>
						Notional
					</Typography>
					<Typography fontWeight={600}>{usdFormatter.format(positions.aggregated?.notional) ?? '0.00'}</Typography>
				</Stack>
			</Stack>
			<Box my={TSizes.margin_common} />

			<MainTable headTable={headTable} isEmpty={positions.rows && positions.rows.length > 0 ? false : true}>
				{positions.rows &&
					positions.rows.length > 0 &&
					positions.rows.map((item, index) => {
						const [_, base, quote] = item.symbol.split('_');

						return (
							<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell scope="row">
									{base} / {quote}
								</TableCell>

								<TableCell align="left">
									<Typography
										color={
											item.position_qty.toString().startsWith('-')
												? theme.palette.error.main
												: theme.palette.success.main
										}
										fontWeight={600}
									>
										{item.position_qty}
									</Typography>
								</TableCell>

								<TableCell align="right">{usdFormatter.format(item.average_open_price)}</TableCell>
								<TableCell align="right">{usdFormatter.format(item.mm)}</TableCell>
								<TableCell align="right">{usdFormatter.format(item.mark_price)}</TableCell>
								<TableCell align="right">
									{item.cost_position ? usdFormatter.format(item.cost_position) : '-'}
								</TableCell>

								<TableCell align="right" sx={{ color: theme.palette.warning.main }}>
									{item.est_liq_price ? usdFormatter.format(item.est_liq_price) : '-'}
								</TableCell>

								<TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
									<Typography
										color={
											item.unrealized_pnl.toString().startsWith('-')
												? theme.palette.error.main
												: theme.palette.success.main
										}
										fontWeight={600}
									>
										{usdFormatter.format(item.unrealized_pnl)} ({usdFormatter.format(item.unrealized_pnl_ROI * 100)}%)
									</Typography>
								</TableCell>

								{/* <TableCell align="right">
								{dayjs(item.timestamp).format('YYYY-MM-DD HH:mm:ss')}
								</TableCell> */}

								<TableCell align="right">
									<UpdatePosition position={item} symbol={symbol} refresh={refresh} />
								</TableCell>
							</TableRow>
						);
					})}
			</MainTable>
		</Box>
	);
};

export default memo(PositionContent);
