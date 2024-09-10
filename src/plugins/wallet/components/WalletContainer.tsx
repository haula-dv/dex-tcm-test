import { themeSelectorState } from '@/common/stores/common';
import { MainButton } from '@/components/button/MainButton';
import { MainIconButton } from '@/components/button/MainIconButton';
import IconLoading from '@/components/icons/loading';
import { TLocalStorage } from '@/utils/constants/key_store';
import { setColorThemeMode } from '@/utils/helpers';
import { Stack, useTheme } from '@mui/material';
import { useAccount } from '@orderly.network/hooks';
import { IconDots, IconMoonStars, IconSettings, IconSun } from '@tabler/icons-react';
import { useConnectWallet } from '@web3-onboard/react';
import { setZustandValue } from 'nes-zustand';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import { AccountAvatar } from './AccountAvatar';
import AccountDetailPopup from './AccountDetailPopup';
import AccountMenuContainer from './AccountMenuContainer';
import NetworkContent from './NetworkContent';
import { OrderlyConnect } from './OrderlyConnect';

export default function WalletContainer() {
	const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null);
	const openAccountEl = Boolean(accountAnchorEl);
	const themeSelector = useStore(themeSelectorState, (state) => state.value);
	const theme = useTheme();

	const handleChangeTheme = () => {
		localStorage.setItem(TLocalStorage.DEX_THEME_MODE, themeSelector.activeMode == 'light' ? 'dark' : 'light');
		setZustandValue(themeSelectorState, (prev: any) => {
			return {
				...prev,
				activeMode: prev.activeMode == 'light' ? 'dark' : 'light',
			};
		});
	};

	// Account Details
	const [openAccountDetailsModal, setAccountDetailsModal] = useState(false);

	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
	const { account } = useAccount();

	// Handle connect wallet button
	const handleConnectWallet = async () => {
		await connect();
		// localStorage.setItem('networkId', 'mainnet');
	};

	// Handle show menu account button
	const handleShowMenuAccount = (event: React.MouseEvent<HTMLElement>) => {
		setAccountAnchorEl(event.currentTarget);
	};

	// Handle close menu account
	const handleCloseAccountMenu = (type: string) => {
		setAccountAnchorEl(null);
		if (type === 'wallet') {
			setAccountDetailsModal(true);
		}
	};

	// Watch wallet change
	useEffect(() => {
		if (Array.isArray(wallet?.accounts) && wallet.accounts.length > 0) {
			const item = wallet.accounts[0];
			const chain = wallet.chains[0];
			account.setAddress(item.address, {
				provider: wallet.provider,
				chain: {
					id: chain.id,
				},
				wallet: {
					name: wallet.label,
				},
			});
		}
	}, [account, wallet]);

	return (
		<Stack direction={'row'} spacing={1} alignItems={'center'}>
			<NetworkContent />

			{connecting ? (
				<MainButton
					startIcon={<IconLoading height="20px" width="20px" />}
					variant="contained"
					color={setColorThemeMode('darkGrey', 'white')}
				>
					Connecting
				</MainButton>
			) : (
				<>
					{!wallet ? (
						<MainButton
							onClick={handleConnectWallet}
							variant="contained"
							color={setColorThemeMode('darkGrey', 'white')}
						>
							Connect to Wallet
						</MainButton>
					) : (
						<MainButton
							variant="contained"
							color={setColorThemeMode('darkGrey', 'white')}
							onClick={handleShowMenuAccount}
							endIcon={<IconSettings size={'1.1rem'} color={setColorThemeMode('#fff', theme.palette.common.black)} />}
							id="account-button"
							aria-controls={openAccountEl ? 'account-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={openAccountEl ? 'true' : undefined}
						>
							<AccountAvatar />
						</MainButton>
					)}
				</>
			)}

			<AccountMenuContainer anchorEl={accountAnchorEl} open={openAccountEl} handleClose={handleCloseAccountMenu} />

			{wallet && openAccountDetailsModal && (
				<AccountDetailPopup
					open={openAccountDetailsModal}
					onClose={() => setAccountDetailsModal(false)}
					wallet={wallet}
				/>
			)}

			<OrderlyConnect />

			<MainIconButton color="inherit">
				<IconDots />
			</MainIconButton>

			<MainIconButton onClick={handleChangeTheme} color="inherit">
				{themeSelector.activeMode == 'light' ? <IconSun /> : <IconMoonStars />}
			</MainIconButton>
		</Stack>
	);
}
