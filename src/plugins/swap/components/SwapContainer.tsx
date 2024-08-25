'use client';
import { MainButton } from '@/components/button/MainButton';
import { MainIconButton } from '@/components/button/MainIconButton';
import { MainCard } from '@/components/card/MainCard';
import { CurrencyField } from '@/components/swap/CurrencyField';
import { theme } from '@/utils';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack, Typography } from '@mui/material';
import { IconHelp, IconTransform } from '@tabler/icons-react';
import { setZustandValue } from 'nes-zustand';
import { useState } from 'react';
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

	const [isEnterAmount, setIsEnterAmount] = useState(false);
	const [isSwaped, setIsSwaped] = useState(false);

	//
	const [slippageAmount, setSlippageAmount] = useState(2);
	const [deadlineMinutes, setDeadlineMinutes] = useState(10);

	const [wethAmount, setWethAmount] = useState(undefined);
	const [inputAmount, setInputAmount] = useState(-1);
	const [outputAmount, setOutputAmount] = useState(undefined);
	const [loading, setLoading] = useState(false);
	// ================= //

	const handleEnterAmount = () => {
		setIsEnterAmount(true);

		if (isEnterAmount) {
			setIsSwaped(true);
		}
	};

	// Handle get swap price
	const getSwapPrice = async (inputAmount: number) => {
		setLoading(true);
		setInputAmount(inputAmount);

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
							<CurrencyField handleGetSwapPrice={getSwapPrice} field="input" currentToken={tokenInput} />

							<ButtonSwapToggle toggleSwapType={toggleSwapType} />

							<CurrencyField currentToken={tokenOutput} field="output" />

							<Stack direction={'row'} justifyContent={'space-between'} pb={2} alignItems={'center'}>
								<Typography>{!isEnterAmount ? 'Slippage Tolerance' : 'Price'}</Typography>

								<Stack direction={'row'} alignItems={'center'} spacing={1}>
									<Typography>{!isEnterAmount ? '1%' : '0978787667 ETH Per'}</Typography>

									{isEnterAmount && (
										<MainIconButton size="small">
											<IconTransform size={'1.2rem'} color={theme.palette.common.black} />
										</MainIconButton>
									)}
								</Stack>
							</Stack>

							<MainButton variant="contained" color="primary" size="large" onClick={handleEnterAmount}>
								{isEnterAmount ? 'Swap' : 'Enter A Mount'}
							</MainButton>
						</Stack>

						{isEnterAmount && (
							<Stack spacing={1} pt={2}>
								<Item title="Minimum recevied" value="9747.969 AMPL" />

								<Item
									title="Price Impact"
									value={<span style={{ color: theme.palette.success.main }}> {'<0.01%'}</span>}
								/>

								<Item title="Liquidity Provider Fee" value={'0.0015ETH'} />

								<MainButton fullWidth color="inherit">
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
				<Typography color={theme.palette.grey[900]}>{title}</Typography>

				<MainIconButton size="small">
					<IconHelp size={'1.2rem'} color={theme.palette.grey[900]} />
				</MainIconButton>
			</Stack>
			<Typography>{value}</Typography>
		</Stack>
	);
};
