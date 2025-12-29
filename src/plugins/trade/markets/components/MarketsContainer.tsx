import { getImageNextwork } from '@/common';
import { TokenIcon } from '@/components/token/TokenIcon';
import { Stack, Typography } from '@mui/material';
import { DropDownMarketsWidget } from '@orderly.network/markets';
import { IconChevronDown } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';

const DynamicMarketsContent = dynamic(() => import("./MarketContent").then((mod) => mod.default), {
	ssr: false,
});

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

const MarketsContainer = ({ onSymbolChange, symbol }: IProps) => {
	const [marketEl, setMarketEl] = useState<null | HTMLElement>(null);
	const openMarketEl = Boolean(marketEl);
	const [perp, base, quote] = symbol.split('_');

	const handleClose = () => {
		setMarketEl(null);
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setMarketEl(event.currentTarget);
	};

	return (
		<Stack
			direction={'row'}
			alignItems={'center'}
			justifyContent={'space-between'}
			mt="-6px !important"
			mb="-4px !important"
		>
			<Stack direction={'row'} alignItems={'center'} spacing={1}>
				<TokenIcon url={getImageNextwork(base, 'symbol_logo')} size={20} />

				<Typography fontSize={'13px'} fontWeight={600}>
					{base}-{perp}
				</Typography>
			</Stack>

			{/* <MainButton
				variant="textLink"
				id="market-button"
				aria-controls={openMarketEl ? 'market-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={openMarketEl ? 'true' : undefined}
				onClick={handleClick}
				endIcon={openMarketEl ? <IconChevronUp size="1.2rem" /> : <IconChevronDown size="1.2rem" />}
				color={setColorThemeMode('dark', 'white')}
			>
				<Typography fontSize={'13px'} fontWeight={600}>
					All Markets
				</Typography>
			</MainButton> */}
			<DropDownMarketsWidget onSymbolChange={(symbol) => onSymbolChange(symbol.symbol)} symbol={symbol} contentClassName='market-popup market-popup-left' children={
				<Stack direction={'row'} alignItems={'center'} spacing={1} className='cursor-pointer'>
					<Typography fontSize={'13px'} fontWeight={600}>
						All Markets
					</Typography>
					<IconChevronDown size="1.2rem" />
				</Stack>
			} />

			{openMarketEl && (
				<DynamicMarketsContent
					handleClose={handleClose}
					marketEl={marketEl}
					openMarketEl={openMarketEl}
					onSymbolChange={onSymbolChange}
				/>
			)}
		</Stack>
	);
};

export default memo(MarketsContainer);
