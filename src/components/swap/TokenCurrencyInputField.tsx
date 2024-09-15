'use client';
import { ITokenType } from '@/common';
import { TokenListModal } from '@/plugins/swap/components/modal-token/TokenListModal';
import { TokenSelect } from '@/plugins/swap/components/token/TokenSelect';
import { tokenInputState, tokenOutputState } from '@/plugins/swap/store';
import { filterAllowedCharacters, usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { Box, InputBase, Skeleton, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMarkPrice } from '@orderly.network/hooks';
import { setZustandValue } from 'nes-zustand';
import React, { Dispatch, memo, SetStateAction, useMemo, useState } from 'react';
import { useStore } from 'zustand';
import { ContentCurrencyField } from './TokenCurrencyOutputField';

export type ITypeSwap = 'input' | 'output';

interface IProps {
	handleChange: (value: string) => void;
	inputAmount: string;
	outputAmount: string;

	currentField: 'input' | 'output';
	loadingAmount: boolean;
	setLoadingAmount: Dispatch<SetStateAction<boolean>>;
	handleChangeToken: (token: ITokenType, type: string) => void;
}

const TokenCurrencyInputField = ({
	inputAmount,
	outputAmount,

	handleChange,
	currentField,
	loadingAmount,
	setLoadingAmount,
	handleChangeToken,
}: IProps) => {
	// HOOKS
	const theme = useTheme();

	// STATES
	const [isOpenToken, setIopenToken] = useState(false);

	// TOKEN
	const sellTokenActive = useStore(tokenInputState, (state) => state.value); // UP
	const buyTokenActive = useStore(tokenOutputState, (state) => state.value); // DOWN

	const { data: inputMarkPrice } = useMarkPrice(`PERP_${sellTokenActive?.token}_USDC`);
	const { data: outputMarkPrice } = useMarkPrice(`PERP_${buyTokenActive?.token}_USDC`);

	const onChange = (value: string) => {
		const newValue = filterAllowedCharacters(value);
		handleChange(newValue);

		if (!sellTokenActive && !buyTokenActive) {
			return;
		}

		// UP, DOWN
		setZustandValue(tokenInputState, (prev: any) => {
			return {
				...prev,
				isInputting: true,
			};
		});

		setZustandValue(tokenOutputState, (prev: any) => {
			return {
				...prev,
				isInputting: false,
			};
		});
	};

	const handleToggle = () => {
		setIopenToken(!isOpenToken);
	};

	// Cacualtor balance of token
	const currentPrice = useMemo(() => {
		if (!sellTokenActive && !buyTokenActive) {
			return 0;
		}

		let price = inputMarkPrice;
		let amount = inputAmount;

		if (sellTokenActive?.isInputting) {
			price = inputMarkPrice;
			amount = inputAmount;
		} else {
			price = outputMarkPrice;
			amount = outputAmount;
		}

		const value = +amount * price;

		if (isNaN(value)) {
			return 0;
		}

		return value;
	}, [inputAmount, inputMarkPrice, outputAmount, sellTokenActive, outputMarkPrice, buyTokenActive]);

	// Function to select a token
	const handleSelectToken = (token: ITokenType) => {
		handleChangeToken(token, 'up');
		setIopenToken(false);
	};

	// Caculate output amount (THIS FUNCTION JUST WORK WHEN OUTPUT STATE)
	const calculateOutputAmount = useMemo(() => {
		// if it current inputting
		if (sellTokenActive?.isInputting) {
			return inputAmount;
		}

		// If no token is selected or the output mark price is invalid
		if (!buyTokenActive || outputMarkPrice <= 0 || isNaN(inputMarkPrice)) {
			setLoadingAmount(false);
			return ''; // Early return if conditions are not met
		}

		// Parse the input amount
		const parsedInputAmount = parseFloat(outputAmount);

		// Ensure valid parsed input amount
		if (isNaN(parsedInputAmount)) {
			setLoadingAmount(false);
			return '';
		}

		// Perform the exchange rate calculation
		const exchangeRate = outputMarkPrice / inputMarkPrice;
		const result = parsedInputAmount * exchangeRate;

		// If the result is not valid
		if (isNaN(result)) {
			setLoadingAmount(false);
			return '';
		}

		// Set loading to false after calculation is done
		setTimeout(() => {
			setLoadingAmount(false);
		}, 1200);

		return result.toFixed(6); // Return the formatted result
	}, [inputAmount, outputAmount, inputMarkPrice, outputMarkPrice, buyTokenActive]);

	return (
		<>
			<ContentCurrencyField spacing={'4px'} isActived={sellTokenActive?.isInputting}>
				<Stack direction={'row'} justifyContent={'space-between'} height={'18px'}>
					<Typography
						color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[300])}
						fontWeight={700}
						fontSize={'12px'}
					>
						Sell
					</Typography>

					<Typography fontWeight={700} fontSize={'12px'}>
						Use Max
					</Typography>
				</Stack>

				<Stack direction={'row'} alignItems={'center'} height={'40px'}>
					{!sellTokenActive?.isInputting ? (
						<React.Fragment>
							{loadingAmount ? (
								<Box flex={1}>
									<Skeleton height={'35px'} width={'200px'} animation="wave" variant="text" />
								</Box>
							) : (
								<InputBase placeholder="0.0" value={calculateOutputAmount} onChange={(e) => onChange(e.target.value)} />
							)}
						</React.Fragment>
					) : (
						<InputBase placeholder="0.0" value={calculateOutputAmount} onChange={(e) => onChange(e.target.value)} />
					)}

					<TokenSelect handleToggle={handleToggle} tokenSelected={sellTokenActive} />
				</Stack>

				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} height={'18px'}>
					{loadingAmount ? (
						<Skeleton height={'15px'} width={'60px'} animation="wave" variant="text" />
					) : (
						<Typography
							fontSize={'12px'}
							color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[300])}
							fontWeight={600}
						>
							{currentPrice > 0 ? `$${usdFormatter.format(currentPrice)}` : ''}
						</Typography>
					)}

					<Typography fontSize={'12px'} color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[300])}>
						{sellTokenActive && `Balance: ${0}`}
					</Typography>
				</Stack>
			</ContentCurrencyField>

			<TokenListModal open={isOpenToken} onClose={handleToggle} field={'input'} handleSelectToken={handleSelectToken} />
		</>
	);
};

export default memo(TokenCurrencyInputField);
