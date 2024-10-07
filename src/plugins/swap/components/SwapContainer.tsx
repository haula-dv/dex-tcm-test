/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { ITokenType } from "@/common";
import { MainButton } from "@/components/button/MainButton";
import { MainCardNotch } from "@/components/card/MainCardNotch";
import TokenCurrencyInputField from "@/components/swap/TokenCurrencyInputField";
import TokenCurrencyOutputField from "@/components/swap/TokenCurrencyOutputField";
import { getDecimalsFromTick } from "@/utils/formatters/api";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Divider, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { useMarkPrice, useOrderEntry, useSymbolsInfo } from "@orderly.network/hooks";
import { OrderSide, OrderType } from "@orderly.network/types";
import { IconHelp } from "@tabler/icons-react";
import { useConnectWallet, useNotifications } from "@web3-onboard/react";
import { setZustandValue } from "nes-zustand";
import { useCallback, useMemo, useState } from "react";
import { useStore } from "zustand";
import { isTransactionSubmittedState, tokenInputState, tokenOutputState } from "../store";
import { ModalConfirmSwap } from "./modal-token/ModalConfirmSwap";
import { ButtonSwapToggle } from "./SwapIconToggle";
import { TransactionPopup } from "./token/TransactionSettingPopup";
import { TransationSubmittedCard } from "./TransationSubmittedCard";

export const SwapContainer = () => {
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
	const theme = useTheme();
	const [loading, setLoading] = useState(false);

	// State
	const isTransactionSubmitted = useStore(isTransactionSubmittedState, (state) => state.value);
	const [openModalConfirmSwap, setOpenModalConfirmSwap] = useState(false);

	// TOKEN
	const sellTokenActived = useStore(tokenInputState, (state) => state.value); // UP
	const buyTokenActived = useStore(tokenOutputState, (state) => state.value); // DOWN

	const [inputAmount, setInputAmount] = useState<any>("");
	const [outputAmount, setOutputAmount] = useState<any>("");

	const [isInput, setInput] = useState(true);
	const [loadingAmount, setLoadingAmount] = useState(false);
	const [loadingDes, setLoadingDes] = useState(false);

	const [isSwapConfirm, setIsSwapConfirm] = useState(false);

	const [slippageAmount, setSlippageAmount] = useState("0.1");
	const [deadlineMinutes, setDeadlineMinutes] = useState("10");

	// Mark price
	const { data: inputMarkPrice } = useMarkPrice(`PERP_${sellTokenActived?.token}_USDC`); // Sell Ex ETH
	const { data: outputMarkPrice } = useMarkPrice(`PERP_${buyTokenActived?.token}_USDC`); // Buy
	const [_0, customNotification] = useNotifications();

	// This handle toggle side
	const handleToggleSide = () => {
		setLoadingAmount(true);
		setLoadingDes(true);

		setInput(!isInput);

		setZustandValue(tokenInputState, buyTokenActived); // Sell
		setZustandValue(tokenOutputState, sellTokenActived); // Buy

		setInputAmount(outputAmount);
		setOutputAmount(inputAmount);

		setTimeout(() => {
			setLoadingAmount(false);
			setLoadingDes(false);
		}, 1200);
	};

	// Handle change token
	const handleChangeToken = (token: ITokenType, type: string) => {
		setLoadingAmount(true);
		setLoadingDes(true);
		let tokenKey = token.token;

		if (token.token === "WBTC") {
			tokenKey = "BTC";
		}

		token.token = tokenKey;

		if (type === "down") {
			setZustandValue(tokenOutputState, (prev: any) => {
				return {
					...token,
					isInputting: prev?.isInputting,
				};
			});
		} else {
			setZustandValue(tokenInputState, (prev: any) => {
				return {
					...token,
					isInputting: prev?.isInputting,
				};
			});
		}

		setTimeout(() => {
			setLoadingDes(false);
		}, 1200);
	};

	const handleSellInputChange = useCallback((value: string) => {
		setInputAmount(value);
	}, []);

	const handleBuyInputChange = useCallback((value: string) => {
		setOutputAmount(value);
	}, []);

	// SELL ETH => USDC
	const { onSubmit, maxQty: sellMaxPrice } = useOrderEntry(
		{
			symbol: `PERP_${sellTokenActived?.token}_USDC`,
			order_type: OrderType.LIMIT,
			side: OrderSide.SELL,
			order_quantity: undefined,
			order_price: undefined,
		},
		{ watchOrderbook: true },
	);

	// BUY BTC => USDC
	const {
		onSubmit: buyTokenSubmit,
		maxQty: buyMaxPrice,
		submitting,
	} = useOrderEntry(
		{
			symbol: `PERP_${buyTokenActived?.token}_USDC`,
			order_type: OrderType.LIMIT,
			side: OrderSide.BUY,
			order_quantity: undefined,
			order_price: undefined,
		},
		{ watchOrderbook: true },
	);

	const symbolsInfo = useSymbolsInfo();
	const symbolInfo = symbolsInfo[`PERP_${buyTokenActived?.token}_USDC`]();
	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

	const handleSubmitSwap = async () => {
		setLoading(true);
		const slippageTolerance = +slippageAmount;
		const minAcceptablePrice = inputMarkPrice * (1 - slippageTolerance);

		const { update } = customNotification({
			eventCode: "createOrder",
			type: "pending",
			message: "Creating order...",
		});

		// SELL
		const amountQty = parseFloat(inputAmount);
		const calculatedPrice = amountQty * inputMarkPrice;
		const formattedPrice = parseFloat(calculatedPrice.toFixed(quoteDecimals));

		const sellData = {
			symbol: `PERP_${sellTokenActived?.token}_USDC`,
			side: OrderSide.SELL,
			order_type: OrderType.MARKET,
			order_quantity: inputAmount,
			reduce_only: false,
		};

		// BUY
		const amountOutput = parseFloat(outputAmount);

		const buyData = {
			symbol: `PERP_${buyTokenActived?.token}_USDC`, // Cặp token đang mua (BTC -> USDC)
			side: OrderSide.BUY, // Mua BTC
			order_type: OrderType.MARKET, // Lệnh thị trường
			order_quantity: Number(outputAmount).toFixed(baseDecimals), // EX: 0.2678 Số lượng USDC để mua BTC (cần tính toán sau khi bán ETH)
		};

		try {
			await onSubmit(sellData);
			await buyTokenSubmit(buyData);

			update({
				eventCode: "createOrderSuccess",
				type: "success",
				message: "Order successfully created!",
				autoDismiss: 5_000,
			});
			setZustandValue(isTransactionSubmittedState, true);
			setOpenModalConfirmSwap(false);
		} catch (error) {
			console.error(`Unhandled error in "submitForm":`, error);
			update({
				eventCode: "createOrderError",
				type: "error",
				message: `Order creation failed! ${error}`,
				autoDismiss: 5_000,
			});
		} finally {
			setLoading(false);
		}
	};

	// Handle confirm swap
	const handleToggleConfirmSwap = () => {
		if (checkIsInfluBalance()) {
			checkIsInfluBalance();
			return;
		}

		setOpenModalConfirmSwap(true);
	};

	// Handle Enter amount
	const handleEnterAmount = async () => {
		if (!wallet) {
			await connect();
			location.reload();
			return;
		}

		if (inputAmount && outputAmount) {
			setIsSwapConfirm(true);
			return;
		}
	};

	const baseExchangeRate = useMemo(() => {
		const baseValue = 1;

		let rate = outputMarkPrice / inputMarkPrice;
		const result = baseValue * rate;

		return result.toFixed(6);
	}, [inputMarkPrice, outputMarkPrice]);

	// CHECK BALANE
	const checkIsInfluBalance = useCallback(() => {
		if (!outputAmount && !inputAmount) {
			return true;
		}

		if (outputAmount > buyMaxPrice) {
			return true;
		}

		if (inputAmount > sellMaxPrice) {
			return true;
		}

		return false;
	}, [buyMaxPrice, outputAmount, inputAmount, sellMaxPrice]);

	return (
		<Box
			display={"flex"}
			alignItems={"center"}
			justifyContent={"center"}
			height={"calc(100vh - 56px)"}
			px="16px">
			<MainCardNotch
				backgroudColor="primary"
				borderRadius="0px"
				padding={`${TSizes.margin_sm}`}
				maxWidth={TSizes.widthCommonCard}>
				<Stack direction={"row"} alignItems={"center"} pb={"10px"}>
					<Typography flex={1} fontSize={"22px"}>
						Swap
					</Typography>

					<TransactionPopup
						getSlippageAmount={(value) => setSlippageAmount(value)}
						getDeadlineMinutes={(value) => setDeadlineMinutes(value)}
					/>
				</Stack>

				<>
					<Stack spacing={1.5}>
						<TokenCurrencyInputField
							inputAmount={inputAmount}
							outputAmount={outputAmount}
							handleChange={handleSellInputChange}
							currentField={isInput ? "input" : "output"}
							loadingAmount={loadingAmount}
							setLoadingAmount={setLoadingAmount}
							handleChangeToken={handleChangeToken}
							sellMaxQty={sellMaxPrice}
						/>

						<ButtonSwapToggle toggleSwapType={handleToggleSide} />

						<TokenCurrencyOutputField
							currentField={isInput ? "output" : "input"}
							inputMarkPrice={inputMarkPrice}
							inputAmount={inputAmount}
							outputAmount={outputAmount}
							handleChangeInput={handleBuyInputChange}
							loadingAmount={loadingAmount}
							setLoadingAmount={setLoadingAmount}
							handleChangeToken={handleChangeToken}
							buyMaxPrice={buyMaxPrice}
						/>

						{isSwapConfirm ? (
							<MainButton
								variant="contained"
								color="primary"
								size="large"
								onClick={handleToggleConfirmSwap}>
								Confirm Swap
							</MainButton>
						) : (
							<>
								{buyTokenActived && inputAmount && outputAmount ? (
									<MainButton
										variant="contained"
										color="primary"
										size="large"
										onClick={() => setOpenModalConfirmSwap(true)}
										disabled={checkIsInfluBalance()}>
										{checkIsInfluBalance() ? "INSUFFICIENT BALANCE" : "Swap"}
									</MainButton>
								) : (
									<MainButton
										variant="contained"
										color="primary"
										size="large"
										onClick={handleEnterAmount}
										disabled={wallet ? true : false}>
										{wallet
											? "ENTER A AMOUNT"
											: connecting
											? "Connecting wallet"
											: "Connect wallet"}
									</MainButton>
								)}
							</>
						)}
					</Stack>

					<Stack
						direction={"row"}
						justifyContent={"space-between"}
						alignItems={"center"}
						pt={"4px"}>
						{loadingDes ? (
							<Skeleton height={"24px"} width={"100px"} variant="text" />
						) : (
							sellTokenActived?.token &&
							buyTokenActived?.token && (
								<>
									<Typography>
										1 {buyTokenActived.token} = {baseExchangeRate} {sellTokenActived?.token}
										<span style={{ paddingLeft: "4px", color: theme.palette.grey[300] }}>
											(${outputMarkPrice.toLocaleString()})
										</span>
									</Typography>
								</>
							)
						)}
					</Stack>

					{isSwapConfirm && (
						<>
							<Divider sx={{ my: "10px" }} />

							<Typography>
								Output is estimated. You will receive at least {outputAmount}{" "}
								{buyTokenActived?.token} or the transaction will revert
							</Typography>
						</>
					)}
				</>
			</MainCardNotch>

			<TransationSubmittedCard
				open={isTransactionSubmitted}
				onClose={() => {
					setIsSwapConfirm(false);
					setZustandValue(isTransactionSubmittedState, false);
				}}
			/>

			{buyTokenActived && sellTokenActived && (
				<ModalConfirmSwap
					open={openModalConfirmSwap}
					onClose={() => setOpenModalConfirmSwap(false)}
					buyTokenActived={buyTokenActived}
					sellTokenActived={sellTokenActived}
					outputAmount={outputAmount}
					inputAmount={inputAmount}
					sellMaxPrice={sellMaxPrice}
					buyMaxPrice={buyMaxPrice}
					onSubmit={handleSubmitSwap}
				/>
			)}
		</Box>
	);
};

interface IProps {
	title: string;
	value: any;
}

export const Item = ({ title, value }: IProps) => {
	return (
		<Stack direction={"row"} justifyContent={"space-between"}>
			<Stack direction={"row"} spacing={0.5} alignItems={"center"}>
				<Typography
					color={setColorThemeMode(useTheme().palette.grey[900], useTheme().palette.common.white)}>
					{title}
				</Typography>

				<IconHelp size={"1.2rem"} color={useTheme().palette.text.primary} />
			</Stack>
			<Typography>{value}</Typography>
		</Stack>
	);
};
