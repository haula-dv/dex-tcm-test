/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { ITokenType } from '@/common';
import { MainButton } from '@/components/button/MainButton';
import { MainIconButton } from '@/components/button/MainIconButton';
import { MainCard } from '@/components/card/MainCard';
import TokenCurrencyInputField from '@/components/swap/TokenCurrencyInputField';
import TokenCurrencyOutputField from '@/components/swap/TokenCurrencyOutputField';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import { useMarkPrice } from '@orderly.network/hooks';
import { IconChevronDown, IconHelp } from '@tabler/icons-react';
import { useConnectWallet } from '@web3-onboard/react';
import { setZustandValue } from 'nes-zustand';
import { useCallback, useMemo, useState } from 'react';
import { useStore } from 'zustand';
import { toggleSwapType } from '../handlers';
import { isTransactionSubmittedState, tokenInputState, tokenOutputState } from '../store';
import { ConfirmSwapContent } from './ConfirmSwap';
import { ButtonSwapToggle } from './SwapIconToggle';
import { TransactionPopup } from './token/TransactionSettingPopup';
import { TransationSubmittedCard } from './TransationSubmittedCard';

export const SwapContainer = () => {
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
	const theme = useTheme();

	// State
	const isTransactionSubmitted = useStore(isTransactionSubmittedState, (state) => state.value);

	// TOKEN
	const sellTokenActived = useStore(tokenInputState, (state) => state.value); // UP
	const buyTokenActived = useStore(tokenOutputState, (state) => state.value); // DOWN

	const [isCurrentInputing, setIsCurrentInputing] = useState(true);

	const [inputAmount, setInputAmount] = useState<any>('');
	const [outputAmount, setOutputAmount] = useState<any>('');

	const [isInput, setInput] = useState(true);
	const [loadingAmount, setLoadingAmount] = useState(false);
	const [loadingDes, setLoadingDes] = useState(false);

	const [isEnterAmount, setIsEnterAmount] = useState(false);
	const [isSwaped, setIsSwaped] = useState(false);

	const [slippageAmount, setSlippageAmount] = useState('0.1');
	const [deadlineMinutes, setDeadlineMinutes] = useState('10');

	// Mark price
	const { data: inputMarkPrice } = useMarkPrice(`PERP_${sellTokenActived?.token}_USDC`);
	const { data: outputMarkPrice } = useMarkPrice(`PERP_${buyTokenActived?.token}_USDC`);

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

	// This handle toggle side
	const handleToggleSide = () => {
		setLoadingAmount(true);
		setLoadingDes(true);

		setInput(!isInput);

		setZustandValue(tokenInputState, buyTokenActived);
		setZustandValue(tokenOutputState, sellTokenActived);
		setInputAmount(outputAmount);
		setOutputAmount(inputAmount);

		setTimeout(() => {
			setLoadingAmount(false);
			setLoadingDes(false);
		}, 1200);
	};

	const handleChangeToken = (token: ITokenType, type: string) => {
		setLoadingAmount(true);
		setLoadingDes(true);
		let tokenKey = token.token;

		if (token.token === 'WBTC') {
			tokenKey = 'BTC';
		}

		token.token = tokenKey;

		if (type === 'down') {
			setZustandValue(tokenOutputState, token);
		} else {
			setZustandValue(tokenInputState, token);
		}

		setTimeout(() => {
			setLoadingDes(false);
		}, 1200);
	};

	const baseExchangeRate = useMemo(() => {
		const baseValue = 1;

		let rate = outputMarkPrice / inputMarkPrice;
		const result = baseValue * rate;

		return result.toFixed(6);
	}, [inputMarkPrice, outputMarkPrice]);

	const handleSellInputChange = useCallback((value: string) => {
		setInputAmount(value);
	}, []);

	const handleBuyInputChange = useCallback((value: string) => {
		setOutputAmount(value);
	}, []);

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
							<TokenCurrencyInputField
								inputAmount={inputAmount}
								outputAmount={outputAmount}
								handleChange={handleSellInputChange}
								currentField={isInput ? 'input' : 'output'}
								loadingAmount={loadingAmount}
								setLoadingAmount={setLoadingAmount}
								handleChangeToken={handleChangeToken}
							/>

							<ButtonSwapToggle toggleSwapType={handleToggleSide} />

							<TokenCurrencyOutputField
								currentField={isInput ? 'output' : 'input'}
								inputMarkPrice={inputMarkPrice}
								inputAmount={inputAmount}
								outputAmount={outputAmount}
								handleChangeInput={handleBuyInputChange}
								loadingAmount={loadingAmount}
								setLoadingAmount={setLoadingAmount}
								handleChangeToken={handleChangeToken}
							/>

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

						<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
							{loadingDes ? (
								<Skeleton height={'24px'} width={'100px'} variant="text" />
							) : (
								sellTokenActived?.token &&
								buyTokenActived?.token && (
									<>
										<Typography>
											1 {buyTokenActived.token} = {baseExchangeRate} {sellTokenActived?.token}
											<span style={{ paddingLeft: '4px', color: theme.palette.grey[300] }}>
												(${outputMarkPrice.toLocaleString()})
											</span>
										</Typography>

										<MainIconButton size="small" edge="end">
											<IconChevronDown size={'1rem'} />
										</MainIconButton>
									</>
								)
							)}
						</Stack>

						{/* {tokenInputActive && tokenOutputActive && <Cost />} */}
					</>
				) : (
					<ConfirmSwapContent
						toggleSwapType={toggleSwapType}
						tokenSellSelected={sellTokenActived}
						tokenBuySelected={buyTokenActived}
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
