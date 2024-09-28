import { ITab } from '@/common/types/components/tab';
import { MainButton } from '@/components/button/MainButton';
import { MainDialog } from '@/components/dialog/MainDialog';
import MainTab from '@/components/tab/MainTab';
import { baseFormatter, usdFormatter } from '@/utils/formatters/number';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme } from '@mui/material';
import { API } from '@orderly.network/types';
import { useState } from 'react';
import ClosePositionContent from './ClosePositionContent';
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
		// {
		// 	label: 'Stop Market',
		// 	value: '2',
		// 	children: (
		// 		<StopOrderContent symbol={symbol} position={position} refresh={refresh} handleCloseModal={handleToggleModal} />
		// 	),
		// },
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
				sx={{ color: '#fff !important', textTransform: 'none' }}
				onClick={handleToggleModal}
			>
				Update
			</MainButton>

			<MainDialog open={open} handleClose={handleToggleModal} title="Update Position" maxWidth="xs" isDivider>
				<MainTab tabs={tabs} defaultValue={'1'}>
					<>
						{tabs.map((item, index) => (
							<TabPanel key={index} value={item.value} sx={{ p: 0 }}>
								{item.children}
							</TabPanel>
						))}
					</>
				</MainTab>
			</MainDialog>
		</>
	);
};

export default UpdatePosition;
