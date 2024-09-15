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
import { Dispatch, useMemo, useState } from 'react';
import { useStore } from 'zustand';

export type ITypeSwap = 'input' | 'output';

interface IProps {
	currentField: 'input' | 'output';
	amount: string;
	setAmount: Dispatch<any>;
}

const TokenCurrencyOutputField = ({ currentField, setAmount, amount }: IProps) => {
	// HOOKS
	const theme = useTheme();

	// STATES
	const [isOpenToken, setIopenToken] = useState(false);
	const [loadingAmount, setLoadingAmount] = useState(false);

	// TOKEN
	const tokenInputActive = useStore(tokenInputState, (state) => state.value);
	const tokenOutputActive = useStore(tokenOutputState, (state) => state.value);

	// Mark price
	const { data: inputMarkPrice } = useMarkPrice(`PERP_${tokenInputActive?.token ?? 'ETH'}_USDC`);
	const { data: outputMarkPrice } = useMarkPrice(
		tokenOutputActive != null ? `PERP_${tokenOutputActive?.token}_USDC` : '',
	);

	const onChange = (value: string) => {
		const newValue = filterAllowedCharacters(value);
		setAmount(newValue);
	};

	const handleToggle = () => {
		setIopenToken(!isOpenToken);
	};

	// Cacualtor balance of token
	const currentPrice = useMemo(() => {
		const value = +amount * inputMarkPrice;

		if (isNaN(value)) {
			return 0;
		}

		return +amount * inputMarkPrice;
	}, [amount, inputMarkPrice]);

	// Function to select a token
	const handleSelectToken = (token: ITokenType) => {
		if (currentField == 'output') {
			setLoadingAmount(true);
			if (token.token === tokenInputActive?.token) {
				setZustandValue(tokenInputState, tokenOutputActive);
			}

			setZustandValue(tokenOutputState, token);

			setTimeout(() => {
				setLoadingAmount(false);
			}, 400);
		} else {
			if (token.token === tokenOutputActive?.token) {
				setZustandValue(tokenOutputState, tokenInputActive);
			}

			setZustandValue(tokenInputState, token);
		}
		setIopenToken(false);
	};

	// Output amount
	const amountTemp = useMemo(() => {
		if (currentField == 'input') {
			return amount;
		}

		if (!tokenOutputActive) {
			return '';
		}

		const pareInputAmount = parseInt(amount);
		const token1ToUSD = inputMarkPrice; // Price Input
		const token2ToUSD = outputMarkPrice; // Price Output
		const exchangeRate = token1ToUSD / token2ToUSD;
		const result = pareInputAmount * exchangeRate;

		if (isNaN(result)) {
			return '';
		}

		return result.toFixed(6);
	}, [currentField, tokenOutputActive, amount, inputMarkPrice, outputMarkPrice]);

	// Token Active
	const tokenActiveCur = useMemo(() => {
		if (currentField == 'input') {
			return tokenInputActive;
		} else {
			return tokenOutputActive;
		}
	}, [currentField, tokenInputActive, tokenOutputActive]);

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
					{currentField == 'output' ? (
						loadingAmount ? (
							<Box width={'100%'}>
								<Skeleton
									height={'34px'}
									width={'100px'}
									sx={{ bgcolor: setColorThemeMode(theme.palette.grey[100], theme.palette.grey[600]) }}
									animation="wave"
								/>
							</Box>
						) : (
							<InputBase placeholder="0.0" value={amountTemp} onChange={(e) => onChange(e.target.value)} />
						)
					) : (
						<InputBase placeholder="0.0" value={amountTemp} onChange={(e) => onChange(e.target.value)} />
					)}

					<TokenSelect handleToggle={handleToggle} tokenSelected={tokenActiveCur} />
				</Stack>

				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} height={'18px'} pt="6px">
					<Typography fontSize={'12px'} color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}>
						{currentPrice > 0 ? `$${usdFormatter.format(currentPrice)}` : ''}
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
