import { MainButton } from '@/components/button/MainButton';
import { MainIconButton } from '@/components/button/MainIconButton';
import MainCard from '@/components/card/MainCard';
import { MainDialog } from '@/components/dialog/MainDialog';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { usdFormatter } from '@/utils/formatters/number';
import { idFromHexChainId } from '@/utils/formatters/token';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack, useTheme } from '@mui/material';
import { useAccountInstance, useChains, useCollateral, useDeposit, useWithdraw } from '@orderly.network/hooks';
import { WalletState } from '@orderly.network/hooks/esm/walletConnectorContext';
import { toast } from '@orderly.network/react';
import { IconCopy, IconLogout } from '@tabler/icons-react';
import { useNotifications, useSetChain } from '@web3-onboard/react';
import { useMemo, useState } from 'react';
import { DepositWithdrawDialog } from '../../../components/deposit/DepositWithdrawDialog';
import { AccountAvatar } from './AccountAvatar';

interface IProps {
	open: boolean;
	onClose: () => void;
	wallet: WalletState;
	disconnect: (wallet: WalletState) => Promise<WalletState[]>;
}

export default function AccountDetailPopup({ onClose, open, wallet, disconnect }: IProps) {
	const [_, { findByChainId }] = useChains();
	const collateral = useCollateral();
	const [{ connectedChain }, setChain] = useSetChain();
	const [{}, customNotification] = useNotifications();
	const account = useAccountInstance();

	const [loadingSettle, setLoadingSettle] = useState(false);
	const [isOpenDeposit, setIsOpenDesposit] = useState(false);

	// GET CURRENT CHAIN
	const currentChain = useMemo(() => {
		return findByChainId(connectedChain ? idFromHexChainId(connectedChain?.id ?? '') : 1);
	}, [connectedChain, findByChainId]);

	const token = useMemo(() => {
		return currentChain?.token_infos[0] ?? undefined;
	}, [currentChain]);

	const deposit = useDeposit({
		address: token?.address,
		decimals: token?.decimals,
		srcToken: token?.symbol,
		srcChainId: Number(connectedChain?.id),
	});

	const { unsettledPnL, availableWithdraw } = useWithdraw();

	// Handle disconnect wallet button
	const handleDisconnect = async () => {
		if (wallet) {
			disconnect(wallet);
			onClose();
		}
	};

	const handleCopy = () => {
		navigator.clipboard
			.writeText(wallet.accounts[0].address)
			.then(() => {
				toast.success('Address copied!');
			})
			.catch((err) => {
				console.error('Failed to copy text: ', err);
			});
	};

	const handleSettle = async () => {
		setLoadingSettle(true);
		const { update } = customNotification({
			eventCode: 'settle',
			type: 'pending',
			message: 'Settling PnL...',
		});

		try {
			await account.settle();
			update({
				eventCode: 'settleSuccess',
				type: 'success',
				message: 'Successfully settled PnL!',
				autoDismiss: 5_000,
			});
		} catch (err) {
			console.error(err);

			update({
				eventCode: 'settleError',
				type: 'error',
				message: (err as any).message ?? 'Something went wrong',
				autoDismiss: 15_000,
			});
		} finally {
			setLoadingSettle(false);
		}
	};

	const handleToggleDesposit = () => {
		setIsOpenDesposit(!isOpenDeposit);
	};

	return (
		<MainDialog title="Account Details" open={open} handleClose={onClose} maxWidth="xs" isDivider>
			<MainCard
				variant="outlined"
				width="100%"
				backgroudColor="transparent"
				isActionSlot={
					<Stack direction={'row'} spacing={TSizes.margin_common}>
						<MainButton fullWidth onClick={handleSettle} disabled={loadingSettle} isLoading={loadingSettle}>
							Settle PnL
						</MainButton>

						<MainButton fullWidth variant="contained" onClick={handleToggleDesposit}>
							Deposit / Withdraw
						</MainButton>
					</Stack>
				}
			>
				<Stack
					direction={'row'}
					alignItems={'center'}
					justifyContent={'space-between'}
					bgcolor={setColorThemeMode(useTheme().palette.grey[200], useTheme().palette.grey[700])}
					borderRadius={TSizes.borderRadius}
					py={'4px'}
					pl={TSizes.margin_common}
				>
					<AccountAvatar
						fontSize="18px"
						avatarSize={26}
						textColor={setColorThemeMode(useTheme().palette.common.black, useTheme().palette.common.white)}
					/>

					<MainIconButton size="small" onClick={handleCopy}>
						<IconCopy size={'1rem'} />
					</MainIconButton>
				</Stack>

				<Stack spacing={TSizes.margin_common} pt={TSizes.margin_common}>
					<ItemRow title="Wallet Balance:" value={`${usdFormatter.format(Number(deposit.balance))} $`} />
					<ItemRow title="Orderly Balance:" value={`${usdFormatter.format(collateral.availableBalance)} $`} />
					<ItemRow title="Unsettled PnL:" value={`${usdFormatter.format(unsettledPnL)} $`} />
					<ItemRow title="Withdrawable Balance" value={`${usdFormatter.format(availableWithdraw)} $`} />
				</Stack>
			</MainCard>

			<Box mt={TSizes.margin_common} />

			<MainButton
				variant="contained"
				color="darkGrey"
				fullWidth
				startIcon={<IconLogout size={'1.2rem'} />}
				onClick={handleDisconnect}
			>
				Disconnect
			</MainButton>

			<DepositWithdrawDialog open={isOpenDeposit} onClose={handleToggleDesposit} />
		</MainDialog>
	);
}
