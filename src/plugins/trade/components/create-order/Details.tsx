import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { MainChip } from '@/components/chip/MainChip';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useMarkPrice } from '@orderly.network/hooks';
import { useConnectWallet } from '@web3-onboard/react';
import { memo, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Inputs } from './CreateOrderForm';

interface IProps {
	totalPrice: number;
	fee: { feePercentage: number; totalFee: number };
	estLeverage: number | any | undefined;
	estLiqPrice: number | any | undefined;
	quote?: string;
	symbol: string;
	baseDecimals: number;
	formContext: UseFormReturn<Inputs>;
}

const Details = ({
	totalPrice = 0,
	estLeverage,
	estLiqPrice,
	baseDecimals,
	quote,
	fee,
	symbol,
	formContext,
}: IProps) => {
	const [{ wallet, connecting }, connect] = useConnectWallet();
	const { data: markPrice } = useMarkPrice(symbol);
	const theme = useTheme();

	// Handle connect wallet button
	const handleConnectWallet = async () => {
		await connect();
	};

	const priceImpact = useMemo(() => {
		const receivedPrice: any = formContext.watch('price') ?? 0;

		if (receivedPrice && isNaN(receivedPrice)) {
			return '';
		}

		// Adjusted calculation: (received price - mark price) / mark price * 100
		const price = ((Number(receivedPrice) - markPrice) / markPrice) * 100;
		return `${price.toFixed(2)}%`;
	}, [markPrice, formContext]);

	const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: baseDecimals });

	return (
		<MainCard width="100%" backgroudColor="primaryLight">
			<Typography pb={'10px'}>Details</Typography>

			<Stack spacing={'6px'} pb={'10px'}>
				<ItemRow title="Expected Price" value={formatter.format(estLiqPrice)} />

				<ItemRow title="Price Impact" value={priceImpact ?? '_'} />

				<ItemRow title="Account leverage:" value={estLeverage ? `⇒ ${formatter.format(estLeverage)}` : '_'} />

				<ItemRow
					title={
						<Stack direction={'row'} spacing={'6px'} alignItems={'center'}>
							<Typography fontSize={'15px'} color={setColorThemeMode(theme.palette.grey[500], theme.palette.grey[300])}>
								Fee {fee.feePercentage > 0 ? `(${usdFormatter.format(fee.feePercentage)})%` : ''}
							</Typography>

							<MainChip disabledPadding fullRounded label={'Taker'} />
						</Stack>
					}
					value={
						<Box>
							{fee.totalFee ? (Math.floor(fee.totalFee * 100) / 100).toLocaleString() : '-'}{' '}
							<span style={{ color: setColorThemeMode(theme.palette.grey[700], theme.palette.grey[300]) }}>
								{quote}
							</span>
						</Box>
					}
				/>

				<ItemRow
					title="Total ≈"
					value={
						<Box>
							{totalPrice > 0 ? (Math.floor(totalPrice * 100) / 100).toLocaleString() : '-'}{' '}
							<span style={{ color: setColorThemeMode(theme.palette.grey[700], theme.palette.grey[300]) }}>
								{quote}
							</span>
						</Box>
					}
				/>
			</Stack>

			<MainButton
				fullWidth
				variant="contained"
				color="primary"
				type={wallet ? 'submit' : 'button'}
				// disabled={isBalanceSufficient}
				onClick={() => {
					return wallet ? null : handleConnectWallet();
				}}
			>
				{connecting ? 'Connecting...' : wallet ? formContext.watch('direction') : 'Connect wallet'}
			</MainButton>
		</MainCard>
	);
};

export default memo(Details);
