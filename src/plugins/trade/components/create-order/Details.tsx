import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { MainChip } from '@/components/chip/MainChip';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useAccountInfo, useMarkPrice } from '@orderly.network/hooks';
import { useConnectWallet } from '@web3-onboard/react';
import { memo, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Inputs } from './CreateOrderForm';

interface IProps {
	estLiqPrice: number | any | undefined;
	estLeverage: number | any | undefined;
	quote?: string;
	base?: string;
	symbol: string;
	baseDecimals: number;
	formContext: UseFormReturn<Inputs>;
}

const Details = ({ estLiqPrice = 0, estLeverage, baseDecimals, quote, base, symbol, formContext }: IProps) => {
	const theme = useTheme();
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
	const { data: markPrice } = useMarkPrice(symbol);
	const { data: accountInfo, isLoading } = useAccountInfo();

	// Handle connect wallet button
	const handleConnectWallet = async () => {
		await connect();
	};

	const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: baseDecimals });
	const quantity = Number(formContext.watch('quantity')) ?? 0;
	const price = formContext.watch('price') ?? 0;

	const priceImpact = useMemo(() => {
		const receivedPrice: any = formContext.watch('price') ?? 0;

		if (receivedPrice && isNaN(receivedPrice)) {
			return '';
		}

		// Adjusted calculation: (received price - mark price) / mark price * 100
		const price = ((Number(receivedPrice) - markPrice) / markPrice) * 100;
		return `${price.toFixed(2)}%`;
	}, [markPrice, formContext]);

	const takerFeeRate = useMemo(() => {
		if (!accountInfo) {
			return 0;
		}

		return accountInfo?.taker_fee_rate ?? 0;
	}, [accountInfo]);

	const makerFeeRate = useMemo(() => {
		if (!accountInfo) {
			return 0;
		}

		return accountInfo?.maker_fee_rate ?? 0;
	}, [accountInfo]);

	const fee = useMemo(() => {
		const feeRate = formContext.watch('type') === 'Market' ? takerFeeRate : makerFeeRate;

		const totalFee = feeRate * quantity; // Số lượng phí cụ thể

		// Nếu bạn muốn tính phần trăm phí dựa trên tổng giá trị giao dịch
		const totalValue = quantity * estLiqPrice; // Tổng giá trị giao dịch
		const feePercentage = (totalFee / totalValue) * 100; // Phần trăm phí

		console.log(typeof feePercentage);

		if (!isFinite(feePercentage)) {
			return { totalFee: 0, feePercentage: 0 };
		}

		return { totalFee, feePercentage }; // Trả về cả hai giá trị
	}, [takerFeeRate, makerFeeRate, quantity, formContext, estLiqPrice]);

	const totalPrice = useMemo(() => {
		if (isNaN(quantity) && isNaN(markPrice)) {
			return 0;
		}

		const amount = Number(quantity) ?? 0;
		const curPrice = Number(price) ?? 0;

		if (formContext.watch('type') === 'Limit' || formContext.watch('type') === 'StopLimit') {
			const total = amount * curPrice + fee.totalFee;
			if (isNaN(total)) {
				return 0;
			}

			return total;
		}

		const total = amount * markPrice + fee.totalFee;
		if (isNaN(total)) {
			return 0;
		}

		return total;
	}, [quantity, markPrice, fee, price, formContext]);

	return (
		<MainCard width="100%" backgroudColor="primaryLight">
			<Typography pb={'10px'}>Details</Typography>
			<Stack spacing={'6px'} pb={'10px'}>
				<ItemRow title="Expected Price" value={formatter.format(markPrice)} />

				<ItemRow title="Price Impact" value={priceImpact ?? '_'} />

				<ItemRow title="Account leverage:" value={estLeverage ? `⇒ ${formatter.format(estLeverage)}` : '_'} />

				<ItemRow
					title={
						<Stack direction={'row'} spacing={'6px'} alignItems={'center'}>
							<Typography
								fontSize={'15px'}
								color={setColorThemeMode(useTheme().palette.grey[500], useTheme().palette.grey[300])}
							>
								Fee {fee.feePercentage > 0 ? `(${usdFormatter.format(fee.feePercentage)})%` : ''}
							</Typography>

							<MainChip disabledPadding fullRounded label={'Taker'} />
						</Stack>
					}
					value={
						<Box>
							{fee.totalFee ? usdFormatter.format(fee.totalFee) : '-'}{' '}
							<span style={{ color: setColorThemeMode(useTheme().palette.grey[700], useTheme().palette.grey[300]) }}>
								{quote}
							</span>
						</Box>
					}
				/>

				<ItemRow
					title="Total ≈"
					value={
						<Box>
							{totalPrice > 0 ? usdFormatter.format(totalPrice) : '-'}{' '}
							<span style={{ color: setColorThemeMode(useTheme().palette.grey[700], useTheme().palette.grey[300]) }}>
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
				onClick={() => {
					return wallet ? null : handleConnectWallet();
				}}
			>
				{wallet ? formContext.watch('direction') : 'Connect wallet'}
			</MainButton>
		</MainCard>
	);
};

export default memo(Details);
