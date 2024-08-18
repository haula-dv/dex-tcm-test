import { formartAddress } from "@/utils/formatters/token";
import { Stack, Typography } from "@mui/material";
import { useConnectWallet } from "@web3-onboard/react";
import Image from "next/image";

export const AccountAvatar = () => {
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

	return (
		<Stack direction={"row"} alignItems={"center"} spacing={1}>
			<Image src={"/images/avatar.png"} alt="" height={20} width={20} style={{ borderRadius: "50%" }} />

			{wallet && <Typography>{formartAddress(wallet.accounts[0].address)}</Typography>}
		</Stack>
	);
};
