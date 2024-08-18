import { MainButton } from '@/components/button/MainButton';
import IconLoading from '@/components/icons/loading';
import { Stack } from '@mui/material';
import { useAccount } from '@orderly.network/hooks';
import { IconSettings } from '@tabler/icons-react';
import { useConnectWallet } from '@web3-onboard/react';
import { useEffect, useState } from 'react';
import { AccountAvatar } from './AccountAvatar';
import AccountDetailPopup from './AccountDetailPopup';
import AccountMenuContainer from './AccountMenuContainer';
import NetworkContent from './NetworkContent';

export default function WalletContainer() {
	const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null);
	const openAccountEl = Boolean(accountAnchorEl);

	// Account Details
	const [openAccountDetailsModal, setAccountDetailsModal] = useState(false);

	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
	const { account } = useAccount();

	// Handle connect wallet button
	const handleConnectWallet = async () => {
		await connect();
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
				<MainButton startIcon={<IconLoading height="20px" width="20px" />} variant="outlined">
					Connecting
				</MainButton>
			) : (
				<>
					{!wallet ? (
						<MainButton onClick={handleConnectWallet} variant="outlined" color="primary">
							Connect Wallet
						</MainButton>
					) : (
						<MainButton
							variant="outlined"
							color="primary"
							onClick={handleShowMenuAccount}
							endIcon={<IconSettings size={'1.1rem'} />}
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

			<AccountMenuContainer
				anchorEl={accountAnchorEl}
				open={openAccountEl}
				handleClose={handleCloseAccountMenu}
			/>

			{wallet && (
				<AccountDetailPopup
					open={openAccountDetailsModal}
					onClose={() => setAccountDetailsModal(false)}
					wallet={wallet}
				/>
			)}
		</Stack>
	);
}
