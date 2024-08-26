import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { MainDialog } from '@/components/dialog/MainDialog';
import { theme } from '@/utils';
import { Box, Stack, Typography } from '@mui/material';
import { ItemRow } from '../components/TokenSelected';

interface IProps {
	open: boolean;
	onClose: () => void;
	handleToggleSignatureRequestConfirm: () => void;
}

export const SignatureRequestModal = ({ onClose, handleToggleSignatureRequestConfirm, open }: IProps) => {
	return (
		<MainDialog open={open} handleClose={onClose} hiddenHeader maxWidth="xs">
			<Stack direction={'row'} spacing={1} alignItems={'center'}>
				<Box
					height={'40px'}
					width={'40px'}
					bgcolor={theme.palette.info.light}
					borderRadius={'50%'}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
				>
					🐼
				</Box>

				<Typography fontSize={'17px'}>Ethereum Mainnet</Typography>
			</Stack>

			<Typography fontWeight={600} fontSize={'18px'} py={2}>
				Signature Request
			</Typography>

			<Stack direction={'row'} spacing={1} alignItems={'center'}>
				<Box
					height={'40px'}
					width={'40px'}
					bgcolor={theme.palette.info.light}
					borderRadius={'50%'}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
				>
					🐼
				</Box>

				<Stack>
					<Typography fontWeight={600} fontSize={'17px'}>
						Swaplux V2
					</Typography>

					<Typography fontSize={'13px'} color={theme.palette.grey[600]}>
						https://app.bazaar.org/0xod1738...9932ecdb
					</Typography>
				</Stack>
			</Stack>

			<Stack>
				<Typography fontWeight={600} fontSize={'18px'} pb={1} pt={2}>
					Message
				</Typography>

				<MainCard backgroudColor="primary" width="100%">
					<Stack spacing={1}>
						<ItemRow title="Owner" value="0x0D2949e0d34bF20ABdA1B39303..." />
						<ItemRow title="Spender" value="0x0D2949e0d34bF20ABdA1B39303..." />
						<ItemRow title="Value" value="43025497" />
						<ItemRow title="Nonce" value="0x00" />
						<ItemRow title="Deadline" value="1718892230" />
					</Stack>
				</MainCard>
			</Stack>

			<Stack direction={'row'} spacing={1} pt={2}>
				<MainButton fullWidth variant="outlined" color="darkGrey" borderWidth="2px" onClick={onClose} size="large">
					Cancel
				</MainButton>

				<MainButton
					fullWidth
					variant="contained"
					color="darkGrey"
					onClick={handleToggleSignatureRequestConfirm}
					size="large"
				>
					Sign
				</MainButton>
			</Stack>
		</MainDialog>
	);
};
