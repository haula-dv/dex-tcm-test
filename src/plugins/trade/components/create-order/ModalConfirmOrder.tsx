import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { MainDialog } from '@/components/dialog/MainDialog';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import { Inputs } from './CreateOrderForm';

interface IProps {
	open: boolean;
	loading: boolean;
	handleClose: () => void;
	submitForm: () => void;
	symbol: string;
	currentValue: Inputs;
}

const ModalConfirmOrder = ({ open, loading, handleClose, submitForm, symbol, currentValue }: IProps) => {
	const [_, base, quote] = symbol.split('_');
	const theme = useTheme();

	const totalEst = () => {
		const price = currentValue.price ? +currentValue.price : 0;
		const quantity = currentValue.quantity ? +currentValue.quantity : 0;

		return price * quantity;
	};

	return (
		<MainDialog open={open} handleClose={handleClose} title="Confirm Order" maxWidth="xs">
			<Divider />

			<Typography fontSize={'18px'} fontWeight={600} pt="10px">
				{base}-PERP
			</Typography>

			<Typography color={theme.palette.success.main} pb="6px" fontWeight={600} pt="2px">
				{currentValue.type} {currentValue.direction}
			</Typography>

			<MainCard backgroudColor="common" width="100%">
				<Stack spacing={TSizes.margin_xs}>
					<ItemRow
						title="Qty."
						value={
							<Typography fontWeight={600} color={theme.palette.success.main}>
								{currentValue.quantity}
							</Typography>
						}
					/>
					<ItemRow
						title="Price"
						value={
							<Box fontWeight={600}>
								{usdFormatter.format(currentValue.price ? +currentValue.price : 0)}
								<span
									style={{
										paddingLeft: '6px',
										color: setColorThemeMode(theme.palette.grey[600], theme.palette.grey[300]),
									}}
								>
									{quote}
								</span>
							</Box>
						}
					/>
					<ItemRow
						title="Est. Total"
						value={
							<Box fontWeight={600}>
								{usdFormatter.format(totalEst())}
								<span
									style={{
										paddingLeft: '6px',
										color: setColorThemeMode(theme.palette.grey[600], theme.palette.grey[300]),
									}}
								>
									{quote}
								</span>
							</Box>
						}
					/>
				</Stack>
			</MainCard>

			<Stack direction={'row'} pt={TSizes.margin_common} spacing={TSizes.margin_common}>
				<MainButton fullWidth variant="contained" color="inherit" onClick={handleClose}>
					Cancel
				</MainButton>

				<MainButton fullWidth variant="contained" color="primary" onClick={submitForm} isLoading={loading}>
					Confirm
				</MainButton>
			</Stack>
		</MainDialog>
	);
};

export default ModalConfirmOrder;
