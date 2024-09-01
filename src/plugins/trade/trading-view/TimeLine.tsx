import { MainIconButton } from '@/components/button/MainIconButton';
import IconSetting from '@/components/icons/setting';
import MainTooltip from '@/components/MainTooltip';
import { theme } from '@/utils';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ChartIndicatorsListView from './ChartIndicatorsListView';
import ChartTypeListView from './ChartTypeListView';
import LineTradingListView from './LineTradingListView';

const timelines = [
	{ label: '1m', value: '1' },
	{ label: '3m', value: '3' },
	{ label: '5m', value: '5' },
	{ label: '15m', value: '15' },
	{ label: '30m', value: '30' },
	{ label: '1h', value: '60' },
	{ label: '2h', value: '120' },
	{ label: '3h', value: '180' },
	{ label: '4h', value: '240' },
	{ label: '1D', value: 'D' },
	{ label: '1W', value: 'W' },
	{ label: '1M', value: 'M' },
	{ label: '1Y', value: 'Y' },
];

interface IProps {
	handleChangeInterval: (val: string) => void;
	handleChangeChartType: (val: string) => void;
	handleSelectIndicator: (val: string[]) => void;
}

const TimeLine = ({ handleChangeInterval, handleChangeChartType, handleSelectIndicator }: IProps) => {
	const [currentIn, setCurrentIn] = useState('1');

	const onChange = (value: string) => {
		setCurrentIn(value);
		handleChangeInterval(value);
	};

	return (
		<Stack direction={'row'} spacing={2} px={'10px'} alignItems={'center'} pb={'10px'}>
			{timelines.map((item, index) => (
				<Typography
					key={index}
					sx={{ cursor: 'pointer' }}
					fontSize={'12px'}
					width={'30px'}
					whiteSpace={'nowrap'}
					onClick={() => onChange(item.value)}
					fontWeight={currentIn === item.value ? 700 : 500}
					color={currentIn === item.value ? theme.palette.primary.dark : theme.palette.grey[600]}
				>
					{item.label}
				</Typography>
			))}

			<Stack direction={'row'} alignItems={'center'}>
				<LineTradingListView />

				<ChartIndicatorsListView handleSelectIndicator={handleSelectIndicator} />

				<ChartTypeListView handleChangeChartType={handleChangeChartType} />

				<MainTooltip title="Setting" placement="top" arrow>
					<MainIconButton size="small">
						<IconSetting />
					</MainIconButton>
				</MainTooltip>
			</Stack>
		</Stack>
	);
};

export default TimeLine;
