import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { theme } from '@/utils';
import { Typography } from '@mui/material';
import { memo } from 'react';

const BoxConnectWallet = () => {
	return (
		<MainCard backgroudColor="primary">
			<Typography textAlign={'center'} py={'40px'} color={theme.palette.common.black}>
				Connect your Ethereum wallet to deposit funds & start trading.
			</Typography>

			<MainButton fullWidth variant="contained" color="primary">
				Connect Wallet
			</MainButton>
		</MainCard>
	);
};

export default memo(BoxConnectWallet);
