import { getImageNextwork } from '@/common';
import { MainButton } from '@/components/button/MainButton';
import { TokenIcon } from '@/components/token/TokenIcon';
import { theme } from '@/utils';
import { spitSymbol } from '@/utils/formatters/token';
import { Divider, Stack } from '@mui/material';
import { useTickerStream } from '@orderly.network/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { MarketsContent } from '../../Markets/components/MarketContent';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

export const SymbolHeader = ({ onSymbolChange, symbol }: IProps) => {
	const [marketEl, setMarketEl] = useState<null | HTMLElement>(null);
	const openMarketEl = Boolean(marketEl);

	// Get detail symbol
	const stream = useTickerStream(symbol);

	const handleClose = () => {
		setMarketEl(null);
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setMarketEl(event.currentTarget);
	};

	return (
		<>
			<Divider />

			<Stack
				px={1}
				py={1}
				borderLeft={1}
				borderColor={theme.palette.divider}
				direction={'row'}
				bgcolor={theme.palette.background.paper}
				spacing={1}
			>
				<MainButton
					startIcon={<TokenIcon url={getImageNextwork(symbol ? spitSymbol(symbol) : '', 'symbol_logo')} />}
					variant="textLink"
					color="white"
					id="market-button"
					aria-controls={openMarketEl ? 'market-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={openMarketEl ? 'true' : undefined}
					onClick={handleClick}
					endIcon={<IconChevronDown size="1rem" />}
				>
					{symbol.replaceAll('_', '-')}
				</MainButton>

				<Divider orientation="vertical" flexItem />
			</Stack>

			{openMarketEl && (
				<MarketsContent
					handleClose={handleClose}
					marketEl={marketEl}
					openMarketEl={openMarketEl}
					onSymbolChange={onSymbolChange}
				/>
			)}
		</>
	);
};
