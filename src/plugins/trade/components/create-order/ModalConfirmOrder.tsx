import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import { MainDialog } from "@/components/dialog/MainDialog";
import { ItemRow } from "@/plugins/pool/components/TokenSelected";
import { usdFormatter } from "@/utils/formatters/number";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { Inputs } from "./CreateOrderForm";

interface IProps {
	open: boolean;
	loading: boolean;
	handleClose: () => void;
	submitForm: () => void;
	symbol: string;
	currentValue: Inputs;
	totalPrice: any;
}

const ModalConfirmOrder = ({
	open,
	loading,
	handleClose,
	submitForm,
	symbol,
	currentValue,
	totalPrice,
}: IProps) => {
	const [_, base, quote] = symbol.split("_");
	const theme = useTheme();

	return (
		<MainDialog open={open} handleClose={handleClose} title="Confirm Order" maxWidth="xs" isDivider>
			<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} pb="10px">
				<Typography fontWeight={600}>{base}-PERP</Typography>

				<Typography color={theme.palette.success.main} fontWeight={600}>
					{currentValue.type} {currentValue.direction}
				</Typography>
			</Stack>

			<MainCard backgroudColor="transparent" disablePadding variant="outlined" width="100%">
				<Stack spacing={TSizes.margin_xs} padding={TSizes.margin_xs}>
					<ItemRow
						title="Qty."
						value={
							<Typography fontWeight={600} color={theme.palette.success.main}>
								{currentValue.quantity}
							</Typography>
						}
					/>
					<ItemRow
						title={currentValue.type === "StopMarket" ? "Trigger" : "Price"}
						value={
							currentValue.type === "Market" ? (
								"Market"
							) : (
								<Box fontWeight={600}>
									{currentValue.type === "StopMarket"
										? usdFormatter.format(
												currentValue.triggerPrice ? +currentValue.triggerPrice : 0,
										  )
										: usdFormatter.format(currentValue.price ? +currentValue.price : 0)}

									<span
										style={{
											paddingLeft: "6px",
											color: setColorThemeMode(theme.palette.grey[600], theme.palette.grey[300]),
										}}>
										{quote}
									</span>
								</Box>
							)
						}
					/>
				</Stack>
				<Divider />
				<Stack spacing={TSizes.margin_xs} padding={TSizes.margin_xs}>
					<ItemRow
						title="Est. Total"
						value={
							<Box fontWeight={600}>
								{(Math.floor(totalPrice * 100) / 100).toLocaleString()}

								<span
									style={{
										paddingLeft: "6px",
										color: setColorThemeMode(theme.palette.grey[600], theme.palette.grey[300]),
									}}>
									{quote}
								</span>
							</Box>
						}
					/>
				</Stack>
			</MainCard>

			<Stack direction={"row"} pt={TSizes.margin_common} spacing={TSizes.margin_common}>
				<MainButton
					fullWidth
					variant="contained"
					color="inherit"
					onClick={handleClose}
					disabled={loading}>
					Cancel
				</MainButton>

				<MainButton
					fullWidth
					variant="contained"
					color="primary"
					onClick={submitForm}
					isLoading={loading}
					disabled={loading}>
					Confirm
				</MainButton>
			</Stack>
		</MainDialog>
	);
};

export default ModalConfirmOrder;
