import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { usdFormatter } from '@/utils/formatters/number';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { WalletState } from '@orderly.network/hooks/esm/walletConnectorContext';
import { memo, useState } from 'react';

interface IProps {
	availableWithdraw: number;
	quote: string;
	wallet: WalletState;
}

// eslint-disable-next-line react/display-name
export const Balance = memo(({ availableWithdraw, quote }: IProps) => {
	const [checked, setChecked] = useState(false);
	const handleChange = () => {
		setChecked((prev) => !prev);
	};

	return (
		<>
			{/* <SettlePnlContent /> */}
			<MainCard backgroudColor="primaryLight" width="100%">
				<Stack direction={'row'} justifyContent={'space-between'}>
					<Typography fontSize={'12px'} color={useTheme().palette.grey[600]}>
						Total balance
					</Typography>

					<Typography fontWeight={600}>
						{usdFormatter.format(availableWithdraw)} {quote}
					</Typography>
				</Stack>
			</MainCard>

			<Box mb={TSizes.margin_xs} />

			<MainButton></MainButton>

			<Box mb={TSizes.margin_xs} />
		</>
	);
});
