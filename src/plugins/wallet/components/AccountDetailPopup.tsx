import { MainIconButton } from '@/components/button/MainIconButton';
import { MainCard } from '@/components/card/MainCard';
import { MainDialog } from '@/components/dialog/MainDialog';
import { IconWrapp } from '@/components/icons/IconWrapp';
import { ItemList } from '@/components/list/ItemList';
import { theme } from '@/utils';
import { usdFormatter } from '@/utils/formatters/number';
import { Box, Stack, Typography } from '@mui/material';
import { useChains, useDeposit } from '@orderly.network/hooks';
import { WalletState } from '@orderly.network/hooks/esm/walletConnectorContext';
import { IconActivity, IconCopy, IconLogout } from '@tabler/icons-react';
import { useConnectWallet } from '@web3-onboard/react';
import Image from 'next/image';
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
		{
			label: 'Ethereum',
			icon: (
				<IconWrapp size="30px">
					<Image height={24} width={24} alt="" src={'/images/avatar.png'} style={{ borderRadius: '50%' }} />
				</IconWrapp>
			),
			onClick: function () {
				console.log('');
			},
		},
		{
			label: 'Activity',
			icon: (
				<IconWrapp size="30px">
					<IconActivity size={'1.2rem'} />
				</IconWrapp>
			),
			onClick: function () {
				console.log('');
			},
		},
		{
			label: 'Disconnect',
			icon: (
				<IconWrapp size="30px" bgcolor={theme.palette.grey[800]}>
					<IconLogout size={'1.2rem'} />
				</IconWrapp>
			),
			onClick: () => handleDisconnect(),
		},
	];

	return (
		<MainDialog title="Account Details" open={open} handleClose={onClose} maxWidth="xs">
			<Box display={'flex'} justifyContent={'center'}>
				<Box display={'inline-flex'}>
					<MainCard maxWidth="auto" borderRadius="30px">
						<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
							<AccountAvatar />

							<MainIconButton size="small">
								<IconCopy size={'1rem'} />
							</MainIconButton>
						</Stack>
					</MainCard>
				</Box>
			</Box>

			<Typography fontSize={'18px'} fontWeight={600} textAlign={'center'} color={theme.palette.grey[500]} pt={1}>
				{usdFormatter.format(Number(balance))} {chain?.network_infos.currency_symbol}
			</Typography>

			<Stack spacing={1} pt={6}>
				{items.map((item) => (
					<ItemList key={item.label} startIcon={item.icon} primaryText={item.label} onClick={item.onClick} />
				))}
			</Stack>
		</MainDialog>
	);
}
