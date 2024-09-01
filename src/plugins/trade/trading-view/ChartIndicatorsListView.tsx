import { MainIconButton } from '@/components/button/MainIconButton';
import { SearchField } from '@/components/form-control/SearchField';
import FixTrading from '@/components/icons/fixtrading';
import { StyledMenu } from '@/components/menu/StyledMenu';
import { theme } from '@/utils';
import { Box, Divider, ListItemButton, Typography } from '@mui/material';
import { memo, useState } from 'react';
import { indicatorsCore } from '../store';

const ChartIndicatorsListView = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<MainIconButton
				size="small"
				id="chart-indicator-button"
				aria-controls={open ? 'chart-indicator-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<FixTrading />
			</MainIconButton>

			<StyledMenu
				id="chart-indicator-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				maxheight="400px"
				MenuListProps={{
					'aria-labelledby': 'chart-indicator-button',
				}}
			>
				<Box px={'16px'} pt="6px" position={'sticky'} top={2}>
					<SearchField placeholder="Search..." />
				</Box>

				<Typography fontSize={'12px'} color={theme.palette.grey[400]} px="16px" pt="6px">
					Script name
				</Typography>
				<Divider />

				{indicatorsCore.slice(0, 10).map((item, index) => (
					<ListItemButton key={index}>{item.scriptName}</ListItemButton>
				))}
			</StyledMenu>
		</>
	);
};

export default memo(ChartIndicatorsListView);
