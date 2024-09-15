/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { MainButton } from '@/components/button/MainButton';
import { MainIconButton } from '@/components/button/MainIconButton';
import { MainCard } from '@/components/card/MainCard';
import TokenCurrencyInputField from '@/components/swap/TokenCurrencyInputField';
import TokenCurrencyOutputField from '@/components/swap/TokenCurrencyOutputField';
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
	const tokenInputActive = useStore(tokenInputState, (state) => state.value);
	const tokenOutputActive = useStore(tokenOutputState, (state) => state.value);

	const [inputAmount, setInputAmount] = useState<any>('');
	const [outputAmount, setOutputAmount] = useState<any>('');

	const [isInput, setInput] = useState(true);

	const [isEnterAmount, setIsEnterAmount] = useState(false);
	const [isSwaped, setIsSwaped] = useState(false);

	const [slippageAmount, setSlippageAmount] = useState('0.1');
	const [deadlineMinutes, setDeadlineMinutes] = useState('10');

	// Mark price
	const { data: inputMarkPrice } = useMarkPrice(`PERP_${tokenInputActive?.token}_USDC`);

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
	const handleInputChange = useCallback((inputAmount: string) => {
		setInputAmount(inputAmount);
	}, []);

	const handleOutputChange = (value: string) => {
		setOutputAmount(value);
	};

	// This handle toggle side
	const handleToggleSide = () => {
		// setInputAmount(outputAmount);
		// setOutputAmount(inputAmount);
		setZustandValue(tokenInputState, tokenOutputActive);
		setZustandValue(tokenOutputState, tokenInputActive);
	};

	console.log(tokenOutputActive, tokenInputActive);

	return (
		<Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'calc(100vh - 56px)'}>
			<MainCard
				backgroudColor="primary"
				borderRadius="0px"
				isNotch
				padding={`${TSizes.margin_sm}`}
				maxWidth={TSizes.widthCommonCard}
			>
				<TransactionPopup
					getSlippageAmount={(value) => setSlippageAmount(value)}
					getDeadlineMinutes={(value) => setDeadlineMinutes(value)}
				/>

				{!isSwaped ? (
					<>
						<Stack spacing={1.5}>
							<TokenCurrencyInputField handleChange={handleInputChange} currentField={isInput ? 'input' : 'output'} />

							<ButtonSwapToggle toggleSwapType={handleToggleSide} />

							<TokenCurrencyOutputField
								currentField={isInput ? 'output' : 'input'}
								inputMarkPrice={inputMarkPrice}
								inputAmount={inputAmount}
								setAmount={setInputAmount}
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

						{tokenInputActive && tokenOutputActive && <Cost />}
					</>
				) : (
					<ConfirmSwapContent
						toggleSwapType={toggleSwapType}
						tokenSellSelected={tokenInputActive}
						tokenBuySelected={tokenOutputActive}
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
