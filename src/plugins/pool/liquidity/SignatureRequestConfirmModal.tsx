import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { MainDialog } from '@/components/dialog/MainDialog';
import IconTransactionPrice from '@/components/icons/transaction-price';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { ItemRow } from '../components/TokenSelected';
import { CustomizeGasModal } from './CustomizeGasModal';

interface IProps {
	open: boolean;
	onClose: () => void;
}

export const SignatureRequestConfirmModal = ({ onClose, open }: IProps) => {
	const [isCustomizeGas, setIsCustomGas] = useState(false);

	const handleToggleCustomGas = () => {
		setIsCustomGas(!isCustomizeGas);
	};

	return (
		<>
			<MainDialog open={open} handleClose={onClose} hiddenHeader maxWidth="xs">
				<Stack direction={'row'} spacing={1} alignItems={'center'}>
					<Box
						height={'40px'}
						width={'40px'}
						bgcolor={useTheme().palette.info.light}
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
					Allow https://app.bazaar.org to spend your Swaplux V2?
				</Typography>

				<Typography color={useTheme().palette.grey[500]}>
					Do you trust this site? By granting this permission, you’re allwoing Https://app.bazaar.org to withdraw your
					Swaplux V2 and automate transactions for you.
				</Typography>

				<Typography fontWeight={700} pt={2} pb={0.5}>
					Edit Permission
				</Typography>

				<MainCard backgroudColor="primary" width="100%">
					<Stack spacing={1}>
						<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
							<Stack direction={'row'} alignItems={'center'} spacing={0.5}>
								<IconTransactionPrice />
								<Typography>Transaction Fee</Typography>
							</Stack>

							<MainButton size="small" color="darkPrimary" variant="contained" onClick={handleToggleCustomGas}>
								Edit
							</MainButton>
						</Stack>

						<Divider />
						<ItemRow title="A fee is associated" value="$6.72" />
						<ItemRow
							title=""
							value={
								<Typography fontSize={'15px'} color={useTheme().palette.grey[400]}>
									0.004871ETH{' '}
								</Typography>
							}
						/>
					</Stack>
				</MainCard>

				<Stack pt={2}>
					<MainButton fullWidth color="inherit">
						View Full Transaction Details
					</MainButton>

					<Stack direction={'row'} spacing={1} pt={2}>
						<MainButton fullWidth variant="outlined" color="darkGrey" borderWidth="2px" size="large">
							Reject
						</MainButton>

						<MainButton fullWidth variant="contained" color="darkGrey" size="large">
							Confirm
						</MainButton>
					</Stack>
				</Stack>
			</MainDialog>

			<CustomizeGasModal open={isCustomizeGas} onClose={handleToggleCustomGas} />
		</>
	);
};
