import { MainButton } from "@/components/button/MainButton";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Drawer, Stack, useTheme } from "@mui/material";
import { useConnectWallet } from "@web3-onboard/react";
import { memo, useState } from "react";
import CreateOrderForm from "../components/create-order/CreateOrderForm";

const ActionPlaceOrderMobile = ({ symbol }: any) => {
	const theme = useTheme();
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		if (!wallet) {
			return;
		}

		setOpen(!open);
	};

	// Handle connect wallet button
	const handleConnectWallet = async () => {
		await connect();
		location.reload();
	};

	return (
		<>
			{!open && (
				<Box
					position={"fixed"}
					bottom={0}
					left={0}
					p={1}
					width={"100%"}
					mt={1}
					zIndex={20}
					bgcolor={setColorThemeMode(theme.palette.primary.main, theme.palette.grey[800])}
					borderTop={1}
					borderColor={setColorThemeMode(theme.palette.primary.light, theme.palette.grey[800])}
					sx={{ borderRadius: "12px 12px 0px 0px" }}>
					<Box
						height={"10px"}
						width={"36px"}
						borderRadius={"24px"}
						bgcolor={setColorThemeMode(theme.palette.primary.light, theme.palette.grey[600])}
						mx="auto"
						onClick={handleOpen}
						mb={1}></Box>
					<Stack direction={"row"} spacing={"10px"}>
						{!wallet ? (
							<MainButton
								variant="contained"
								fullWidth
								onClick={handleConnectWallet}
								isLoading={connecting}>
								Connect Wallet
							</MainButton>
						) : (
							<>
								<MainButton variant="contained" color="success" fullWidth onClick={handleOpen}>
									BUY
								</MainButton>

								<MainButton variant="contained" fullWidth color="error" onClick={handleOpen}>
									SELL
								</MainButton>
							</>
						)}
					</Stack>
				</Box>
			)}

			<Drawer anchor={"bottom"} open={open} onClose={handleOpen}>
				<Box
					p={"10px"}
					pt="10px"
					bgcolor={setColorThemeMode(theme.palette.primary.main, theme.palette.grey[800])}>
					<Box
						height={"10px"}
						width={"36px"}
						borderRadius={"24px"}
						bgcolor={setColorThemeMode(theme.palette.primary.light, theme.palette.grey[600])}
						mx="auto"
						mb={"10px"}
						onClick={handleOpen}></Box>

					<Box sx={{ overflowY: "auto" }} height={"calc(100vh - 60px)"} borderRadius={"10px"}>
						<CreateOrderForm symbol={symbol} />
					</Box>
				</Box>
			</Drawer>
		</>
	);
};

export default memo(ActionPlaceOrderMobile);
