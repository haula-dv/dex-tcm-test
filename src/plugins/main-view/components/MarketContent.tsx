import { MainButton } from '@/components/button/MainButton';
import { StyledMenu } from '@/components/menu/StyledMenu';
import { Box } from '@mui/material';
import { MarketsFull } from '@orderly.network/react';
import { IconTableHeart } from '@tabler/icons-react';
import { useState } from 'react';

export const MarketsContent = () => {
	const [marketEl, setMarketEl] = useState<null | HTMLElement>(null);
	const openMarketEl = Boolean(marketEl);

	const handleClose = () => {
		//
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setMarketEl(event.currentTarget);
	};

	return (
		<>
			<MainButton
				startIcon={<IconTableHeart />}
				variant="textLink"
				color="white"
				id="market-button"
				aria-controls={openMarketEl ? 'market-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={openMarketEl ? 'true' : undefined}
				onClick={handleClick}
			>
				BTC-PERP
			</MainButton>

			<StyledMenu
				id="market-menu"
				MenuListProps={{
					'aria-labelledby': 'market-button',
				}}
				anchorEl={marketEl}
				open={openMarketEl}
				onClose={handleClose}
			>
				<Box width={'600px'}>
					<MarketsFull />
				</Box>
			</StyledMenu>
		</>
	);
};
