/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { MainButton } from '@/components/button/MainButton';
import { MainIconButton } from '@/components/button/MainIconButton';
import { MainCard } from '@/components/card/MainCard';
import CurrencyField from '@/components/swap/CurrencyField';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useMarkPrice } from '@orderly.network/hooks';
import { IconHelp, IconTransform } from '@tabler/icons-react';
import { useConnectWallet } from '@web3-onboard/react';
import { setZustandValue } from 'nes-zustand';
import { useCallback, useState } from 'react';
import { useStore } from 'zustand';
import { toggleSwapType } from '../handlers';
import { isTransactionSubmittedState, tokenInputState, tokenOutputState } from '../store';
import { ConfirmSwapContent } from './ConfirmSwap';
import Cost from './Cost';
import { ButtonSwapToggle } from './SwapIconToggle';
import { TransactionPopup } from './token/TransactionSettingPopup';
import { TransationSubmittedCard } from './TransationSubmittedCard';

export const SwapContainer = () => {
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

	// State
	const isTransactionSubmitted = useStore(isTransactionSubmittedState, (state) => state.value);

	// TOKEN
	const tokenInput = useStore(tokenInputState, (state) => state.value);
	const tokenOutput = useStore(tokenOutputState, (state) => state.value);
	// This price of token
	const { data: markPriceOutput } = useMarkPrice(`PERP_${tokenOutput?.token ?? 'ETH'}_USDC`);

	// Mark price
	const [inputMarkPrice, setInputMarkPrice] = useState(0);
	const [outMarkPrice, setOutputMarkPrice] = useState(0);
	const [inputAmount, setInputAmount] = useState<any>('');
	const [outputAmount, setOutputAmount] = useState<any>('');

	const [isEnterAmount, setIsEnterAmount] = useState(false);
	const [isSwaped, setIsSwaped] = useState(false);

	const [slippageAmount, setSlippageAmount] = useState('0.1');
	const [deadlineMinutes, setDeadlineMinutes] = useState(10);

	// Handle Enter amount
	const handleEnterAmount = async () => {
		if (!wallet) {
			await connect();
			return;
		}

		setIsEnterAmount(true);

		if (isEnterAmount) {
			setIsSwaped(true);
		}
	};

	// Handle get swap price
	const handleInputChange = useCallback(
		(inputAmount: number) => {
			setInputAmount(inputAmount);

			if (!tokenOutput) {
				return '';
			}

			const token1ToUSD = inputMarkPrice; // Price Input
			const token2ToUSD = markPriceOutput; // Price Output

			const exchangeRate = token1ToUSD / token2ToUSD;
			const result = inputAmount * exchangeRate;

			if (result <= 0) {
				return '';
			}

			setOutputAmount(result.toFixed(6));
		},
		[markPriceOutput, tokenOutput, inputMarkPrice],
	);

	// This handle toggle side
	const handleToggleSide = () => {
		setInputAmount(outputAmount);
		setOutputAmount(inputAmount);
		setZustandValue(tokenInputState, tokenOutput);
		setZustandValue(tokenOutputState, tokenInput);
	};

	return (
		<Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'calc(100vh - 56px)'}>
			<MainCard
				backgroudColor="primary"
				borderRadius="0px"
				isNotch
				padding={`${TSizes.margin_sm}`}
				maxWidth={TSizes.widthCommonCard}
			>
				<TransactionPopup slippageAmount={slippageAmount} />

				{!isSwaped ? (
					<>
						<Stack spacing={1.5}>
							<CurrencyField
								valueAmount={inputAmount}
								currentToken={tokenInput}
								field="input"
								onChange={handleInputChange}
								getMarkPrice={(value) => setInputMarkPrice(value)}
							/>

							<ButtonSwapToggle toggleSwapType={handleToggleSide} />

							<CurrencyField
								valueAmount={outputAmount}
								currentToken={tokenOutput}
								field="output"
								getMarkPrice={(value) => setOutputMarkPrice(value)}
							/>

							<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
								<Typography color={setColorThemeMode(useTheme().palette.text.primary, useTheme().palette.grey[50])}>
									Slippage Tolerance
								</Typography>

								<Stack direction={'row'} alignItems={'center'} spacing={1}>
									<Typography color={setColorThemeMode(useTheme().palette.text.primary, useTheme().palette.grey[50])}>
										0978787667 ETH Per
									</Typography>

									<MainIconButton size="small" edge="end">
										<IconTransform size={'1.2rem'} color={useTheme().palette.text.primary} />
									</MainIconButton>
								</Stack>
							</Stack>

							<MainButton
								variant="contained"
								color="primary"
								size="large"
								onClick={handleEnterAmount}
								disabled={connecting}
							>
								{wallet ? 'Swap' : connecting ? 'Connecting wallet' : 'Connect wallet'}
							</MainButton>
						</Stack>

						{tokenInput && tokenOutput && <Cost />}
					</>
				) : (
					<ConfirmSwapContent
						toggleSwapType={toggleSwapType}
						tokenSellSelected={tokenInput}
						tokenBuySelected={tokenOutput}
					/>
				)}
			</MainCard>

			<TransationSubmittedCard
				open={isTransactionSubmitted}
				onClose={() => {
					setIsSwaped(false);
					setIsEnterAmount(false);
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
		<Stack direction={'row'} justifyContent={'space-between'}>
			<Stack direction={'row'} spacing={0.5} alignItems={'center'}>
				<Typography color={setColorThemeMode(useTheme().palette.grey[900], useTheme().palette.common.white)}>
					{title}
				</Typography>

				<IconHelp size={'1.2rem'} color={useTheme().palette.text.primary} />
			</Stack>
			<Typography>{value}</Typography>
		</Stack>
	);
};
