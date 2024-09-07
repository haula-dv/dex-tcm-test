'use client';
import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { ChildHeader } from '@/components/swap/ChildHeader';
import { CurrencyField } from '@/components/swap/CurrencyField';
import { ButtonSwapToggle } from '@/plugins/swap/components/SwapIconToggle';
import { toggleSwapType } from '@/plugins/swap/handlers';
import { tokenInputState, tokenOutputState } from '@/plugins/swap/store';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useStore } from 'zustand';

export const CreateAPairContainer = () => {
	// TOKEN
	const tokenInput = useStore(tokenInputState, (state) => state.value);
	const tokenOutput = useStore(tokenOutputState, (state) => state.value);

	// Handle get swap price
	const getSwapPrice = (inputAmount: number) => {
		//
	};

	useEffect(() => {
		//
	}, []);

	return (
		<Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'calc(100vh - 56px)'}>
			<Box maxWidth={TSizes.widthCommonCard} mx={'auto'} py="48px">
				<MainCard backgroudColor="primary">
					<ChildHeader onBackLink="/pool" title="Create A Pair" />

					<MainCard backgroudColor="common">
						<Typography fontSize={'16px'} fontWeight={600} pb={1}>
							You are the first liquidity provider
						</Typography>
						<Typography>
							You are the first liquidity provider You are the first liquidity provider You are the first liquidity
							provider
						</Typography>
					</MainCard>

					<Stack spacing={1.5} pt={'10px'} pb={'10px'}>
						<CurrencyField handleGetSwapPrice={getSwapPrice} field="input" currentToken={tokenInput} />

						<ButtonSwapToggle toggleSwapType={toggleSwapType} />

						<CurrencyField currentToken={tokenOutput} field="output" />
					</Stack>

					<MainButton fullWidth size="large" variant="contained" color="whitePrimary">
						Invalid Pair
					</MainButton>
				</MainCard>
			</Box>
		</Box>
	);
};
