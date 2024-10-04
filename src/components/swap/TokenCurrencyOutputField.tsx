"use client";
import { ITokenType } from "@/common";
import { TokenListModal } from "@/plugins/swap/components/modal-token/TokenListModal";
import { TokenSelect } from "@/plugins/swap/components/token/TokenSelect";
import { tokenInputState, tokenOutputState } from "@/plugins/swap/store";
import { filterAllowedCharacters, usdFormatter } from "@/utils/formatters/number";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, InputBase, Skeleton, Stack, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useMarkPrice, useTickerStream } from "@orderly.network/hooks";
import { IconWallet } from "@tabler/icons-react";
import { setZustandValue } from "nes-zustand";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useStore } from "zustand";

export type ITypeSwap = "input" | "output";

interface IProps {
	currentField: "input" | "output";
	inputAmount: string;
	outputAmount: string;
	inputMarkPrice: number;
	handleChangeToken: (token: ITokenType, type: string) => void;
	loadingAmount: boolean;
	setLoadingAmount: Dispatch<SetStateAction<boolean>>;
	handleChangeInput: (value: string) => void;
	buyMaxPrice: number;
}

const TokenCurrencyOutputField = ({
	inputAmount,
	outputAmount,

	currentField,
	inputMarkPrice,
	handleChangeToken,

	loadingAmount,
	setLoadingAmount,

	handleChangeInput,
	buyMaxPrice,
}: IProps) => {
	// HOOKS
	const theme = useTheme();
	const [isOpenToken, setIopenToken] = useState(false);

	// TOKEN
	const sellTokenActive = useStore(tokenInputState, (state) => state.value);
	const buyTokenActive = useStore(tokenOutputState, (state) => state.value);

	// ORDERLY HOOKS
	const { data: outputMarkPrice } = useMarkPrice(`PERP_${buyTokenActive?.token}_USDC`);
	const stream = useTickerStream(`PERP_${sellTokenActive?.token}_USDC`);

	const onChange = (value: string) => {
		if (!buyTokenActive?.token && !sellTokenActive?.token) {
			return;
		}

		const newValue = filterAllowedCharacters(value);
		handleChangeInput(newValue);

		// UP, DOWN
		if (!sellTokenActive && !buyTokenActive) {
			return;
		}

		setZustandValue(tokenInputState, (prev: any) => {
			return {
				...prev,
				isInputting: false,
			};
		});

		setZustandValue(tokenOutputState, (prev: any) => {
			return {
				...prev,
				isInputting: true,
			};
		});
	};

	// Handle show token list
	const handleToggle = () => {
		setIopenToken(!isOpenToken);
	};

	// Function to select a token
	const handleSelectToken = (token: ITokenType) => {
		handleChangeToken(token, "down");
		setIopenToken(false);
	};

	let dailyChange: string | undefined;
	let dailyChangePercentage: string | undefined;
	if (stream && (stream as any)["24h_change"] != null && stream.index_price != null) {
		dailyChange = String((stream as any)["24h_change"].toNumber());
		dailyChangePercentage = (stream as any)["24h_change"]
			.div(stream.index_price)
			.mul(100)
			.toPrecision(4, 2);
	}

	// Caculate balance of token and price change
	const currentPrice = useMemo(() => {
		if (!sellTokenActive && !buyTokenActive) {
			return 0;
		}

		let price = inputMarkPrice;
		let amount = "";

		if (sellTokenActive?.isInputting) {
			price = inputMarkPrice;
			amount = inputAmount;
		} else {
			amount = outputAmount;
			price = outputMarkPrice;
		}

		// Tính toán giá trị hiện tại (current price)
		const currentValue = +amount * price;

		// Nếu giá trị không hợp lệ, trả về 0
		if (isNaN(currentValue)) {
			return 0;
		}

		// Tính toán số tiền thay đổi dựa trên dailyChangePercentage
		const dailyChangePercentageTemp = parseFloat(dailyChangePercentage || "0"); // Đảm bảo phần trăm thay đổi là số
		const priceChange = currentValue * (1 + dailyChangePercentageTemp / 100); // Tính số tiền thay đổi

		return priceChange;
	}, [
		sellTokenActive,
		buyTokenActive,
		inputMarkPrice,
		dailyChangePercentage,
		inputAmount,
		outputAmount,
		outputMarkPrice,
	]);

	// Caculate amount
	const calculateOutputAmount = useMemo(() => {
		if (buyTokenActive?.isInputting) {
			return outputAmount;
		}

		// If no token is selected or the output mark price is invalid
		if (!buyTokenActive || outputMarkPrice <= 0 || isNaN(inputMarkPrice)) {
			setLoadingAmount(false);
			return ""; // Early return if conditions are not met
		}

		// Parse the input amount
		const parsedInputAmount = parseFloat(inputAmount);

		// Ensure valid parsed input amount
		if (isNaN(parsedInputAmount)) {
			setLoadingAmount(false);
			return "";
		}

		// Perform the exchange rate calculation
		const exchangeRate = inputMarkPrice / outputMarkPrice;
		const result = parsedInputAmount * exchangeRate;

		// If the result is not valid
		if (isNaN(result)) {
			setLoadingAmount(false);
			return "";
		}

		// Set loading to false after calculation is done
		setTimeout(() => {
			setLoadingAmount(false);
		}, 1200);

		handleChangeInput(result.toFixed(6));

		return result.toFixed(6); // Return the formatted result
	}, [
		buyTokenActive,
		outputMarkPrice,
		inputMarkPrice,
		inputAmount,
		handleChangeInput,
		outputAmount,
		setLoadingAmount,
	]);

	return (
		<>
			<ContentCurrencyField spacing={"4px"} isActived={buyTokenActive?.isInputting}>
				<Stack direction={"row"} justifyContent={"space-between"} height={"18px"}>
					<Typography
						color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[300])}
						fontWeight={700}
						fontSize={"12px"}>
						Buy
					</Typography>
				</Stack>

				<Stack direction={"row"} alignItems={"center"} height={"40px"}>
					{sellTokenActive?.isInputting ? (
						<React.Fragment>
							{loadingAmount ? (
								<Box flex={1}>
									<Skeleton height={"35px"} width={"100px"} animation="wave" variant="text" />
								</Box>
							) : (
								<InputBase
									placeholder="0.0"
									value={calculateOutputAmount}
									onChange={(e) => onChange(e.target.value)}
								/>
							)}
						</React.Fragment>
					) : (
						<InputBase
							placeholder="0.0"
							value={calculateOutputAmount}
							onChange={(e) => onChange(e.target.value)}
						/>
					)}

					<TokenSelect
						handleToggle={handleToggle}
						tokenSelected={buyTokenActive?.token ? buyTokenActive : null}
					/>
				</Stack>

				<Stack
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}
					height={"18px"}>
					{loadingAmount ? (
						<Skeleton height={"15px"} width={"60px"} animation="wave" variant="text" />
					) : buyTokenActive?.token && currentPrice > 0 ? (
						<Stack direction={"row"} alignItems={"center"} spacing={"4px"}>
							<Typography
								fontSize={"13px"}
								color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[300])}>
								${usdFormatter.format(currentPrice)}
							</Typography>

							{dailyChange && dailyChangePercentage ? (
								<Typography
									fontSize={"13px"}
									color={
										!dailyChange.startsWith("-")
											? theme.palette.success.main
											: theme.palette.error.main
									}>
									({parseFloat(dailyChangePercentage || "0").toFixed(2)}%)
								</Typography>
							) : (
								<Typography
									fontSize={"12px"}
									color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[300])}>
									(0%)
								</Typography>
							)}
						</Stack>
					) : (
						<Typography
							fontSize={"13px"}
							color={setColorThemeMode(
								theme.palette.grey[600],
								theme.palette.grey[300],
							)}>{`$ 0.00`}</Typography>
					)}

					<Stack direction={"row"} spacing={"6px"} alignItems={"center"}>
						<Typography
							fontSize={"14px"}
							color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[300])}>
							{buyTokenActive ? usdFormatter.format(buyMaxPrice) : "0"}
						</Typography>

						<IconWallet
							size={"1.2rem"}
							color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[300])}
						/>
					</Stack>
				</Stack>
			</ContentCurrencyField>

			<TokenListModal
				open={isOpenToken}
				onClose={handleToggle}
				field={"output"}
				handleSelectToken={handleSelectToken}
			/>
		</>
	);
};

export default TokenCurrencyOutputField;

interface IInput {
	isActived?: boolean;
}

export const ContentCurrencyField = styled(Stack, {
	shouldForwardProp: (prop) => prop != "isActived",
})<IInput>(({ theme, isActived }) => ({
	borderRadius: "18px",
	backgroundColor: theme.palette.background.paper,
	padding: TSizes.margin_common,
	border: `1px solid ${
		isActived
			? setColorThemeMode(theme.palette.grey[100], theme.palette.grey[500])
			: theme.palette.background.paper
	}`,
	transition: "0.6s",

	"&:hover": {
		borderColor: setColorThemeMode(theme.palette.grey[100], theme.palette.grey[600]),
	},

	"&:focus-within": {
		borderColor: setColorThemeMode(theme.palette.grey[100], theme.palette.grey[400]),
	},

	"& .MuiInputBase-root": {
		width: "100%",
	},

	"& .MuiInputBase-input": {
		fontSize: "28px",
		fontWeight: 600,
		width: "100%",
		color: setColorThemeMode(theme.palette.grey[500], theme.palette.common.white),

		"&::-webkit-input-placeholder": {
			color: setColorThemeMode(theme.palette.grey[500], theme.palette.common.white),
			// opacity: "1",
		},
	},
}));
