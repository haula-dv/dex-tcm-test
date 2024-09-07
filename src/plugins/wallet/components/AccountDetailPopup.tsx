import { MainIconButton } from '@/components/button/MainIconButton';
import { MainCard } from '@/components/card/MainCard';
import { MainDialog } from '@/components/dialog/MainDialog';
import { IconWrapp } from '@/components/icons/IconWrapp';
import { usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useChains, useDeposit } from '@orderly.network/hooks';
import { WalletState } from '@orderly.network/hooks/esm/walletConnectorContext';
import { toast } from '@orderly.network/react';
import { IconChevronRight, IconCopy, IconLogout } from '@tabler/icons-react';
import { useConnectWallet } from '@web3-onboard/react';
import { AccountAvatar } from './AccountAvatar';

interface IProps {
	open: boolean;
	onClose: () => void;
	wallet: WalletState;
}

export default function AccountDetailPopup({ onClose, open, wallet }: IProps) {
	const { balance, dst } = useDeposit();
	const [_, { findByChainId }] = useChains();
	const chain = findByChainId(dst.chainId);

	const [{}, connect, disconnect] = useConnectWallet();

	// Handle disconnect wallet button
	const handleDisconnect = async () => {
		if (wallet) {
			disconnect(wallet);
		}
	};
	const items = [
		// {
		// 	label: 'Ethereum',
		// 	icon: (
		// 		<IconWrapp size="30px">
		// 			<Image height={24} width={24} alt="" src={'/images/avatar.png'} style={{ borderRadius: '50%' }} />
		// 		</IconWrapp>
		// 	),
		// 	onClick: function () {
		// 		console.log('');
		// 	},
		// },
		// {
		// 	label: 'Activity',
		// 	icon: (
		// 		<IconWrapp size="30px">
		// 			<IconActivity size={'1.2rem'} />
		// 		</IconWrapp>
		// 	),
		// 	onClick: function () {
		// 		console.log('');
		// 	},
		// },
		{
			label: 'Disconnect',
			icon: (
				<IconWrapp size="30px" bgcolor={useTheme().palette.grey[50]}>
					<IconLogout size={'1.2rem'} />
				</IconWrapp>
			),
			onClick: () => handleDisconnect(),
		},
	];

	const handleCopy = () => {
		navigator.clipboard
			.writeText(wallet.accounts[0].address)
			.then(() => {
				toast('Address copied!');
			})
			.catch((err) => {
				console.error('Failed to copy text: ', err);
			});
	};

	return (
		<MainDialog title="Account Details" open={open} handleClose={onClose} maxWidth="xs">
			<Box display={'flex'} justifyContent={'center'}>
				<Box display={'inline-flex'}>
					<MainCard maxWidth="auto" backgroudColor="common" borderRadius="30px">
						<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
							<AccountAvatar
								fontSize="18px"
								textColor={setColorThemeMode(useTheme().palette.common.black, useTheme().palette.common.white)}
							/>

							<MainIconButton size="small" onClick={handleCopy}>
								<IconCopy size={'1rem'} />
							</MainIconButton>
						</Stack>
					</MainCard>
				</Box>
			</Box>

			<Typography
				fontSize={'18px'}
				fontWeight={600}
				textAlign={'center'}
				color={setColorThemeMode(useTheme().palette.grey[500], useTheme().palette.grey[200])}
				pt={1}
				pb={6}
			>
				{usdFormatter.format(Number(balance))} {chain?.network_infos.currency_symbol}
			</Typography>

			<MainCard backgroudColor="common" width="100%" isHover onClick={handleDisconnect}>
				<Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
					<IconWrapp size="30px" bgcolor={setColorThemeMode(useTheme().palette.grey[50], useTheme().palette.grey[600])}>
						<IconLogout size={'1.2rem'} />
					</IconWrapp>

					<Typography fontSize={'16px'} flex={1}>
						Disconnect
					</Typography>

					<IconChevronRight />
				</Stack>
			</MainCard>
		</MainDialog>
	);
}
