import { IHeadCell } from '@/common';
import MainTable from '@/components/table/MainTable';
import { usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { usePositionStream } from '@orderly.network/hooks';
import { memo } from 'react';
import PositionItem from './PositionItem';

interface IProps {
	symbol: string;
	isShowAll: boolean;
}

const headTable: IHeadCell[] = [
	{ title: 'Symbol' },
	{ title: 'Quantity' },
	{ title: 'Price' },
	{ title: 'Avg. open' },
	{ title: 'Mark price' },
	{ title: 'Liq. price' },
	{
		title: 'Unreal. PnL',
		hint: `Current unrealized profit or loss on your open positions across all widgets calculated using Mark Price.`,
	},
	{ title: 'TP/SL	' },
	{ title: 'Est. total' },
	{ title: 'Margin' },
	{ title: 'Order Time', width: 100 },
	{ title: '', width: 50 },
];

const PositionContent = ({ symbol, isShowAll }: IProps) => {
	const [positions, _info, { refresh, loading }] = usePositionStream(isShowAll ? '' : symbol);
	const theme = useTheme();

	const unrealPnL: number = positions?.aggregated?.unrealPnL ?? 0;

	return (
		<Box px={'10px'} pt={'10px'} pb={6} height={'100%'}>
			{/* <Box className="position-head">
					<PositionsView aggregated={positions.aggregated} dataSource={[]} />
				</Box> */}

			<Stack direction={'row'} spacing={'10px'}>
				<Stack>
					<Typography fontSize={'10px'} color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}>
						Unreal. PnL
					</Typography>
					<Typography
						fontWeight={600}
						color={unrealPnL.toString().startsWith('-') ? theme.palette.error.main : theme.palette.success.main}
					>
						{positions.aggregated?.unrealPnL ? usdFormatter.format(positions.aggregated?.unrealPnL) : '0.00'}
					</Typography>
				</Stack>

				<Stack>
					<Typography fontSize={'10px'} color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}>
						Notional
					</Typography>
					<Typography fontWeight={600}>
						{positions.aggregated?.notional ? usdFormatter.format(positions.aggregated?.notional) : '0.00'}
					</Typography>
				</Stack>
			</Stack>
			<Box my={TSizes.margin_common} />

			<MainTable
				headTable={headTable}
				isEmpty={positions.rows && positions.rows.length > 0 ? false : true}
				isLoading={loading}
			>
				{positions.rows &&
					positions.rows.length > 0 &&
					positions.rows.map((item, index) => {
						return <PositionItem key={index} item={item} refresh={refresh} symbol={symbol} />;
					})}
			</MainTable>
		</Box>
	);
};

export default memo(PositionContent);
