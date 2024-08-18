import { MainButton } from "@/components/button/MainButton";
import { MainDialog } from "@/components/dialog/MainDialog";
import { idFromHexChainId } from "@/utils/formatters/token";
import { Alert, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useChains } from "@orderly.network/hooks";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { useState } from "react";
import { ChainList } from "./ChainList";

export const UnSupportNextworkAlert = () => {
	const [openModal, setOpenModal] = useState(false);
	const [{ wallet }, connect, disconnectWallet] = useConnectWallet();

	const [{ connectedChain }, setChain] = useSetChain();
	const [_, { findByChainId }] = useChains();

	// GET CURRENT CHAIN
	const currentChain = findByChainId(idFromHexChainId(connectedChain?.id ?? ""));

	const handleToggleModal = () => {
		setOpenModal(!openModal);
	};

	if (wallet && !currentChain)
		return (
			<>
				<CustomAlert color="warning" icon={<></>}>
					<Stack direction={"row"} alignItems={"center"} spacing={1}>
						<Typography fontSize={"12px"} fontWeight={600}>
							Please connect to a supported network.
						</Typography>

						<MainButton variant="outlined" size="small" color="warning" onClick={handleToggleModal}>
							Switch network
						</MainButton>
					</Stack>
				</CustomAlert>

				<MainDialog
					open={openModal}
					handleClose={handleToggleModal}
					title="Switch network"
					disablePadding
					maxWidth="xs"
					isFullwidth={false}>
					<ChainList maxWidth="360px" handleClose={handleToggleModal} />
				</MainDialog>
			</>
		);
};

const CustomAlert = styled(Alert)(({ theme }) => ({
	"& .MuiAlert-message": {
		padding: "0px",
		with: "100%",
		margin: "auto",
	},
}));
