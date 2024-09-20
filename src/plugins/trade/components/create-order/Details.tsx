import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { Box, Stack, useTheme } from '@mui/material';
import { useMarkPrice } from '@orderly.network/hooks';
import { useConnectWallet } from '@web3-onboard/react';
import { memo, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Inputs } from './CreateOrderForm';

interface IProps {
	estLiqPrice: number | null | undefined;
	estLeverage: number | null | undefined;
	quote?: string;
	symbol: string;
	baseDecimals: number;
	formContext: UseFormReturn<Inputs>;
}

const Details = ({ estLiqPrice, estLeverage, baseDecimals, quote, symbol, formContext }: IProps) => {
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

	const { data: markPrice } = useMarkPrice(symbol);

	// Handle connect wallet button
	const handleConnectWallet = async () => {
		await connect();
	};

	const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: baseDecimals });

	const totalPrice = useMemo(() => {
		const quantity = formContext.watch('quantity') ?? 0;
		const price = formContext.watch('price') ?? 0;

		if (formContext.watch('type') === 'Limit') {
			const total = Number(quantity) * Number(price);
			if (isNaN(total)) {
				return 0;
			}

			return usdFormatter.format(total);
		} else if (formContext.watch('type') === 'Market') {
			return usdFormatter.format(Number(quantity) * markPrice);
		} else {
			return 0;
		}
	}, [formContext, markPrice]);

	return (
		<MainCard width="100%" backgroudColor="primaryLight">
			<Stack spacing={'6px'} pb={'10px'}>
				<ItemRow
					title="Total ≈"
					value={
						<Box>
							{totalPrice}{' '}
							<span style={{ color: setColorThemeMode(useTheme().palette.grey[700], useTheme().palette.grey[300]) }}>
								{quote}
							</span>
						</Box>
					}
				/>
				<ItemRow title="Est. Liq. price:" value={estLiqPrice ? `${usdFormatter.format(estLiqPrice)} ${quote}` : '-'} />
				{/* <ItemRow title="Price Impact" value={'_'} /> */}
				<ItemRow title="Account leverage:" value={estLeverage ? `⇒ ${formatter.format(estLeverage)}` : '_'} />
				{/* <ItemRow
					title={
						<Stack direction={'row'} spacing={'6px'} alignItems={'center'}>
							<Typography
								fontSize={'15px'}
								color={setColorThemeMode(useTheme().palette.grey[500], useTheme().palette.common.white)}
							>
								Fee
							</Typography>

							<MainChip disabledPadding fullRounded label={'Taker'} />
						</Stack>
					}
					value="_"
				/>

				<ItemRow title="Total" value="_" /> */}
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
