'use client';
import { ITokenType } from '@/common';
import { TokenListModal } from '@/plugins/swap/components/modal-token/TokenListModal';
import { TokenSelect } from '@/plugins/swap/components/token/TokenSelect';
import { tokenInputState, tokenOutputState } from '@/plugins/swap/store';
import { filterAllowedCharacters, usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, InputBase, Skeleton, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useMarkPrice } from '@orderly.network/hooks';
import { setZustandValue } from 'nes-zustand';
import React, { Dispatch, memo, SetStateAction, useMemo, useState } from 'react';
import { useStore } from 'zustand';

export type ITypeSwap = 'input' | 'output';

interface IProps {
	handleChange: (value: string) => void;
	currentField: 'input' | 'output';
	loadingAmount: boolean;
	setLoadingAmount: Dispatch<SetStateAction<boolean>>;
}

const TokenCurrencyInputField = ({ handleChange, currentField, loadingAmount, setLoadingAmount }: IProps) => {
	// HOOKS
	const theme = useTheme();

	// STATES
	const [isOpenToken, setIopenToken] = useState(false);
	const [valueAmount, setValueAmount] = useState('');

	// TOKEN
	const tokenInputActive = useStore(tokenInputState, (state) => state.value);
	const tokenOutputActive = useStore(tokenOutputState, (state) => state.value);

	const { data: inputMarkPrice } = useMarkPrice(`PERP_${tokenInputActive?.token}_USDC`);
	const { data: outputMarkPrice } = useMarkPrice(`PERP_${tokenOutputActive?.token}_USDC`);

	const onChange = (value: string) => {
		if (currentField === 'output') {
			// TODO
			return;
		}

		const newValue = filterAllowedCharacters(value);
		setValueAmount(newValue);
		handleChange(newValue);
	};

	const handleToggle = () => {
		setIopenToken(!isOpenToken);
	};

	// Cacualtor balance of token
	const currentPrice = useMemo(() => {
		if (!tokenInputActive) {
			return 0;
		}

		const value = +valueAmount * inputMarkPrice;

		if (isNaN(value)) {
			return 0;
		}

		return value;
	}, [valueAmount, inputMarkPrice, tokenInputActive]);

	// Function to select a token
	const handleSelectToken = (token: ITokenType) => {
		setLoadingAmount(true);

		let tokenKey = token.token;
		if (token.token === 'WBTC') {
			tokenKey = 'BTC';
		}

		token.token = tokenKey;

		if (token.token === tokenOutputActive?.token) {
			setZustandValue(tokenOutputState, tokenInputActive);
		}

		setZustandValue(tokenInputState, token);
		setIopenToken(false);
	};

	// Caculate output amount (THIS FUNCTION JUST WORK WHEN OUTPUT STATE)
	const calculateOutputAmount = useMemo(() => {
		if (currentField === 'input') {
			return '';
		}

		// If no token is selected or the output mark price is invalid
		if (!tokenOutputActive || outputMarkPrice <= 0 || isNaN(inputMarkPrice)) {
			setLoadingAmount(false);
			return ''; // Early return if conditions are not met
		}

		// Parse the input amount
		const parsedInputAmount = parseFloat(valueAmount);

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
	}, [valueAmount, inputMarkPrice, outputMarkPrice, tokenOutputActive]);

	return (
		<>
			<Content>
				<Stack direction={'row'} justifyContent={'space-between'} pb="2px">
					<Typography
						color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}
						fontWeight={700}
						fontSize={'12px'}
					>
						From
					</Typography>

					<Typography fontWeight={700} fontSize={'12px'}>
						Use Max
					</Typography>
				</Stack>

				<Stack direction={'row'} alignItems={'center'} height={'40px'}>
					{currentField === 'output' ? (
						<React.Fragment>
							{loadingAmount ? (
								<Box flex={1}>
									<Skeleton height={'30px'} width={'100px'} animation="wave" variant="text" />
								</Box>
							) : (
								<InputBase placeholder="0.0" value={calculateOutputAmount} />
							)}
						</React.Fragment>
					) : (
						<InputBase placeholder="0.0" value={valueAmount} onChange={(e) => onChange(e.target.value)} />
					)}

					<TokenSelect handleToggle={handleToggle} tokenSelected={tokenInputActive} />
				</Stack>

				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} height={'18px'} pt="6px">
					<Typography fontSize={'12px'} color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}>
						{currentPrice > 0 ? `$${usdFormatter.format(currentPrice)}` : ''}
					</Typography>

					<Typography fontSize={'12px'} color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}>
						{tokenInputActive && `Balance: ${0}`}
					</Typography>
				</Stack>
			</Content>

			<TokenListModal open={isOpenToken} onClose={handleToggle} field={'input'} handleSelectToken={handleSelectToken} />
		</>
	);
};

export default memo(TokenCurrencyInputField);

export const Content = styled(Box)(({ theme }) => ({
	borderRadius: TSizes.borderRadius,
	backgroundColor: theme.palette.background.paper,
	padding: TSizes.margin_common,
	border: `1px solid ${theme.palette.background.paper}`,
	transition: '0.6s',

	'&:hover': {
		borderColor: setColorThemeMode(theme.palette.grey[100], theme.palette.grey[600]),
	},

	'&:focus-within': {
		borderColor: setColorThemeMode(theme.palette.grey[100], theme.palette.grey[600]),
	},

	'& .MuiInputBase-root': {
		width: '100%',
	},

	'& .MuiInputBase-input': {
		fontSize: '24px',
		fontWeight: 600,
		width: '100%',
		color: setColorThemeMode(theme.palette.grey[500], theme.palette.common.white),

		'&::-webkit-input-placeholder': {
			color: setColorThemeMode(theme.palette.grey[500], theme.palette.common.white),
			opacity: '1',
		},
	},
}));
