import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import { MainDialog } from "@/components/dialog/MainDialog";
import { NetworkId } from "@/provider/OrderlyConfigProviderRoot";
import { AppInfo } from "@/utils/constants/key_store";
import { usdFormatter } from "@/utils/formatters/number";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { useAccount } from "@orderly.network/hooks";
import { WalletState } from "@orderly.network/hooks/esm/walletConnectorContext";
import { useNotifications, useSetChain } from "@web3-onboard/react";
import Image from "next/image";
import { memo, useState } from "react";

interface IProps {
	availableWithdraw: number;
	quote: string;
	wallet: WalletState | null;
	isFristLoading: boolean;
}

export const Balance = memo(({ availableWithdraw, quote, wallet, isFristLoading }: IProps) => {
	// Orderly hooks
	const [{ connectedChain }] = useSetChain();
	const { account } = useAccount();

	const [open, setOpen] = useState(false);
	const networkId = (localStorage.getItem("networkId") ?? "mainnet") as NetworkId;
	const [_, customNotification] = useNotifications();

	// Handle get test USDC
	const handleGetTestUSDC = async () => {
		const { update } = customNotification({
			eventCode: "mint",
			type: "pending",
			message: "Minting 1k USDC on testnet...",
		});

		try {
			const res = await fetch("https://testnet-operator-evm.orderly.org/v1/faucet/usdc", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify({
					broker_id: AppInfo.BROKER_ID,
					chain_id: String(Number(connectedChain?.id)),
					user_address: account.address,
				}),
			});

			if (!res.ok) {
				throw new Error(res.status === 429 ? "Too many requests" : res.statusText);
			}

			const { success, message } = (await res.json()) as any;

			if (!success) {
				throw new Error(message);
			}

			update({
				eventCode: "mintSuccess",
				type: "success",
				message: "Mint success! It might take a while to be received in your Orderly account",
				autoDismiss: 8_000,
			});

			location.reload();
		} catch (err) {
			console.error(err);
			if (update) {
				let message: string;
				if (err instanceof Error) {
					message = err.message;
				} else {
					message = "Mint failed!";
				}
				update({
					eventCode: "mintError",
					type: "error",
					message,
					autoDismiss: 5_000,
				});
			}
			throw err;
		}
	};

	const theme = useTheme();

	return (
		<>
			<MainCard backgroudColor="primaryLight" width="100%">
				<Stack direction={"row"} justifyContent={"space-between"}>
					<Typography
						fontSize={"12px"}
						color={setColorThemeMode(useTheme().palette.grey[600], useTheme().palette.grey[200])}>
						Total balance
					</Typography>

					{isFristLoading ? (
						<Skeleton variant="text" width={"100px"} />
					) : (
						<Typography fontWeight={600} fontSize={"20px"}>
							{usdFormatter.format(availableWithdraw)}{" "}
							<span
								style={{
									color: setColorThemeMode(theme.palette.grey[700], theme.palette.grey[300]),
								}}>
								{quote}
							</span>
						</Typography>
					)}
				</Stack>

				{networkId == "testnet" && (
					<>
						<Box mb={TSizes.margin_xs} />

						<MainButton
							size="xsmall"
							variant="outlined"
							color="inherit"
							fullWidth
							onClick={handleGetTestUSDC}>
							<Image
								src={"/images/USDC.png"}
								height={18}
								width={18}
								alt=""
								style={{ marginRight: "4px" }}
							/>{" "}
							Get 1,000 test {quote}
						</MainButton>
					</>
				)}
			</MainCard>

			<Box mb={TSizes.margin_xs} />

			<MainDialog open={open} handleClose={() => setOpen(false)} maxWidth="xs" hiddenHeader>
				<MainCard backgroudColor="common">
					<Typography textAlign={"center"} color={useTheme().palette.success.main}>
						Receive 1,000 USDC in the Testnet environment. Each account may only use the faucet a
						maximum of 5 times.
					</Typography>

					<Typography textAlign={"center"} pt={1}>
						Please wait about 1 minute until you receive the 1,000 USDC testnet
					</Typography>
				</MainCard>
				<Box mt="10px" />

				<MainButton fullWidth variant="contained" onClick={() => setOpen(false)}>
					Close
				</MainButton>
			</MainDialog>
		</>
	);
});
