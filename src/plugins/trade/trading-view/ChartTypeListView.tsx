import { MainIconButton } from '@/components/button/MainIconButton';
import IconChartBar from '@/components/icons/chart-bar';
import IconChartBaseLine from '@/components/icons/chart-base-line';
import IconChartCandles from '@/components/icons/chart-candles';
import IconChartLine from '@/components/icons/chart-line';
import IconChartLine2 from '@/components/icons/chart-line2';
import MainTooltip from '@/components/MainTooltip';
import { StyledMenu } from '@/components/menu/StyledMenu';
import { ListItemButton, Typography } from '@mui/material';
import { memo, useState } from 'react';
import { IChartType } from '../type';

interface IProps {
	handleChangeChartType: (val: string) => void;
}

const ChartTypeListView = ({ handleChangeChartType }: IProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const [currentSelect, setCurrentSelect] = useState<IChartType>({
		label: 'Candles',
		value: '1',
		icon: <IconChartCandles />,
	});

	const handleSelect = (val: IChartType) => {
		handleChangeChartType(val.value);
		setCurrentSelect(val);
		handleClose();
	};

	const items: IChartType[] = [
		{
			label: 'Bars',
			value: '0',
			icon: <IconChartBar />,
		},
		{
			label: 'Candles',
			value: '1',
			icon: <IconChartCandles />,
		},
		{
			label: 'Hollow candles',
			value: '9',
			icon: <IconChartCandles />,
		},
		{
			label: 'Line',
			value: '2',
			icon: <IconChartLine />,
		},
		{
			label: 'Area',
			value: '3',
			icon: <IconChartLine2 />,
		},
		{
			label: 'Baseline',
			value: '10',
			icon: <IconChartBaseLine />,
		},
	];

	return (
		<>
			<MainTooltip title="Line type" placement="top" arrow>
				<MainIconButton
					size="small"
					id="chart-type-button"
					aria-controls={open ? 'chart-type-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					{currentSelect.icon}
				</MainIconButton>
			</MainTooltip>

			<StyledMenu
				id="chart-type-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'chart-type-button',
				}}
			>
				{items.map((item, index) => (
					<ListItemButton key={index} selected={currentSelect.value == item.value} onClick={() => handleSelect(item)}>
						{item.icon}
						<Typography style={{ marginLeft: 6 }}>{item.label}</Typography>
					</ListItemButton>
				))}
			</StyledMenu>
		</>
	);
};

export default memo(ChartTypeListView);
