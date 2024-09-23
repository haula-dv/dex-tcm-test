'use client';
import { ITokenType } from '@/common';
import { TokenSelect } from '@/plugins/swap/components/token/TokenSelect';
import { tokenInputState, tokenOutputState } from '@/plugins/swap/store';
import { filterAllowedCharacters, usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, InputBase, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useMarkPrice } from '@orderly.network/hooks';
import { setZustandValue } from 'nes-zustand';
import { FocusEvent, memo, useCallback, useMemo, useState } from 'react';
import { useStore } from 'zustand';
import { TokenListModal } from '../../plugins/swap/components/modal-token/TokenListModal';

export type ITypeSwap = 'input' | 'output';

interface IProps {
	currentToken: ITokenType | null;
	field: ITypeSwap;
	onChange?: (value: number) => void;
	valueAmount: string;
}

const CurrencyField = ({ currentToken, onChange, field, valueAmount }: IProps) => {
	const [openTokenList, setOpenTokenList] = useState(false);
	const theme = useTheme();

	// State
	const [selectToken, setSelectToken] = useState(null);

	// TOKEN
	const tokenInput = useStore(tokenInputState, (state) => state.value);
	const tokenOutput = useStore(tokenOutputState, (state) => state.value);

	// This price of token
	const { data: markPrice } = useMarkPrice(`PERP_${currentToken?.token ?? 'ETH'}_USDC`);

	// Handle get price
	const getPrice = useCallback(
		(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
			const value = e.target.value;
			const newValue = filterAllowedCharacters(String(value));
			onChange && onChange(+newValue);
		},
		[onChange],
	);

	// Cacualtor balance of token
	const currentPrice = useMemo(() => {
		if (!currentToken) {
			return 0;
		}

		const value = +valueAmount * markPrice;

		if (isNaN(value)) {
			return 0;
		}

		return +valueAmount * markPrice;
	}, [valueAmount, markPrice, currentToken]);

	// Function to select a token
	const handleSelectToken = useCallback(
		(token: ITokenType) => {
			if (field == 'input') {
				if (token.token === tokenOutput?.token) {
					setZustandValue(tokenOutputState, tokenInput);
				}

				setZustandValue(tokenInputState, token);
			} else {
				if (token.token === tokenInput?.token) {
					setZustandValue(tokenInputState, tokenOutput);
				}

				setZustandValue(tokenOutputState, token);
			}

			handleToggleModalTokenList();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[field, tokenInput?.token, tokenOutput?.token],
	);

	// Modal show modal token
	const handleToggleModalTokenList = () => {
		setOpenTokenList(!openTokenList);
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
						{field === 'input' ? 'From' : 'To'}
					</Typography>

					{field == 'input' && (
						<Typography fontWeight={700} fontSize={'12px'}>
							Use Max
						</Typography>
					)}
				</Stack>

				<Stack direction={'row'} alignItems={'center'}>
					<InputBase placeholder="0.0" value={valueAmount} onChange={getPrice} />

					<TokenSelect handleToggle={handleToggleModalTokenList} tokenSelected={currentToken} />
				</Stack>

				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} height={'18px'} pt="6px">
					<Typography fontSize={'12px'} color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}>
						{currentPrice > 0 ? `$${usdFormatter.format(currentPrice)}` : ''}
					</Typography>

					<Typography fontSize={'12px'} color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}>
						{currentToken && `Balance: ${0}`}
					</Typography>
				</Stack>
			</Content>

			<TokenListModal
				open={openTokenList}
				onClose={handleToggleModalTokenList}
				field={field}
				handleSelectToken={handleSelectToken}
			/>
		</>
	);
};

export default memo(CurrencyField);

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
