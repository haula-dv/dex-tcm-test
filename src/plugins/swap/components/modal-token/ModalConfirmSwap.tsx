import { ITab } from '@/common/types/components/tab';
import { MainButton } from '@/components/button/MainButton';
import MainCard from '@/components/card/MainCard';
import { MainDialog } from '@/components/dialog/MainDialog';
import { GrayTab } from '@/components/tab/GrayTab';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import { setZustandValue } from 'nes-zustand';
import Image from 'next/image';
import { isTransactionSubmittedState } from '../../store';

interface IProps {
	open: boolean;
	onClose: () => void;
}

export const ModalConfirmSwap = ({ onClose, open }: IProps) => {
	const tabs: ITab[] = [
		{ label: 'Details', value: 1 },
		{ label: 'Data', value: 2 },
	];

	const handleConfirm = () => {
		setZustandValue(isTransactionSubmittedState, true);
		onClose();
	};
	const theme = useTheme();

	return (
		<MainDialog open={open} handleClose={onClose} maxWidth="xs" title="Swap Exact ETH for Token" isBGWhite>
			<Stack direction={'row'} alignItems={'center'} spacing={1} pb={0.5}>
				<Typography fontSize={'24px'}>0.5</Typography>
				<Image src={'/images/token.png'} height={24} width={24} alt="" />
			</Stack>

			<Typography pb={2} color={setColorThemeMode(useTheme().palette.grey[500], useTheme().palette.grey[100])}>
				Balance: $099998
			</Typography>

			<GrayTab tabs={tabs} />

			<Box pt={2} />

			<MainCard disablePadding width="100%" backgroudColor={'common'}>
				<Stack direction={'row'} justifyContent={'space-between'} p={TSizes.margin_base}>
					<Stack>
						<Typography color={'text.primary'}>Gas fee</Typography>

						<MainButton color={setColorThemeMode('darkGrey', 'dark')} size="xsmall" variant="contained">
							Edit
						</MainButton>
					</Stack>

					<Stack>
						<Typography textAlign={'end'}>09988 ETH</Typography>
						<Typography
							textAlign={'end'}
							fontSize={'12px'}
							color={setColorThemeMode(useTheme().palette.grey[800], useTheme().palette.grey[100])}
						>
							$767
						</Typography>
					</Stack>
				</Stack>

				<Divider sx={{ borderColor: setColorThemeMode(theme.palette.divider, theme.palette.grey[600]) }} />

				<Stack direction={'row'} justifyContent={'space-between'} p={TSizes.margin_base}>
					<Typography>Total amount</Typography>

					<Stack>
						<Typography>09988 ETH</Typography>
						<Typography
							textAlign={'end'}
							fontSize={'12px'}
							color={setColorThemeMode(useTheme().palette.grey[800], useTheme().palette.grey[100])}
						>
							$767
						</Typography>
					</Stack>
				</Stack>
			</MainCard>

			<Stack direction={'row'} spacing={2} pt={2}>
				<MainButton onClick={onClose} variant="outlined" color="darkGrey" size="large" borderWidth="2px" fullWidth>
					Reject
				</MainButton>

				<MainButton variant="contained" color="darkGrey" fullWidth onClick={handleConfirm} size="large">
					Confirm Swap
				</MainButton>
			</Stack>
		</MainDialog>
	);
};
