'use client';
import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { ChildHeader } from '@/components/swap/ChildHeader';
import { CurrencyField } from '@/components/swap/CurrencyField';
import { ButtonSwapToggle } from '@/plugins/swap/components/SwapIconToggle';
import { toggleSwapType } from '@/plugins/swap/handlers';
import { tokenInputState, tokenOutputState } from '@/plugins/swap/store';
import { theme } from '@/utils';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useStore } from 'zustand';

export const AddLiquidityContainer = () => {
	const [isApprove, setIsApprove] = useState(false);

	// TOKEN
	const tokenInput = useStore(tokenInputState, (state) => state.value);
	const tokenOutput = useStore(tokenOutputState, (state) => state.value);

	// Handle get swap price
	const getSwapPrice = (inputAmount: number) => {
		//
	};

	const handlSubmitInvalid = () => {
		setIsApprove(true);
	};

	return (
		<Box maxWidth={TSizes.widthCommonCard} mx="auto" pt="48px">
			<MainCard backgroudColor="primary">
				<ChildHeader onBackLink="/pool" title="Add liquidity" />

				<MainCard variant="outlined">
					<Typography>
						<strong>Tips</strong> You are the first liquidity provider You are the first liquidity provider You are the
						first liquidity provider You are the first liquidity provider You are the first liquidity provider You are
						the first liquidity provider
					</Typography>
				</MainCard>

				<Stack spacing={1.5} pt={2} pb={2}>
					<CurrencyField handleGetSwapPrice={getSwapPrice} field="input" currentToken={tokenInput} />

					<ButtonSwapToggle toggleSwapType={toggleSwapType} />

					<CurrencyField currentToken={tokenOutput} field="output" />
				</Stack>

				<Typography fontSize={'18px'} fontWeight={600} pb={2}>
					Prices and pool share
				</Typography>
				<Stack pb={2} spacing={2} direction={'row'} justifyContent={'space-between'}>
					<Stack>
						<Typography color={theme.palette.grey[900]}>WTB</Typography>
						<Typography fontSize={'16px'} fontWeight={600}>
							0.099998
						</Typography>
					</Stack>
					<Stack>
						<Typography color={theme.palette.grey[900]}>WTB</Typography>
						<Typography fontSize={'16px'} fontWeight={600}>
							0.099998
						</Typography>
					</Stack>
					<Stack>
						<Typography color={theme.palette.grey[900]}>WTB</Typography>
						<Typography fontSize={'16px'} fontWeight={600}>
							0.099998
						</Typography>
					</Stack>
				</Stack>

				{!isApprove ? (
					<MainButton fullWidth size="large" variant="contained" color="whitePrimary" onClick={handlSubmitInvalid}>
						Invalid Pair
					</MainButton>
				) : (
					<Stack spacing={2}>
						<MainButton fullWidth size="large" variant="contained" color="primary">
							Approve WBTC
						</MainButton>

						<MainButton fullWidth size="large" variant="contained" color="whitePrimary">
							Supply
						</MainButton>
					</Stack>
				)}
			</MainCard>
		</Box>
	);
};
