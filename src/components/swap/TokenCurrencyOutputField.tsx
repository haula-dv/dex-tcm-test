'use client';
import { ITokenType } from '@/common';
import { TokenListModal } from '@/plugins/swap/components/modal-token/TokenListModal';
import { TokenSelect } from '@/plugins/swap/components/token/TokenSelect';
import { tokenInputState, tokenOutputState } from '@/plugins/swap/store';
import { filterAllowedCharacters } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, InputBase, Skeleton, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useMarkPrice } from '@orderly.network/hooks';
import { setZustandValue } from 'nes-zustand';
import { Dispatch, useMemo, useState } from 'react';
import { useStore } from 'zustand';

export type ITypeSwap = 'input' | 'output';

interface IProps {
	currentField: 'input' | 'output';
	inputAmount: string;
	inputMarkPrice: number;
	setAmount: Dispatch<any>;
}

const TokenCurrencyOutputField = ({ currentField, setAmount, inputMarkPrice, inputAmount }: IProps) => {
	// HOOKS
	const theme = useTheme();
	const [isOpenToken, setIopenToken] = useState(false);
	const [loadingAmount, setLoadingAmount] = useState(false);

	// TOKEN
	const tokenInputActive = useStore(tokenInputState, (state) => state.value);
	const tokenOutputActive = useStore(tokenOutputState, (state) => state.value);

	const { data: outputMarkPrice } = useMarkPrice(`PERP_${tokenOutputActive?.token}_USDC`);

	const onChange = (value: string) => {
		const newValue = filterAllowedCharacters(value);
		setAmount(newValue);
	};

	// Handle show token list
	const handleToggle = () => {
		setIopenToken(!isOpenToken);
	};

	// Function to select a token
	const handleSelectToken = (token: ITokenType) => {
		setLoadingAmount(true);
		let tokenKey = token.token;

		if (token.token === 'WBTC') {
			tokenKey = 'BTC';
		}

		token.token = tokenKey;

		if (currentField == 'output') {
			if (token.token === tokenInputActive?.token) {
				setZustandValue(tokenInputState, tokenOutputActive);
			}

			setZustandValue(tokenOutputState, token);
		} else {
			if (token.token === tokenOutputActive?.token) {
				setZustandValue(tokenOutputState, tokenInputActive);
			}

			setZustandValue(tokenInputState, token);
		}

		setIopenToken(false);
		setTimeout(() => {
			setLoadingAmount(false);
		}, 1000);
	};

	// Caculate amount
	const calculateAmount = useMemo(() => {
		setLoadingAmount(true);

		// If no token is selected or the output mark price is invalid
		if (!tokenOutputActive || outputMarkPrice <= 0 || isNaN(inputMarkPrice)) {
			setLoadingAmount(false);
			return ''; // Early return if conditions are not met
		}

		// Parse the input amount
		const parsedInputAmount = parseFloat(inputAmount);

		// Ensure valid parsed input amount
		if (isNaN(parsedInputAmount)) {
			setLoadingAmount(false);
			return '';
		}

		// Perform the exchange rate calculation
		const exchangeRate = inputMarkPrice / outputMarkPrice;
		const result = parsedInputAmount * exchangeRate;

		// If the result is not valid
		if (isNaN(result)) {
			setLoadingAmount(false);
			return '';
		}

		// Set loading to false after calculation is done
		setLoadingAmount(false);

		return result.toFixed(6); // Return the formatted result
	}, [inputAmount, inputMarkPrice, outputMarkPrice, tokenOutputActive]);

	return (
		<>
			<Content>
				<Stack direction={'row'} justifyContent={'space-between'} pb="2px">
					<Typography
						color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}
						fontWeight={700}
						fontSize={'12px'}
					>
						{currentField == 'input' ? 'From' : 'To'}
					</Typography>
				</Stack>

				<Stack direction={'row'} alignItems={'center'} height={'40px'}>
					{loadingAmount ? (
						<Box flex={1}>
							<Skeleton height={'30px'} width={'100px'} animation="wave" variant="text" />
						</Box>
					) : (
						<InputBase
							placeholder="0.0"
							value={calculateAmount}
							// onChange={(e) => onChange(e.target.value)}
						/>
					)}

					<TokenSelect handleToggle={handleToggle} tokenSelected={tokenOutputActive} />
				</Stack>

				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} height={'18px'} pt="6px">
					<Typography fontSize={'12px'} color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}>
						{/* {currentPrice > 0 ? `$${usdFormatter.format(currentPrice)}` : ''} */}
					</Typography>

					<Typography fontSize={'12px'} color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}>
						{tokenOutputActive && `Balance: ${0}`}
					</Typography>
				</Stack>
			</Content>

			<TokenListModal
				open={isOpenToken}
				onClose={handleToggle}
				field={'output'}
				handleSelectToken={handleSelectToken}
			/>
		</>
	);
};

export default TokenCurrencyOutputField;

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
