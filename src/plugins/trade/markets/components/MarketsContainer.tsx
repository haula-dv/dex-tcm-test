import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { TokenIcon } from '@/components/token/TokenIcon';
import { Stack, Typography } from '@mui/material';
import { IconChevronDown } from '@tabler/icons-react';
import { memo, useState } from 'react';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

const MarketsContainer = ({ onSymbolChange, symbol }: IProps) => {
	const [marketEl, setMarketEl] = useState<null | HTMLElement>(null);
	const openMarketEl = Boolean(marketEl);

	return (
		<MainCard backgroudColor="primary" width="100%" disablePadding>
			<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} px={'16px'} py={'6px'}>
				<Stack direction={'row'} alignItems={'center'} spacing={1}>
					<TokenIcon url={'/images/shiba.png'} size={25} />
					<Typography fontSize={'13px'} fontWeight={600}>
						ShibaSwap
					</Typography>
				</Stack>

				<MainButton
					variant="textLink"
					id="market-button"
					aria-controls={openMarketEl ? 'market-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={openMarketEl ? 'true' : undefined}
					// onClick={handleClick}
					endIcon={<IconChevronDown />}
					color="inherit"
				>
					<Typography fontSize={'13px'} fontWeight={600}>
						All Markets
					</Typography>
				</MainButton>
			</Stack>
		</MainCard>
	);
};

export default memo(MarketsContainer);
