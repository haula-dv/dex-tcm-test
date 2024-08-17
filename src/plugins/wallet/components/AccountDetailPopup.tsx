import { MainIconButton } from '@/src/components/button/MainIconButton';
import { MainCard } from '@/src/components/card/MainCard';
import { MainDialog } from '@/src/components/dialog/MainDialog';
import { formartAddress } from '@/src/utils/format/token';
import { Stack, Typography } from '@mui/material';
import { WalletState } from '@orderly.network/hooks/esm/walletConnectorContext';
import { IconCopy } from '@tabler/icons-react';

interface IProps {
	open: boolean;
	onClose: () => void;
	wallet: WalletState;
}

export default function AccountDetailPopup({ onClose, open, wallet }: IProps) {
	return (
		<MainDialog title="Account Details" open={open} handleClose={onClose} maxWidth="xs">
			<MainCard>
				<Stack direction={'row'}>
					<Typography>{formartAddress(wallet.accounts[0].address)}</Typography>

					<MainIconButton size="small">
						<IconCopy size={'1rem'} />
					</MainIconButton>
				</Stack>
			</MainCard>
		</MainDialog>
	);
}
