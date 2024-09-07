import { MainButton } from '@/components/button/MainButton';
import { MainDialog } from '@/components/dialog/MainDialog';
import IconTransaction from '@/components/icons/transaction';
import { setColorThemeMode } from '@/utils/helpers';
import { Box, Stack, Typography } from '@mui/material';

interface IProps {
	open: boolean;
	onClose: () => void;
}

export const TransationSubmittedCard = ({ open, onClose }: IProps) => {
	return (
		<MainDialog open={open} handleClose={onClose} maxWidth="xs" hiddenHeader>
			<Box width={'100%'}>
				<Box display={'flex'} justifyContent={'center'} mx={'auto'}>
					<IconTransaction color={setColorThemeMode('#3F3F3F', '#fff')} />
				</Box>

				<Typography fontSize={'18px'} fontWeight={600} textAlign={'center'} pt={2}>
					Transaction Submitted
				</Typography>

				<Typography textAlign={'center'} py={1}>
					Swaping 099ETH for 08092088 ALM
				</Typography>

				<Stack spacing={1}>
					<MainButton size="large" color="inherit">
						View on Therscan
					</MainButton>

					<MainButton size="large" variant="contained" color={setColorThemeMode('darkGrey', 'white')} onClick={onClose}>
						Close
					</MainButton>
				</Stack>
			</Box>
		</MainDialog>
	);
};
