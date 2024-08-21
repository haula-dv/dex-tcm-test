import { MainButton } from '@/components/button/MainButton';
import { MainIconButton } from '@/components/button/MainIconButton';
import InputField from '@/components/form-control/InputField';
import SelectField from '@/components/form-control/SelectField';
import IconLoading from '@/components/icons/loading';
import { theme } from '@/utils';
import { getDecimalsFromTick } from '@/utils/formatters/api';
import { usdFormatter } from '@/utils/formatters/number';
import { Box, Dialog, Stack, Typography } from '@mui/material';
import { useOrderEntry, useSymbolsInfo, useWithdraw } from '@orderly.network/hooks';
import { Deposit, Divider, Withdraw } from '@orderly.network/react';
import { SelectOption } from '@orderly.network/react/esm/select/select';
import { OrderSide, OrderType } from '@orderly.network/types';
import { IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { match } from 'ts-pattern';

interface IProps {
	symbol: string;
}

type Inputs = {
	direction: 'Buy' | 'Sell';
	type: 'Limit' | 'Market' | 'StopLimit' | 'StopMarket';
	triggerPrice?: string;
	price?: string;
	quantity?: string;
};

const defaultValues: Inputs = {
	direction: 'Buy',
	type: 'Limit',
	triggerPrice: undefined,
	price: undefined,
	quantity: undefined,
};

const items: SelectOption[] = [
	{ label: 'Limit order', value: 'Limit' },
	{ label: 'Market order', value: 'Market' },
	{ label: 'Stop Limit', value: 'StopLimit' },
	{ label: 'Stop market', value: 'StopMarket' },
];

export const CreateOrderContainer = ({ symbol }: IProps) => {
	const [open, setOpen] = useState(false);
	const [currentType, setCurrentType] = useState<string>();

	const handleClick = (type: string) => {
		setOpen(true);
		setCurrentType(type);
	};

	const [side, setSide] = useState(OrderSide.BUY);
	const [currentTypeMarketValue, setCurrentTypeMarketValue] = useState('limit');

	const formContext = useForm<Inputs>({
		defaultValues,
	});

	// Orderly Hooks
	const symbolsInfo = useSymbolsInfo();
	const { availableWithdraw } = useWithdraw();
	const { onSubmit, helper, maxQty, estLeverage, estLiqPrice } = useOrderEntry(
		{
			symbol,
			side: match(formContext.watch('direction', 'Buy'))
				.with('Buy', () => OrderSide.BUY)
				.with('Sell', () => OrderSide.SELL)
				.exhaustive(),
			order_type: match(formContext.watch('type', 'Market'))
				.with('Market', () => OrderType.MARKET)
				.with('Limit', () => OrderType.LIMIT)
				.with('StopLimit', () => OrderType.STOP_LIMIT)
				.with('StopMarket', () => OrderType.STOP_MARKET)
				.exhaustive(),
			order_quantity: formContext.watch('quantity', undefined),
			order_price: formContext.watch('price', undefined),
		},
		{ watchOrderbook: true },
	);

	useEffect(() => {
		//
	}, [formContext]);

	if (symbolsInfo.isNil) {
		return <IconLoading />;
	}

	const symbolInfo = symbolsInfo[symbol]();
	const [_, base, quote] = symbol.split('_');
	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);
	const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: baseDecimals });

	return (
		<Box>
			<Divider />

			<Stack
				direction={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}
				width={'400px'}
				flexShrink={0}
				p={1}
				height={'58px'}
			>
				<Typography>Account</Typography>

				<Stack direction={'row'} spacing={1}>
					<MainButton color="inherit" variant="filledTonal" onClick={() => handleClick('desposit')}>
						Desposit
					</MainButton>

					<MainButton color="inherit" variant="filledTonal" onClick={() => handleClick('withdraw')}>
						Withdraw
					</MainButton>
				</Stack>
			</Stack>

			<Divider />

			<form>
				<Box p={1}>
					<Stack direction={'row'} spacing={1}>
						<MainButton
							size="large"
							color="success"
							variant="contained"
							fullWidth
							{...formContext.register('direction')}
							value="Buy"
						>
							Buy
						</MainButton>

						<MainButton size="large" color="inherit" variant="contained" fullWidth>
							Sell
						</MainButton>
					</Stack>
					<Stack direction={'row'} justifyContent={'space-between'} py={1}>
						<Typography color={theme.palette.grey[600]}>
							Available {usdFormatter.format(availableWithdraw)} {quote}
						</Typography>

						<MainButton>Desposit</MainButton>
					</Stack>

					<Stack spacing={1}>
						<SelectField formContext={formContext} name="type" options={items} />

						{match(formContext.watch('type', 'StopMarket'))
							.with('StopMarket', () => (
								<InputField
									name="triggerPrice"
									formContext={formContext}
									inputMode="decimal"
									prefix={'Trigger'}
									suffix={quote}
								/>
							))
							.otherwise(() => null)}

						<InputField
							name="price"
							formContext={formContext}
							readOnly={match(formContext.watch('type', 'StopMarket'))
								.with('StopMarket', () => true)
								.otherwise(() => null)}
							inputMode="decimal"
							prefix={'Price'}
							suffix={quote}
							decimals={quoteDecimals}
						/>

						<InputField
							formContext={formContext}
							name="quantity"
							prefix="Quantity"
							inputMode="decimal"
							suffix={base}
							decimals={baseDecimals}
						/>

						<div className="flex flex-1 justify-between gap-3">
							<span className="font-bold color-[var(--gray-12)]">Max:</span>
							<span>
								{formatter.format(maxQty)} {base}
							</span>
						</div>

						<Divider />

						<InputField
							formContext={formContext}
							name="quantity"
							inputMode="decimal"
							prefix={'Total ≈'}
							suffix={base}
						/>
					</Stack>
				</Box>
			</form>

			<Dialog open={open} onClose={() => setOpen(false)} sx={{ zIndex: 1 }}>
				<Stack direction={'row'} justifyContent={'space-between'} p={1} alignItems={'center'}>
					<Typography>{currentType === 'desposit' ? 'Desposit' : 'Withdraw'}</Typography>

					<MainIconButton size="small" onClick={() => setOpen(false)}>
						<IconX />
					</MainIconButton>
				</Stack>

				<Divider />

				<Box p={1}>{currentType === 'desposit' ? <Deposit /> : <Withdraw />}</Box>
			</Dialog>
		</Box>
	);
};
