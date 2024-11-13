import { MainButton } from "@/components/button/MainButton";
import { Box, Drawer, Stack, useTheme } from "@mui/material";
import { useConnectWallet } from "@web3-onboard/react";
import { memo, useState } from "react";
import CreateOrderForm from "../components/create-order/CreateOrderForm";

const ActionPlaceOrderMobile = ({ symbol }: any) => {
	const theme = useTheme();
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(!open);
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
					zIndex={100}
					bgcolor={theme.palette.primary.main}
					borderTop={1}
					borderColor={theme.palette.primary.light}
					sx={{ borderRadius: "12px 12px 0px 0px" }}>
					<Box
						height={"10px"}
						width={"36px"}
						borderRadius={"24px"}
						bgcolor={theme.palette.primary.light}
						mx="auto"
						onClick={handleOpen}
						mb={1}></Box>
					<Stack direction={"row"} spacing={"10px"} onClick={handleOpen}>
						{!wallet ? (
							<MainButton variant="contained" fullWidth>
								Connect Wallet
							</MainButton>
						) : (
							<>
								<MainButton variant="contained" color="success" fullWidth>
									BUY
								</MainButton>

								<MainButton variant="contained" fullWidth color="error">
									SELL
								</MainButton>
							</>
						)}
					</Stack>
				</Box>
			)}

			<Drawer anchor={"bottom"} open={open} onClose={handleOpen}>
				<Box p={"10px"} pt="10px" bgcolor={theme.palette.primary.main}>
					<Box
						height={"10px"}
						width={"36px"}
						borderRadius={"24px"}
						bgcolor={theme.palette.primary.light}
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
