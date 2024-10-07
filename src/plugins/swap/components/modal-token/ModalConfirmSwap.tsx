import { getImageNextwork, ITokenType } from "@/common";
import { ITab } from "@/common/types/components/tab";
import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import { MainDialog } from "@/components/dialog/MainDialog";
import { usdFormatter } from "@/utils/formatters/number";
import { setColorThemeMode } from "@/utils/helpers";
import { Stack, Typography, useTheme } from "@mui/material";
import { useAccountInfo } from "@orderly.network/hooks";
import Image from "next/image";

interface IProps {
	open: boolean;
	onClose: () => void;
	sellTokenActived: ITokenType;
	buyTokenActived: ITokenType;
	inputAmount: number;
	outputAmount: number;
	sellMaxPrice: number;
	buyMaxPrice: number;
	onSubmit: () => void;
}

export const ModalConfirmSwap = ({
	onClose,
	open,
	sellTokenActived,
	buyTokenActived,
	inputAmount,
	outputAmount,
	sellMaxPrice,
	buyMaxPrice,
	onSubmit,
}: IProps) => {
	const tabs: ITab[] = [
		{ label: "Details", value: 1 },
		{ label: "Data", value: 2 },
	];

	const theme = useTheme();

	const { data } = useAccountInfo();

	// console.log(data);

	return (
		<MainDialog
			open={open}
			handleClose={onClose}
			maxWidth="xs"
			isDivider
			title={`Swap exact ${sellTokenActived.token} for token ${buyTokenActived.token}`}
			isBGWhite>
			<Stack direction={"row"} spacing={"10px"}>
				<MainCard variant="outlined" backgroudColor="transparent">
					<Stack direction={"row"} alignItems={"center"} spacing={1}>
						<Image
							src={getImageNextwork(sellTokenActived.token, "symbol_logo")}
							height={24}
							width={24}
							alt=""
						/>
						<Typography fontSize={"24px"}>{usdFormatter.format(inputAmount)}</Typography>
					</Stack>

					<Typography
						color={setColorThemeMode(useTheme().palette.grey[500], useTheme().palette.grey[100])}
						pt={"4px"}>
						Balance: {usdFormatter.format(sellMaxPrice)}
					</Typography>
				</MainCard>

				<MainCard variant="outlined" backgroudColor="transparent">
					<Stack direction={"row"} alignItems={"center"} spacing={1}>
						<Image
							src={getImageNextwork(buyTokenActived.token, "symbol_logo")}
							height={24}
							width={24}
							alt=""
						/>

						<Typography fontSize={"24px"}>{usdFormatter.format(outputAmount)}</Typography>
					</Stack>

					<Typography
						pt={"4px"}
						color={setColorThemeMode(useTheme().palette.grey[500], useTheme().palette.grey[100])}>
						Balance: {usdFormatter.format(buyMaxPrice)}
					</Typography>
				</MainCard>
			</Stack>

			{/* <Typography pt="10px" pb="4px">
				Details
			</Typography>
			<MainCard disablePadding width="100%" backgroudColor={"common"}>
				<Stack direction={"row"} justifyContent={"space-between"} p={TSizes.margin_base}>
					<Stack>
						<Typography color={"text.primary"}>Gas fee</Typography>

						<MainButton
							color={setColorThemeMode("darkGrey", "dark")}
							size="xsmall"
							variant="contained">
							Edit
						</MainButton>
					</Stack>

					<Stack>
						<Typography textAlign={"end"}>09988 ETH</Typography>
						<Typography
							textAlign={"end"}
							fontSize={"12px"}
							color={setColorThemeMode(useTheme().palette.grey[800], useTheme().palette.grey[100])}>
							$767
						</Typography>
					</Stack>
				</Stack>

				<Divider
					sx={{ borderColor: setColorThemeMode(theme.palette.divider, theme.palette.grey[600]) }}
				/>

				<Stack direction={"row"} justifyContent={"space-between"} p={TSizes.margin_base}>
					<Typography>Total amount</Typography>

					<Stack>
						<Typography>09988 ETH</Typography>
						<Typography
							textAlign={"end"}
							fontSize={"12px"}
							color={setColorThemeMode(useTheme().palette.grey[800], useTheme().palette.grey[100])}>
							$767
						</Typography>
					</Stack>
				</Stack>
			</MainCard> */}

			<Stack direction={"row"} spacing={2} pt={2}>
				<MainButton
					onClick={onClose}
					variant="outlined"
					color="darkGrey"
					size="large"
					borderWidth="2px"
					fullWidth>
					Reject
				</MainButton>

				<MainButton variant="contained" color="darkGrey" fullWidth onClick={onSubmit} size="large">
					Confirm Swap
				</MainButton>
			</Stack>
		</MainDialog>
	);
};
