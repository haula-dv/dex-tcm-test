import { ITokenType } from "@/common";
import { MainButton } from "@/components/button/MainButton";
import { MainDialog } from "@/components/dialog/MainDialog";
import IconTransaction from "@/components/icons/transaction";
import { usdFormatter } from "@/utils/formatters/number";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Stack, Typography } from "@mui/material";

interface IProps {
	open: boolean;
	onClose: () => void;
	sellTokenActived: ITokenType;
	buyTokenActived: ITokenType;
	buyDetail: any;
	sellDetail: any;
}

export const TransationSubmittedCard = ({
	open,
	onClose,
	sellDetail,
	buyDetail,
	sellTokenActived,
	buyTokenActived,
}: IProps) => {
	return (
		<MainDialog open={open} handleClose={onClose} maxWidth="xs" hiddenHeader>
			<Box width={"100%"}>
				<Box display={"flex"} justifyContent={"center"} mx={"auto"}>
					<IconTransaction color={setColorThemeMode("#3F3F3F", "#fff")} />
				</Box>

				<Typography fontSize={"18px"} fontWeight={600} textAlign={"center"} pt={2}>
					Transaction Submitted
				</Typography>

				<Typography textAlign={"center"} py={1}>
					Swaping {usdFormatter.format(sellDetail.order_quantity)}
					{sellTokenActived.token} for {usdFormatter.format(buyDetail.order_quantity)}{" "}
					{buyTokenActived.token}
				</Typography>

				<Stack spacing={1}>
					<MainButton size="large" color="inherit">
						View on Therscan
					</MainButton>

					<MainButton
						size="large"
						variant="contained"
						color={setColorThemeMode("darkGrey", "white")}
						onClick={onClose}>
						Close
					</MainButton>
				</Stack>
			</Box>
		</MainDialog>
	);
};
