import { StyledMenu } from '@/components/menu/StyledMenu';
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
					width={'400px'}
					height={'400px'}
					overflow={'auto'}
					px={2}
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
