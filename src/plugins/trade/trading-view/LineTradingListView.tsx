import { MainButton } from '@/components/button/MainButton';
import SwitchBase from '@/components/form-control/SwitcheBase';
import IconLineTrading from '@/components/icons/line-trading';
import MainTooltip from '@/components/MainTooltip';
import { StyledMenu } from '@/components/menu/StyledMenu';
import { theme } from '@/utils';
import { ListItemButton, Typography } from '@mui/material';
import { IconChevronDown } from '@tabler/icons-react';
import { memo, useState } from 'react';

function LineTradingListView() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const items = [
		{
			label: 'Position',
			id: 1,
		},
		{
			label: 'Limit Orders',
			id: 2,
		},
		{
			label: 'Stop orders',
			id: 3,
		},
		{
			label: 'TP/SL',
			id: 4,
		},
		{
			label: 'Position TP/SL',
			id: 5,
		},
	];

	const [currentSelect, setCurrentSelect] = useState([1, 2, 3, 4, 5]);

	const handleSelect = (id: number) => {
		setCurrentSelect((prev) => {
			if (prev.includes(id)) {
				return prev.filter((o) => o !== id);
			} else {
				return [id, ...prev];
			}
		});
	};

	return (
		<>
			<MainTooltip title="Display settings" arrow placement="top">
				<MainButton
					size="small"
					color="inherit"
					endIcon={<IconChevronDown size={'1rem'} color={theme.palette.grey[400]} />}
					id="chart-type-line-button"
					aria-controls={open ? 'chart-type-line-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					<IconLineTrading />
				</MainButton>
			</MainTooltip>

			<StyledMenu
				id="chart-type-line-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'chart-type-line-button',
				}}
			>
				{items.map((item, index) => (
					<ListItemButton key={index} onClick={() => handleSelect(item.id)}>
						<Typography flex={1}>{item.label}</Typography>

						<SwitchBase checked={currentSelect.includes(item.id)} />
					</ListItemButton>
				))}
			</StyledMenu>
		</>
	);
}

export default memo(LineTradingListView);
