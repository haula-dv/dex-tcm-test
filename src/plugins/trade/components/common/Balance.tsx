import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { MainDialog } from '@/components/dialog/MainDialog';
import { NetworkId } from '@/provider/OrderlyConfigProviderRoot';
import { AppInfo } from '@/utils/constants/key_store';
import { usdFormatter } from '@/utils/formatters/number';
import { idFromHexChainId } from '@/utils/formatters/token';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { WalletState } from '@orderly.network/hooks/esm/walletConnectorContext';
import { toast } from '@orderly.network/react';
import { useSetChain } from '@web3-onboard/react';
import { memo, useState } from 'react';

interface IProps {
	availableWithdraw: number;
	quote: string;
	wallet: WalletState;
}

// eslint-disable-next-line react/display-name
export const Balance = memo(({ availableWithdraw, quote, wallet }: IProps) => {
	const [{ connectedChain }] = useSetChain();
	const [open, setOpen] = useState(false);
	const networkId = (localStorage.getItem('networkId') ?? 'mainnet') as NetworkId;

	// Handle get test USDC
	const handleGetTestUSDC = () => {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chain_id: idFromHexChainId(connectedChain?.id ?? '').toString(),
				user_address: wallet.accounts[0].address,
				broker_id: AppInfo.BROKER_ID,
			}),
		};

		fetch('https://testnet-operator-evm.orderly.org/v1/faucet/usdc', options)
			.then((response) => response.json())
			.then((response) => {
				if (response.success) {
					setOpen(true);
				} else {
					toast.error(response.message);
				}
			})
			.catch((err) => console.error(err));
	};

	return (
		<>
			<MainCard backgroudColor="primaryLight" width="100%">
				<Stack direction={'row'} justifyContent={'space-between'}>
					<Typography
						fontSize={'12px'}
						color={setColorThemeMode(useTheme().palette.grey[600], useTheme().palette.grey[200])}
					>
						Total balance
					</Typography>

					<Typography fontWeight={600}>
						{usdFormatter.format(availableWithdraw)} {quote}
					</Typography>
				</Stack>

				{networkId == 'testnet' && (
					<>
						<Box mb={TSizes.margin_xs} />

						<MainButton size="xsmall" variant="outlined" color="inherit" fullWidth onClick={handleGetTestUSDC}>
							Get 1,000 test {quote}
						</MainButton>
					</>
				)}
			</MainCard>

			<Box mb={TSizes.margin_xs} />

			<MainDialog open={open} handleClose={() => setOpen(false)} maxWidth="xs" hiddenHeader>
				<MainCard backgroudColor="common">
					<Typography textAlign={'center'} color={useTheme().palette.success.main}>
						Receive 1,000 USDC in the Testnet environment. Each account may only use the faucet a maximum of 5 times.
					</Typography>

					<Typography textAlign={'center'} pt={1}>
						Please wait about 1 minute until you receive the 1,000 USDC testnet
					</Typography>
				</MainCard>
				<Box mt="10px" />

				<MainButton fullWidth variant="contained">
					Close
				</MainButton>
			</MainDialog>
		</>
	);
});
