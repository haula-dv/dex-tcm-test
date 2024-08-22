import { MainButton } from '@/components/button/MainButton';
import { MainIconButton } from '@/components/button/MainIconButton';
import InputField from '@/components/form-control/InputField';
import SelectField from '@/components/form-control/SelectField';
import IconLoading from '@/components/icons/loading';
import { theme } from '@/utils';
import { getDecimalsFromTick } from '@/utils/formatters/api';
import { usdFormatter } from '@/utils/formatters/number';
import { Box, Collapse, Stack, Typography } from '@mui/material';
import { useOrderEntry, useSymbolsInfo, useWithdraw } from '@orderly.network/hooks';
import { Divider, Tooltip } from '@orderly.network/react';
import { SelectOption } from '@orderly.network/react/esm/select/select';
import { OrderEntity, OrderSide, OrderType } from '@orderly.network/types';
import { IconChevronDown, IconPencil } from '@tabler/icons-react';
import { useConnectWallet, useNotifications } from '@web3-onboard/react';
import { ReactNode, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { match } from 'ts-pattern';
import { OrderMaxQty } from './OrderMaxQty';

interface IProps {
	symbol: string;
}

type Inputs = {
	direction: 'Buy' | 'Sell';
	type: 'Limit' | 'Market' | 'StopLimit' | 'StopMarket';
	triggerPrice?: string;
	price?: string;
	quantity?: string;
	baseQuantityTotal?: number;
};

const defaultValues: Inputs = {
	direction: 'Buy',
	type: 'Limit',
	triggerPrice: undefined,
	price: undefined,
	quantity: undefined,
	baseQuantityTotal: undefined,
};

const items: SelectOption[] = [
	{ label: 'Limit order', value: 'Limit' },
	{ label: 'Market order', value: 'Market' },
	{ label: 'Stop Limit', value: 'StopLimit' },
	{ label: 'Stop market', value: 'StopMarket' },
];

export const CreateOrderForm = ({ symbol }: IProps) => {
	const [checked, setChecked] = useState(false);
	const [loading, setLoading] = useState(false);
	const formContext = useForm<Inputs>({
		defaultValues,
	});

	// Orderly Hooks
	const symbolsInfo = useSymbolsInfo();
	const [{ wallet }] = useConnectWallet();
	const { availableWithdraw } = useWithdraw();
	const { onSubmit, helper, maxQty, estLeverage, estLiqPrice, markPrice, freeCollateral } = useOrderEntry(
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
	const [_0, customNotification] = useNotifications();

	const submitForm: SubmitHandler<Inputs> = async (data) => {
		setLoading(true);
		const { update } = customNotification({
			eventCode: 'createOrder',
			type: 'pending',
			message: 'Creating order...',
		});
		try {
			await onSubmit(getInput(data, symbol));
			update({
				eventCode: 'createOrderSuccess',
				type: 'success',
				message: 'Order successfully created!',
				autoDismiss: 5_000,
			});
		} catch (err) {
			console.error(`Unhandled error in "submitForm":`, err);
			update({
				eventCode: 'createOrderError',
				type: 'error',
				message: 'Order creation failed!',
				autoDismiss: 5_000,
			});
		} finally {
			setLoading(false);
		}
	};

	// Watch fields
	useEffect(() => {
		const subscription = formContext.watch((value, { name }) => {
			if (name === 'price' || name === 'quantity') {
				const price = value?.price !== undefined ? value.price : 0;
				const quantity = value?.quantity !== undefined ? value.quantity : 0;

				const totalPriceBase = Number(quantity) * Number(price);
				formContext.setValue('baseQuantityTotal', totalPriceBase);
			}
		});

		return () => subscription.unsubscribe();
	}, [formContext]);

	if (symbolsInfo.isNil) {
		return <IconLoading />;
	}

	const symbolInfo = symbolsInfo[symbol]();
	const [_, base, quote] = symbol.split('_');

	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);
	const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: baseDecimals });

	async function getValidationErrors(
		data: Inputs,
		symbol: string,
		validator: ReturnType<typeof useOrderEntry>['helper']['validator'],
	): Promise<ReturnType<ReturnType<typeof useOrderEntry>['helper']['validator']>> {
		return validator(getInput(data, symbol));
	}

	const handleChange = () => {
		setChecked((prev) => !prev);
	};

	return (
		<>
			<Stack
				direction={'row'}
				justifyContent={'space-between'}
				className="pointer"
				p={1}
				alignItems={'center'}
				onClick={handleChange}
			>
				<Stack>
					<Typography fontSize={'12px'} color={theme.palette.grey[600]}>
						Total balance
					</Typography>

					<Typography fontWeight={600}>0.00 USDC</Typography>
				</Stack>

				<IconChevronDown />
			</Stack>

			<Collapse in={checked}>
				<Stack spacing={1} p={1}>
					<Item label="Free collateral" value={'0.00 USDC'} />

					<Item label="Unsettled" value={'PnL 0.00 USDC'} />
				</Stack>
			</Collapse>
			<Divider />

			<Stack direction={'row'} justifyContent={'space-between'} p={1}>
				<Stack>
					<Tooltip
						style={{ maxWidth: '300px' }}
						align="center"
						content={
							(
								<div>
									Your actual Leverage of the whole account / Your max Leverage of the whole account
									<Divider />
									Margin ratio = Total collateral / Total position notional
								</div>
							) as any
						}
					>
						<Box display={'inline-flex'}>
							<Typography fontSize={'12px'} color={theme.palette.grey[600]} className="pointer">
								Margin ratio
							</Typography>
						</Box>
					</Tooltip>

					<Typography color={theme.palette.success.main}>1000.00%</Typography>
				</Stack>

				<Stack>
					<Typography fontSize={'12px'} color={theme.palette.grey[600]}>
						Account leverage
					</Typography>

					<Box>
						0.00x / 50x
						<MainIconButton size="small" edge="end">
							<IconPencil size={'1rem'} />
						</MainIconButton>
					</Box>
				</Stack>
			</Stack>

			<Divider />

			<form onSubmit={formContext.handleSubmit(submitForm)}>
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

					<Stack spacing={1} pb={4}>
						<SelectField formContext={formContext} name="type" options={items} />

						{match(formContext.watch('type', 'StopMarket'))
							.with('StopMarket', () => (
								<InputField
									name="triggerPrice"
									formContext={formContext}
									inputMode="decimal"
									prefix={'Trigger'}
									suffix={quote}
									rules={{
										validate: {
											custom: async (_, data) => {
												const errors = await getValidationErrors(data, symbol, helper.validator);
												return errors?.trigger_price != null ? errors.trigger_price.message : true;
											},
										},
									}}
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
							rules={{
								validate: {
									custom: async (_, data) => {
										const errors = await getValidationErrors(data, symbol, helper.validator);
										return errors?.order_price != null ? errors.order_price.message : true;
									},
								},
							}}
						/>

						<InputField
							formContext={formContext}
							name="quantity"
							prefix="Quantity"
							inputMode="decimal"
							suffix={base}
							decimals={baseDecimals}
							rules={{
								validate: {
									custom: async (_, data) => {
										const errors = await getValidationErrors(data, symbol, helper.validator);
										return errors?.order_quantity != null ? errors.order_quantity.message : true;
									},
								},
							}}
						/>

						<OrderMaxQty maxQty={formatter.format(maxQty)} base={base} />

						<Divider />

						<InputField
							formContext={formContext}
							name="baseQuantityTotal"
							inputMode="decimal"
							prefix={'Total ≈'}
							suffix={base}
						/>

						<Divider />

						<Item
							label="Est. Liq. price:"
							value={
								<>
									{estLiqPrice ? `${usdFormatter.format(estLiqPrice)}` : '-'}{' '}
									<span style={{ color: theme.palette.grey[600] }}>{quote}</span>{' '}
								</>
							}
						/>

						<Item
							label="Account leverage"
							value={estLeverage != null ? `⇒ ${formatter.format(estLeverage)}` : '0.00x'}
						/>
					</Stack>

					{wallet ? (
						<MainButton type="submit" variant="contained" color="success" size="large" fullWidth>
							Buy/Long
						</MainButton>
					) : (
						<MainButton variant="contained" color="primary" size="large" fullWidth>
							Connect wallet
						</MainButton>
					)}
				</Box>
			</form>
		</>
	);
};

function getInput(data: Inputs, symbol: string): OrderEntity {
	return {
		symbol,
		side: match(data.direction)
			.with('Buy', () => OrderSide.BUY)
			.with('Sell', () => OrderSide.SELL)
			.exhaustive(),
		order_type: match(data.type)
			.with('Market', () => OrderType.MARKET)
			.with('Limit', () => OrderType.LIMIT)
			.with('StopLimit', () => OrderType.STOP_LIMIT)
			.with('StopMarket', () => OrderType.STOP_MARKET)
			.exhaustive(),
		order_price: data.price,
		order_quantity: data.quantity,
		trigger_price: data.triggerPrice,
	};
}

interface IIttemProps {
	value: ReactNode | string;
	label: ReactNode | string;
}

const Item = ({ value, label }: IIttemProps) => {
	return (
		<Stack direction={'row'} justifyContent={'space-between'}>
			<Typography fontSize={'12px'} color={theme.palette.grey[600]}>
				{label}
			</Typography>

			<Typography fontSize={'14px'}>{value}</Typography>
		</Stack>
	);
};
