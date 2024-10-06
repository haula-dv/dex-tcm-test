import { themeSelectorState } from "@/common/stores/common";
import { MainButton } from "@/components/button/MainButton";
import { MainIconButton } from "@/components/button/MainIconButton";
import IconLoading from "@/components/icons/loading";
import { signAndSendRequest } from "@/utils/config/signer";
import { TLocalStorage } from "@/utils/constants/key_store";
import { getBaseUrl } from "@/utils/constants/orderly";
import { formartAddress } from "@/utils/formatters/token";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Stack, useTheme } from "@mui/material";
import { useAccount, useChains, useDeposit } from "@orderly.network/hooks";
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
	const { balance, dst } = useDeposit();
	const [_, { findByChainId }] = useChains();
	const chain = findByChainId(dst.chainId);

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

	const updateFee = async () => {
		const orderlyAccountId = account.accountId;

		if (!orderlyAccountId && !account.address) {
			return;
		}

		// const orderlyKey: any = loadOrderlyKey(account.address ?? "");

		const res = await signAndSendRequest(
			orderlyAccountId ?? "",
			(orderlyKey as any).privateKey,
			`${getBaseUrl()}/broker/fee_rate/set`,
			{
				method: "POST",
				body: JSON.stringify({
					maker_fee_rate: 0.01,
					taker_fee_rate: 0.02,
					account_ids: [`${orderlyAccountId}`],
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

			updateFee();
		}
	}, [account, wallet]);

	return (
		<Stack direction={"row"} spacing={1} alignItems={"center"}>
			{/* <MainButton onClick={updateFee}>updateFee</MainButton> */}

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
							{/* <Typography fontSize={"24px"} px="10px">
								{usdFormatter.format(Number(balance))} {chain?.network_infos.currency_symbol}
							</Typography> */}

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

			{/* <AccountMenuContainer anchorEl={accountAnchorEl} open={openAccountEl} handleClose={handleToggleAccountMenu} /> */}

			{openAccountDetailsModal && wallet && (
				<AccountDetailPopup
					open={openAccountDetailsModal}
					onClose={() => setAccountDetailsModal(false)}
					wallet={wallet}
					disconnect={disconnect}
				/>
			)}

			<OrderlyConnect />

			{/* <MainIconButton color="inherit">
				<IconDots />
			</MainIconButton> */}

			<MainIconButton onClick={handleChangeTheme} color="inherit">
				{themeSelector.activeMode == "light" ? <IconSun /> : <IconMoonStars />}
			</MainIconButton>
		</Stack>
	);
}
