'use client';
import { ITokenType } from '@/common';
import { TokenListModal } from '@/plugins/swap/components/modal-token/TokenListModal';
import { TokenSelect } from '@/plugins/swap/components/token/TokenSelect';
import { tokenInputState, tokenOutputState } from '@/plugins/swap/store';
import { filterAllowedCharacters, usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, InputBase, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useMarkPrice } from '@orderly.network/hooks';
import { setZustandValue } from 'nes-zustand';
import { memo, useMemo, useState } from 'react';
import { useStore } from 'zustand';

export type ITypeSwap = 'input' | 'output';

interface IProps {
	handleChange: (value: string) => void;
	currentField: 'input' | 'output';
}

const TokenCurrencyInputField = ({ handleChange, currentField }: IProps) => {
	// HOOKS
	const theme = useTheme();

	// STATES
	const [isOpenToken, setIopenToken] = useState(false);
	const [valueAmount, setValueAmount] = useState('');

	// TOKEN
	const tokenInputActive = useStore(tokenInputState, (state) => state.value);
	const tokenOutputActive = useStore(tokenOutputState, (state) => state.value);

	const [keyToken, setKeyToken] = useState('');
	const { data: markPrice } = useMarkPrice(`PERP_${keyToken}_USDC`);

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

		const value = +valueAmount * markPrice;

		if (isNaN(value)) {
			return 0;
		}

		return +valueAmount * markPrice;
	}, [valueAmount, markPrice, tokenInputActive]);

	// Function to select a token
	const handleSelectToken = (token: ITokenType) => {
		let tokenKey = token.token;
		if (token.token === 'WBTC') {
			tokenKey = 'BTC';
		}

		token.token = tokenKey;
		setKeyToken(tokenKey);

		if (token.token === tokenOutputActive?.token) {
			setZustandValue(tokenOutputState, tokenInputActive);
		}

		setZustandValue(tokenInputState, token);
		setIopenToken(false);
	};

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

				<Stack direction={'row'} alignItems={'center'}>
					<InputBase placeholder="0.0" value={valueAmount} onChange={(e) => onChange(e.target.value)} />

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
