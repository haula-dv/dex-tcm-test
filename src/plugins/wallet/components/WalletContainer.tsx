import { themeSelectorState } from "@/common/stores/common";
import { MainButton } from "@/components/button/MainButton";
import { MainIconButton } from "@/components/button/MainIconButton";
import IconLoading from "@/components/icons/loading";

import { TLocalStorage } from "@/utils/constants/key_store";
import { getBaseUrl } from "@/utils/constants/orderly";
import { formartAddress } from "@/utils/formatters/token";
import { setColorThemeMode } from "@/utils/helpers";
import { loadAccountId, loadOrderlyKey, signAndSendRequest } from "@/utils/helpers/orderlyHelper";
import { Box, Stack, useTheme } from "@mui/material";
import { useAccount } from "@orderly.network/hooks";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useConnectWallet } from "@web3-onboard/react";
import { setZustandValue } from "nes-zustand";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import AccountDetailPopup from "./AccountDetailPopup";
import NetworkContent from "./NetworkContent";
import { OrderlyConnect } from "./OrderlyConnect";

export default function WalletContainer() {
	const themeSelector = useStore(themeSelectorState, (state) => state.value);
	const theme = useTheme();

	// Handle change theme mode
	const handleChangeTheme = () => {
		localStorage.setItem(
			TLocalStorage.DEX_THEME_MODE,
			themeSelector.activeMode == "light" ? "dark" : "light",
		);
		setZustandValue(themeSelectorState, (prev: any) => {
			return {
				...prev,
				activeMode: prev.activeMode == "light" ? "dark" : "light",
			};
		});

		location.reload();
	};

	// Account Details
	const [openAccountDetailsModal, setAccountDetailsModal] = useState(false);

	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
	const { account } = useAccount();
	const orderlyKey = account.keyStore.getOrderlyKey();

	// Handle connect wallet button
	const handleConnectWallet = async () => {
		await connect();
		location.reload();
	};

	// Handle close menu account
	const handleToggleAccountMenu = () => {
		setAccountDetailsModal(!openAccountDetailsModal);
	};

	// Update fee
	const updateFee = async () => {
		const orderlyKey: any = loadOrderlyKey(wallet?.accounts[0].address ?? "");
		const orderlyAccountId: any = loadAccountId(wallet?.accounts[0].address ?? "");

		await signAndSendRequest(
			orderlyAccountId,
			orderlyKey,
			`${getBaseUrl()}/broker/fee_rate/set`,
			{
				method: "POST",
				body: JSON.stringify({
					maker_fee_rate: 0.001,
					taker_fee_rate: 0.002,
					account_ids: [orderlyAccountId],
				}),
			},

			// `${getBaseUrl()}/volume/broker/daily?=start_date=2024-10-10&end_date=2024-10-14`,
		)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const test = async () => {
		const orderlyKey: any = loadOrderlyKey(wallet?.accounts[0].address ?? "");
		const accountId: any = loadAccountId(wallet?.accounts[0].address ?? "");

		const res = await signAndSendRequest(
			accountId ?? "",
			orderlyKey,
			`${getBaseUrl()}/broker/fee_rate/set`,
			{
				method: "POST",
				body: JSON.stringify({
					maker_fee_rate: 0.01,
					taker_fee_rate: 0.02,
					account_ids: [`0x447a19c8351818103725a75bc52fb32b38a22b286de783e0eb6ef4d9b0167ae1`],
				}),
			},
		);

		const response = await res.json();
		console.log(response);
	};

	// Watch wallet change
	useEffect(() => {
		if (Array.isArray(wallet?.accounts) && wallet.accounts.length > 0) {
			const item = wallet.accounts[0];
			const chain = wallet.chains[0];

			account.setAddress(item.address, {
				provider: wallet.provider,
				chain: {
					id: chain.id,
				},
				wallet: {
					name: wallet.label,
				},
			});
		}
	}, [account, wallet]);

	return (
		<Stack direction={"row"} spacing={1} alignItems={"center"}>
			<button onClick={updateFee}> Update Fee</button>

			<NetworkContent />

			{connecting ? (
				<MainButton
					startIcon={<IconLoading height="20px" width="20px" />}
					variant="contained"
					color={setColorThemeMode("darkGrey", "white")}>
					Connecting
				</MainButton>
			) : (
				<>
					{!wallet ? (
						<MainButton
							onClick={handleConnectWallet}
							variant="contained"
							color={setColorThemeMode("darkGrey", "white")}>
							Connect to Wallet
						</MainButton>
					) : (
						<>
							<MainButton
								variant="contained"
								color={setColorThemeMode("darkGrey", "white")}
								onClick={handleToggleAccountMenu}>
								{formartAddress(wallet.accounts[0].address)}
							</MainButton>

							<Box
								height={"40px"}
								width={"40px"}
								bgcolor={theme.palette.info.light}
								borderRadius={"50%"}
								display={"flex"}
								alignItems={"center"}
								justifyContent={"center"}>
								<Image src={wallet.icon} height={20} width={20} alt={wallet.label} />
							</Box>
						</>
					)}
				</>
			)}

			{openAccountDetailsModal && wallet && (
				<AccountDetailPopup
					open={openAccountDetailsModal}
					onClose={() => setAccountDetailsModal(false)}
					wallet={wallet}
					disconnect={disconnect}
				/>
			)}

			<OrderlyConnect />

			<MainIconButton onClick={handleChangeTheme} color="inherit">
				{themeSelector.activeMode == "light" ? <IconSun /> : <IconMoonStars />}
			</MainIconButton>
		</Stack>
	);
}
