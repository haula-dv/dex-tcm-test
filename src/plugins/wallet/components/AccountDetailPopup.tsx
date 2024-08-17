import { MainIconButton } from '@/src/components/button/MainIconButton';
import { MainCard } from '@/src/components/card/MainCard';
import { MainDialog } from '@/src/components/dialog/MainDialog';
import { IconWrapp } from '@/src/components/icons/IconWrapp';
import { ItemList } from '@/src/components/list/ItemList';
import { theme } from '@/src/utils';
import { usdFormatter } from '@/src/utils/format/number';
import { Box, Stack, Typography } from '@mui/material';
import { useChains, useDeposit } from '@orderly.network/hooks';
import { WalletState } from '@orderly.network/hooks/esm/walletConnectorContext';
import { IconActivity, IconCopy } from '@tabler/icons-react';
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

	const items = [
		{
			label: 'Ethereum',
			icon: (
				<Image
					height={30}
					width={30}
					alt=""
					src={'/images/avatar.png'}
					style={{ borderRadius: '50%' }}
				/>
			),
		},
		{
			label: 'Activity',
			icon: (
				<IconWrapp size="30px">
					<IconActivity size={'1.2rem'} />
				</IconWrapp>
			),
		},
		{
			label: 'Disconnect',
			icon: (
				<IconWrapp size="30px">
					<IconActivity size={'1.2rem'} />
				</IconWrapp>
			),
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

			<Typography
				fontSize={'18px'}
				fontWeight={600}
				textAlign={'center'}
				color={theme.palette.grey[500]}
				pt={1}
			>
				{usdFormatter.format(Number(balance))} {chain?.network_infos.currency_symbol}
			</Typography>

			<Stack spacing={1} pt={6}>
				{items.map((item) => (
					<ItemList key={item.label} startIcon={item.icon} primaryText={item.label} />
				))}
			</Stack>
		</MainDialog>
	);
}
