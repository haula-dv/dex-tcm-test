import { ITab } from '@/common/types/components/tab';
import { MainButton } from '@/components/button/MainButton';
import MainCard from '@/components/card/MainCard';
import { MainDialog } from '@/components/dialog/MainDialog';
import MainTab from '@/components/tab/MainTab';
import { baseFormatter, usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { API } from '@orderly.network/types';
import { memo, useState } from 'react';
import ClosePositionContent from './ClosePositionContent';
import StopOrderContent from './StopOrderContent';
import TpSlOrder from './TpSlOrder';

interface IProps {
	symbol: string;
	position: API.PositionExt;
	refresh: import('swr/_internal').KeyedMutator<API.PositionInfo>;
}

const UpdatePosition = ({ position, refresh, symbol }: IProps) => {
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const [_, base, quote] = position.symbol.split('_');

	const handleToggleModal = () => {
		setOpen(!open);
	};

	const items = [
		{
			label: 'Symbol',
			value: `${base} / ${quote}`,
		},
		{
			label: 'Quantity',
			value: baseFormatter.format(position.position_qty),
		},
		{
			label: 'Avg. Open',
			value: usdFormatter.format(position.average_open_price),
		},
		{
			label: 'Mark Price',
			value: usdFormatter.format(position.mark_price),
		},
		{
			label: 'Unreal. PnL',
			value: usdFormatter.format(position.unrealized_pnl),
		},
		{
			label: 'Est.Liq Price',
			value: position.est_liq_price ? usdFormatter.format(position.est_liq_price) : '-',
		},
	];

	const tabs: ITab[] = [
		{
			label: 'Close Position',
			value: '1',
			children: (
				<ClosePositionContent
					symbol={symbol}
					position={position}
					refresh={refresh}
					handleCloseModal={handleToggleModal}
				/>
			),
		},
		{
			label: 'Stop Market',
			value: '2',
			children: (
				<StopOrderContent symbol={symbol} position={position} refresh={refresh} handleCloseModal={handleToggleModal} />
			),
		},
		{
			label: 'TP/SL',
			value: '3',
			children: (
				<TpSlOrder symbol={symbol} position={position} refresh={refresh} handleCloseModal={handleToggleModal} />
			),
		},
	];

	return (
		<>
			<MainButton
				size="xsmall"
				variant="contained"
				color="success"
				sx={{ color: '#fff !important' }}
				onClick={handleToggleModal}
			>
				Update
			</MainButton>

			<MainDialog open={open} handleClose={handleToggleModal} title="Update Position" maxWidth="xs" isDivider>
				<MainCard backgroudColor="transparent" width="100%" variant="outlined">
					<Grid container spacing={TSizes.margin_common}>
						{items.map((item, index) => (
							<Grid key={index} item md={6}>
								<Stack>
									<Typography
										fontSize={'12px'}
										color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}
									>
										{item.label}
									</Typography>

									<Typography fontWeight={600}>{item.value}</Typography>
								</Stack>
							</Grid>
						))}
					</Grid>
				</MainCard>

				<Box pt={TSizes.margin_common} />

				<MainCard backgroudColor="transparent" variant="outlined">
					<MainTab tabs={tabs} defaultValue={'1'}>
						<>
							{tabs.map((item, index) => (
								<TabPanel key={index} value={item.value} sx={{ p: 0 }}>
									{item.children}
								</TabPanel>
							))}
						</>
					</MainTab>
				</MainCard>
			</MainDialog>
		</>
	);
};

export default memo(UpdatePosition);
