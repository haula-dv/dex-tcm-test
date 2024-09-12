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
import axios from 'axios';
import { setZustandValue } from 'nes-zustand';
import { useEffect, useMemo, useState } from 'react';
import { useStore } from 'zustand';
import { toggleSwapType } from '../handlers';
import { isTransactionSubmittedState, tokenInputState, tokenOutputState } from '../store';
import { ConfirmSwapContent } from './ConfirmSwap';
import { ButtonSwapToggle } from './SwapIconToggle';
import { TransactionPopup } from './token/TransactionSettingPopup';
import { TransationSubmittedCard } from './TransationSubmittedCard';

export const SwapContainer = () => {
	// State
	const isTransactionSubmitted = useStore(isTransactionSubmittedState, (state) => state.value);

	// TOKEN
	const tokenInput = useStore(tokenInputState, (state) => state.value);
	const tokenOutput = useStore(tokenOutputState, (state) => state.value);

	// This price of token
	const { data: markPriceOutput } = useMarkPrice(`PERP_${tokenOutput?.token ?? 'ETH'}_USDC`);

	const [isEnterAmount, setIsEnterAmount] = useState(false);
	const [isSwaped, setIsSwaped] = useState(false);

	//
	const [slippageAmount, setSlippageAmount] = useState(2);
	const [deadlineMinutes, setDeadlineMinutes] = useState(10);

	const [inputAmount, setInputAmount] = useState<any>('');
	const [outputAmount, setOutputAmount] = useState<any>('');
	const [loading, setLoading] = useState(false);
	// ================= //

	const handleEnterAmount = () => {
		setIsEnterAmount(true);

		if (isEnterAmount) {
			setIsSwaped(true);
		}
	};

	useEffect(() => {
		const fetchPrices = async () => {
			try {
				const ethResponse = await axios.get(
					'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
				);
				const btcResponse = await axios.get(
					'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
				);

				console.log(ethResponse, btcResponse);
			} catch (error) {
				console.error('Error fetching prices:', error);
			}
		};

		fetchPrices();
	}, []);

	// Handle get swap price
	const handleInputChange = async (inputAmount: number) => {
		// setLoading(true);
		setInputAmount(inputAmount);

		setOutputAmount(inputAmount);

		// await exchangePriceAPI({
		//   chain: "ethereum",
		//   account: "0x0000000000000000000000000000000000000000",
		//   inTokenAddress: tokenInput?.address ?? "",
		//   outTokenAddress: tokenOutput?.address ?? "",
		//   isExactIn: true,
		//   slippage: slippageAmount,
		//   inTokenAmount: inputAmount.toString(),
		// });
	};

	console.log(markPriceOutput);

	const outputPrice = useMemo(() => {
		const exchangeRate = markPriceOutput / 2362.25;
		const result = inputAmount * exchangeRate;

		return result.toFixed(8);
	}, [markPriceOutput, inputAmount]);

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
								field="input"
								onChange={handleInputChange}
								currentToken={tokenInput}
							/>

							<ButtonSwapToggle toggleSwapType={toggleSwapType} />

							<CurrencyField valueAmount={outputPrice} currentToken={tokenOutput} field="output" />

							<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
								<Typography color={setColorThemeMode(useTheme().palette.text.primary, useTheme().palette.grey[50])}>
									{!isEnterAmount ? 'Slippage Tolerance' : 'Price'}
								</Typography>

								<Stack direction={'row'} alignItems={'center'} spacing={1}>
									<Typography color={setColorThemeMode(useTheme().palette.text.primary, useTheme().palette.grey[50])}>
										{!isEnterAmount ? '1%' : '0978787667 ETH Per'}
									</Typography>

									{isEnterAmount && (
										<MainIconButton size="small">
											<IconTransform size={'1.2rem'} color={useTheme().palette.text.primary} />
										</MainIconButton>
									)}
								</Stack>
							</Stack>

							<MainButton variant="contained" color="primary" size="large" onClick={handleEnterAmount}>
								{isEnterAmount ? 'Swap' : 'Enter A Mount'}
							</MainButton>
						</Stack>

						{isEnterAmount && (
							<Stack spacing={0.5} pt={2}>
								<Item title="Minimum recevied" value="9747.969 AMPL" />

								<Item
									title="Price Impact"
									value={<span style={{ color: useTheme().palette.success.main }}> {'<0.01%'}</span>}
								/>

								<Item title="Liquidity Provider Fee" value={'0.0015ETH'} />

								<MainButton fullWidth color="inherit" size="large">
									View Pair Analytis
								</MainButton>
							</Stack>
						)}
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

				<MainIconButton size="small">
					<IconHelp size={'1.2rem'} color={useTheme().palette.text.primary} />
				</MainIconButton>
			</Stack>
			<Typography>{value}</Typography>
		</Stack>
	);
};
