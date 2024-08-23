import { MainButton } from '@/components/button/MainButton';
import InputField from '@/components/form-control/InputField';
import SelectField from '@/components/form-control/SelectField';
import IconLoading from '@/components/icons/loading';
import { theme } from '@/utils';
import { getDecimalsFromTick } from '@/utils/formatters/api';
import { usdFormatter } from '@/utils/formatters/number';
import { Box, Stack, Typography } from '@mui/material';
import { useOrderEntry, useSymbolsInfo, useWithdraw } from '@orderly.network/hooks';
import { Divider } from '@orderly.network/react';
import { SelectOption } from '@orderly.network/react/esm/select/select';
import { OrderEntity, OrderSide, OrderType } from '@orderly.network/types';
import { useConnectWallet, useNotifications } from '@web3-onboard/react';
import { ReactNode, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { match } from 'ts-pattern';
import { Balance } from '../common/Balance';
import { LeverageContent } from '../common/Leverage';
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

	const handleChangeDirection = (side: any) => {
		formContext.setValue('direction', side);
	};

	const watchDirection = formContext.watch('direction');

	return (
		<>
			<Balance />
			<LeverageContent />

			<form onSubmit={formContext.handleSubmit(submitForm)}>
				<Box p={1}>
					<Stack direction={'row'} spacing={1}>
						<MainButton
							size="large"
							color={
								match(watchDirection)
									.with('Buy', () => 'success')
									.otherwise(() => 'inherit') as any
							}
							variant="contained"
							fullWidth
							onClick={() => handleChangeDirection('Buy')}
							disabled={!wallet}
						>
							Buy
						</MainButton>

						<MainButton
							size="large"
							color={
								match(watchDirection)
									.with('Sell', () => 'error')
									.otherwise(() => 'inherit') as any
							}
							variant="contained"
							fullWidth
							disabled={!wallet}
							onClick={() => handleChangeDirection('Sell')}
						>
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
						<MainButton
							type="submit"
							variant="contained"
							color={
								match(watchDirection)
									.with('Sell', () => 'error')
									.otherwise(() => 'success') as any
							}
							size="large"
							fullWidth
						>
							{match(watchDirection)
								.with('Buy', () => 'Buy')
								.otherwise(() => 'Sell')}
							/Long
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

export const Item = ({ value, label }: IIttemProps) => {
	return (
		<Stack direction={'row'} justifyContent={'space-between'}>
			<Typography fontSize={'12px'} color={theme.palette.grey[600]}>
				{label}
			</Typography>

			<Typography fontSize={'14px'}>{value}</Typography>
		</Stack>
	);
};
