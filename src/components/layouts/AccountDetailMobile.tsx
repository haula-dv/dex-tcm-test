import { themeSelectorState } from "@/common/stores/common";
import { MainIconButton } from "@/components/button/MainIconButton";
import { ItemRow } from "@/plugins/pool/components/TokenSelected";
import { AccountAvatar } from "@/plugins/wallet/components/AccountAvatar";
import { TLocalStorage } from "@/utils/constants/key_store";
import { usdFormatter } from "@/utils/formatters/number";
import { idFromHexChainId } from "@/utils/formatters/token";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Drawer, Stack, Typography, useTheme } from "@mui/material";
import {
	useAccountInstance,
	useChains,
	useCollateral,
	useDeposit,
	useWithdraw,
} from "@orderly.network/hooks";
import { toast } from "@orderly.network/react";
import { IconCopy, IconLogout, IconMoonStars, IconSun } from "@tabler/icons-react";
import { useConnectWallet, useNotifications, useSetChain } from "@web3-onboard/react";
import { setZustandValue } from "nes-zustand";
import { memo, useMemo, useState } from "react";
import { useStore } from "zustand";
import { MainButton } from "../button/MainButton";
import MainCard from "../card/MainCard";
import { DepositWithdrawDialog } from "../deposit/DepositWithdrawDialog";

const AccountDetailMobile = ({ handleClose, open }: any) => {
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
	const theme = useTheme();
	const themeSelector = useStore(themeSelectorState, (state) => state.value);

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

	const [_, { findByChainId }] = useChains();
	const [{ connectedChain }, setChain] = useSetChain();
	const [{}, customNotification] = useNotifications();
	const account = useAccountInstance();
	const collateral = useCollateral();
	const [loadingSettle, setLoadingSettle] = useState(false);
	const [isOpenDeposit, setIsOpenDesposit] = useState(false);

	// GET CURRENT CHAIN
	const currentChain = useMemo(() => {
		return findByChainId(connectedChain ? idFromHexChainId(connectedChain?.id ?? "") : 1);
	}, [connectedChain, findByChainId]);

	const token = useMemo(() => {
		return currentChain?.token_infos[0] ?? undefined;
	}, [currentChain]);

	const deposit = useDeposit({
		address: token?.address,
		decimals: token?.decimals,
		srcToken: token?.symbol,
		srcChainId: Number(connectedChain?.id),
	});

	const { unsettledPnL, availableWithdraw } = useWithdraw();

	// Handle disconnect wallet button
	const handleDisconnect = async () => {
		if (wallet) {
			await disconnect(wallet);
			location.reload();
		}
	};

	const handleCopy = () => {
		if (!wallet) return;

		navigator.clipboard
			.writeText(wallet.accounts[0].address)
			.then(() => {
				toast.success("Address copied!");
			})
			.catch((err) => {
				console.error("Failed to copy text: ", err);
			});
	};

	const handleSettle = async () => {
		setLoadingSettle(true);
		const { update } = customNotification({
			eventCode: "settle",
			type: "pending",
			message: "Settling PnL...",
		});

		try {
			await account.settle();
			update({
				eventCode: "settleSuccess",
				type: "success",
				message: "Successfully settled PnL!",
				autoDismiss: 5_000,
			});
		} catch (err) {
			console.error(err);

			update({
				eventCode: "settleError",
				type: "error",
				message: (err as any).message ?? "Something went wrong",
				autoDismiss: 15_000,
			});
		} finally {
			setLoadingSettle(false);
		}
	};

	const handleToggleDesposit = () => {
		setIsOpenDesposit(!isOpenDeposit);
	};

	return (
		<>
			<Drawer open={open} onClose={handleClose} anchor="bottom">
				<MainCard height="calc(100vh - 100px)" backgroudColor="primary">
					<Box
						height={"10px"}
						width={"36px"}
						borderRadius={"24px"}
						bgcolor={theme.palette.primary.light}
						mx="auto"
						mb={"10px"}
						onClick={handleClose}></Box>

					<MainCard
						variant="outlined"
						width="100%"
						backgroudColor="transparent"
						isActionSlot={
							<Stack direction={"row"} spacing={TSizes.margin_common}>
								<MainButton
									fullWidth
									onClick={handleSettle}
									disabled={loadingSettle}
									isLoading={loadingSettle}>
									Settle PnL
								</MainButton>

								<MainButton fullWidth variant="contained" onClick={handleToggleDesposit}>
									Deposit / Withdraw
								</MainButton>
							</Stack>
						}>
						<Stack
							direction={"row"}
							alignItems={"center"}
							justifyContent={"space-between"}
							bgcolor={setColorThemeMode(
								useTheme().palette.grey[200],
								useTheme().palette.grey[700],
							)}
							borderRadius={TSizes.borderRadius}
							py={"4px"}
							pl={TSizes.margin_common}>
							<AccountAvatar
								fontSize="18px"
								avatarSize={26}
								textColor={setColorThemeMode(
									useTheme().palette.common.black,
									useTheme().palette.common.white,
								)}
							/>

							<MainIconButton size="small" onClick={handleCopy}>
								<IconCopy size={"1rem"} />
							</MainIconButton>
						</Stack>

						<Stack spacing={TSizes.margin_common} pt={TSizes.margin_common}>
							<ItemRow
								title="Wallet Balance:"
								value={`${usdFormatter.format(Number(deposit.balance))} $`}
							/>
							<ItemRow
								title="Orderly Balance:"
								value={`${usdFormatter.format(collateral.availableBalance)} $`}
							/>
							<ItemRow title="Unsettled PnL:" value={`${usdFormatter.format(unsettledPnL)} $`} />
							<ItemRow
								title="Withdrawable Balance"
								value={`${usdFormatter.format(availableWithdraw)} $`}
							/>
						</Stack>
					</MainCard>

					<Box mt={TSizes.margin_common} />

					<MainButton
						variant="contained"
						color="darkGrey"
						fullWidth
						startIcon={<IconLogout size={"1.2rem"} />}
						onClick={handleDisconnect}>
						Disconnect
					</MainButton>

					<DepositWithdrawDialog open={isOpenDeposit} onClose={handleToggleDesposit} />

					<Box position={"absolute"} bottom={0} right={0} p="10px">
						<Stack direction={"row"} spacing={1} alignItems={"center"}>
							<Typography>Theme</Typography>
							<MainIconButton onClick={handleChangeTheme} color="inherit">
								{themeSelector.activeMode == "light" ? <IconSun /> : <IconMoonStars />}
							</MainIconButton>
						</Stack>
					</Box>
				</MainCard>
			</Drawer>
		</>
	);
};

export default memo(AccountDetailMobile);
