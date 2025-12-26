import { StyledMenu } from '@/components/menu/StyledMenu';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, useTheme } from '@mui/material';
import { MarketsType, useMarkets } from '@orderly.network/hooks';
import { Markets } from '@orderly.network/react';
import { API } from '@orderly.network/types';
import { memo } from 'react';

interface IProps {
	marketEl: HTMLElement | null;
	openMarketEl: boolean;
	handleClose: () => void;
	onSymbolChange: (symbol: string) => void;
}

const MarketsContent = ({ handleClose, marketEl, openMarketEl, onSymbolChange }: IProps) => {
	const theme = useTheme();
	const [markets] = useMarkets(MarketsType.ALL);

	const handleClickMarketItem = (item: API.MarketInfoExt) => {
		handleClose();
		onSymbolChange(item.symbol);
	};

	if (!openMarketEl) {
		return null;
	}

	return (
		<StyledMenu
			id="market-menu"
			MenuListProps={{
				'aria-labelledby': 'market-button',
			}}
			anchorEl={marketEl}
			open={openMarketEl}
			onClose={handleClose}
		>
			<Box
				className={`${theme.palette.mode} market-popup `}
				maxWidth={'300px'}
				height={'400px'}
				overflow={'auto'}
				px={TSizes.margin_common}
				width={'300px'}
			>
				<Markets
					dataSource={markets as any[]}
					onItemClick={(e) => {
						handleClickMarketItem(e);
					}}
				/>
			</Box>
		</StyledMenu>
	);
};

export default memo(MarketsContent);

