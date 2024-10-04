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
import { ButtonSwapToggle } from "./SwapIconToggle";
import { TransactionPopup } from "./token/TransactionSettingPopup";
import { TransationSubmittedCard } from "./TransationSubmittedCard";

export const SwapContainer = () => {
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
	const theme = useTheme();
	const [loading, setLoading] = useState(false);

	// State
	const isTransactionSubmitted = useStore(isTransactionSubmittedState, (state) => state.value);
	const [isShowCost, setIsShowCost] = useState(false);

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
	const {
		onSubmit,
		helper,
		maxQty: sellMaxQty,
	} = useOrderEntry(
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
		helper: buyHelper,
		maxQty: buyMaxPrice,
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
		const priceUSDC = amountOutput * outputMarkPrice + formattedPrice;

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

	const getValidationErrors = async () => {
		const data = {
			symbol: `PERP_${buyTokenActived?.token}_USDC`,
			order_quantity: outputAmount,
			order_type: OrderType.MARKET,
			side: OrderSide.BUY,
			order_price: undefined,
		};

		return buyHelper.validator(data);
	};

	const checkIsInfluBalance = async () => {
		const errors = await getValidationErrors();
		console.log(errors);
		return;
	};

	// console.log(checkIsInfluBalance());

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
							sellMaxQty={sellMaxQty}
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
								onClick={handleSubmitSwap}>
								Confirm Swap
							</MainButton>
						) : (
							<MainButton
								variant="contained"
								color="primary"
								size="large"
								onClick={handleEnterAmount}
								disabled={false}>
								{wallet ? "Enter a amount" : connecting ? "Connecting wallet" : "Connect wallet"}
							</MainButton>
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

									{/* <MainIconButton size="small" edge="end">
											<IconChevronDown size={'1rem'} />
										</MainIconButton> */}
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

					{/* <Collapse in={isShowCost}>
							<Cost slippageAmount={slippageAmount} priceImpact={priceImpact as any} />
						</Collapse> */}
				</>
			</MainCardNotch>

			<TransationSubmittedCard
				open={isTransactionSubmitted}
				onClose={() => {
					setIsSwapConfirm(false);
					setZustandValue(isTransactionSubmittedState, false);
				}}
			/>
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
