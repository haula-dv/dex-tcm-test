import { MainButton } from '@/components/button/MainButton';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Stack, useTheme } from '@mui/material';
import { memo } from 'react';
import { Item } from './SwapContainer';

interface IProps {
	slippageAmount: string;
	handlePriceImpactCalculation: () => any;
}

const Cost = ({ slippageAmount, handlePriceImpactCalculation }: IProps) => {
	return (
		<Stack spacing={TSizes.margin_common}>
			<Item
				title="Price Impact"
				value={<span style={{ color: useTheme().palette.success.main }}> {handlePriceImpactCalculation()}%</span>}
			/>
			<Item title="Max. slippage" value={slippageAmount} />
			<Item title="Minimum recevied" value="9747.969 AMPL" />
			<Item title="Liquidity Provider Fee" value={'0.0015ETH'} />
			<MainButton fullWidth color="inherit" size="large">
				View Pair Analytis
			</MainButton>
		</Stack>
	);
};

export default memo(Cost);
