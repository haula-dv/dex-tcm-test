import { loadingState } from "@/common/stores/global-loading";
import { MainButton } from "@/components/button/MainButton";
import { MainIconButton } from "@/components/button/MainIconButton";
import IconStarGreen from "@/components/icons/star-green";
import { MainPopup } from "@/components/popup/MainPopup";
import { useIsTestnet } from "@/hooks/useIsTestnet";
import { mainToast } from "@/utils/lib/toast";
import { Stack, Typography } from "@mui/material";
import { IconCopy, IconPlugOff } from "@tabler/icons-react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { setZustandValue } from "nes-zustand";
import { useState } from "react";

export const WalletConnected = () => {
	const [isTestnet] = useIsTestnet();
	const [{ wallet }, _, disconnectWallet] = useConnectWallet();
	const [{ connectedChain }] = useSetChain();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDisconnect = async () => {
		setZustandValue(loadingState, true);
		// Disconnect from wallet
		if (wallet) await disconnectWallet({ label: wallet.label });
		setZustandValue(loadingState, false);
	};

	const handleCopyAddress = () => {
		if (wallet) navigator.clipboard.writeText(wallet.accounts[0].address);
		mainToast("Address copied to clipboard", "success");
	};

	// GET TOKEN INFOS
	// const token = useMemo(() => {
	//   return Array.isArray(chains) ? chains[0].token_infos[0] : undefined;
	// }, [chains]);

	// const deposit = useDeposit({
	//   address: token?.address,
	//   decimals: token?.decimals,
	//   srcToken: token?.symbol,
	//   srcChainId: Number(connectedChain?.id),
	// });

	return (
		<>
			{/* <Typography fontSize={"18px"} fontWeight={600}>
            {wallet.accounts[0].balance ? wallet.accounts[0].balance.ETH : 0}{" "}
            ETH
          </Typography> */}
			{wallet && (
				<MainButton
					variant="filledTonal"
					color="inherit"
					startIcon={<IconStarGreen />}
					id="wallet-button"
					aria-controls={open ? "wallet-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
					onClick={handleClick}>
					{wallet.accounts[0].address.substring(0, 6)}...
					{wallet.accounts[0].address.substr(-4)}
				</MainButton>
			)}

			<MainPopup
				id="wallet-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "wallet-button",
				}}>
				<Stack px={1} py={1}>
					{wallet && (
						<Stack direction={"row"} spacing={1.5} alignItems={"center"} pb={2}>
							<Typography fontWeight={600}>
								{wallet.accounts[0].address.substring(0, 20)}...
								{wallet.accounts[0].address.substr(-4)}
							</Typography>

							<MainIconButton size="small" onClick={handleCopyAddress}>
								<IconCopy size={"1.2rem"} />
							</MainIconButton>
						</Stack>
					)}

					<MainButton startIcon={<IconPlugOff />} variant="filledTonal" color="inherit" onClick={handleDisconnect}>
						Disconnect
					</MainButton>
				</Stack>
			</MainPopup>
		</>
	);
};
