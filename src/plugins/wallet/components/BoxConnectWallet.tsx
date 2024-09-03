import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { Typography } from '@mui/material';
import { useAccount } from '@orderly.network/hooks';
import { useConnectWallet } from '@web3-onboard/react';
import { memo } from 'react';

const BoxConnectWallet = () => {
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
	const { account } = useAccount();

	// Handle connect wallet button
	const handleConnectWallet = async () => {
		await connect();
		localStorage.setItem('networkId', 'mainnet');
	};

	if (wallet) {
		return <></>;
	}

	return (
		<MainCard backgroudColor="primary">
			<Typography textAlign={'center'} py={'40px'} color={theme.palette.common.black}>
				Connect your Ethereum wallet to deposit funds & start trading.
			</Typography>

			<MainButton fullWidth isLoading={connecting} variant="contained" color="primary" onClick={handleConnectWallet}>
				Connect Wallet
			</MainButton>
		</MainCard>
	);
};

export default memo(BoxConnectWallet);
