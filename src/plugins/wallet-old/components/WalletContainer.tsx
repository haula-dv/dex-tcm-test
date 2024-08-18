import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Button, Stack } from "@mui/material";
import { useAccount } from "@orderly.network/hooks";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { useEffect, useState } from "react";
import { ChainsButton } from "./ChainsButton";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { MainnestList } from "./MainnestList";
import { ModalConnectWallet } from "./ModalConnectWallet";
import { OrderlyConnect } from "./OrderlyConnect";
import { WalletConnected } from "./WalletConnected";

export const WalletContainer = () => {
	const [isOpenModalConnectWallet, setIsOpenModalConnectWallet] = useState(false);

	const handleToggleModalConnectWallet = () => {
		setIsOpenModalConnectWallet(!isOpenModalConnectWallet);
	};

	const { account } = useAccount();
	const [{ wallet }, connect, disconnectWallet] = useConnectWallet();
	const [{ connectedChain }, setChain] = useSetChain();

	useEffect(() => {
		if (!wallet) return;
		account.setAddress(wallet.accounts[0].address, {
			provider: wallet.provider,
			chain: {
				id: wallet.chains[0].id,
			},
		});
	}, [wallet, account]);

	return (
		<>
			<Stack direction={"row"} spacing={TSizes.margin_xs} justifyContent={"flex-end"} alignItems={"center"}>
				<Button variant="contained" color="secondary">
					0 SAP
				</Button>

				<ChainsButton />

				{wallet ? <WalletConnected /> : <ConnectWalletButton />}
				<MainnestList />
			</Stack>

			<ModalConnectWallet isOpen={isOpenModalConnectWallet} onClose={handleToggleModalConnectWallet} />

			<OrderlyConnect />
		</>
	);
};
