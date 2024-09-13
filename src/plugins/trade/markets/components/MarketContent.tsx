import { StyledMenu } from '@/components/menu/StyledMenu';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, useTheme } from '@mui/material';
import { MarketsType, useMarkets } from '@orderly.network/hooks';
import { Markets } from '@orderly.network/react';
import { API } from '@orderly.network/types';

interface IProps {
	marketEl: HTMLElement | null;
	openMarketEl: boolean;
	handleClose: () => void;
	onSymbolChange: (symbol: string) => void;
}

export const MarketsContent = ({ handleClose, marketEl, openMarketEl, onSymbolChange }: IProps) => {
	const handleClickMarketItem = (item: API.MarketInfoExt) => {
		handleClose();
		onSymbolChange(item.symbol);
	};

	const [markets] = useMarkets(MarketsType.ALL);

	return (
		<>
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
					className={`${useTheme().palette.mode} market-popup `}
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
		</>
	);
};
