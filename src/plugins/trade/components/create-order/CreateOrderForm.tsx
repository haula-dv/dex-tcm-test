/* eslint-disable react-hooks/rules-of-hooks */
import { MainCard } from '@/components/card/MainCard';
import IconLoading from '@/components/icons/loading';
import { setColorThemeMode } from '@/utils/helpers';
import { Divider, Stack, Typography, useTheme } from '@mui/material';
import { useAccount, useOrderEntry, useSymbolsInfo, useWithdraw } from '@orderly.network/hooks';
import { AccountStatusEnum, OrderEntity, OrderSide, OrderType } from '@orderly.network/types';
import { useConnectWallet, useNotifications } from '@web3-onboard/react';
import { memo, ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { match } from 'ts-pattern';
import AmountSetOrderSide from './AmountSetOrderSide';
import Details from './Details';
import InputForm from './InputForm';
import OrderDirection from './OrderDirection';
import OrderTypeTab from './OrderTypeTab';

interface IProps {
	symbol: string;
}

export type Inputs = {
	direction: 'Buy' | 'Sell';
	type: 'Limit' | 'Market' | 'StopLimit' | 'StopMarket';
	triggerPrice?: string;
	price?: string;
	quantity?: string;
	baseQuantityTotal?: number;
	orderSide?: string;
};

const defaultValues: Inputs = {
	direction: 'Buy',
	type: 'Limit',
	triggerPrice: undefined,
	price: undefined,
	quantity: undefined,
	baseQuantityTotal: undefined,
	orderSide: undefined,
};

const CreateOrderForm = ({ symbol }: IProps) => {
	const [loading, setLoading] = useState(false);
	const formContext = useForm<Inputs>({
		defaultValues,
		mode: 'all',
	});

	// Orderly Hooks
	const symbolsInfo = useSymbolsInfo();
	const [{ wallet }] = useConnectWallet();
	const { availableWithdraw } = useWithdraw();
	const { account, state } = useAccount();
	const hasOrderlyKey = state.status >= AccountStatusEnum.EnableTrading;

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

	// Submit form
	const submitForm: SubmitHandler<Inputs> = async (data) => {
		if (!hasOrderlyKey && state.status >= AccountStatusEnum.SignedIn) {
			handleOrderkyKey();

			return;
		}

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

	if (symbolsInfo.isNil) {
		return <IconLoading />;
	}

	const [_, base, quote] = symbol.split('_');

	const getInput = (data: Inputs, symbol: string): OrderEntity => {
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
	};

	const handleOrderkyKey = async () => {
		const { update } = customNotification({
			eventCode: 'orderlyKey',
			type: 'pending',
			message: 'Registering Orderly key...',
		});
		try {
			await account.createOrderlyKey(365);
			update({
				eventCode: 'orderlyKeySuccess',
				type: 'success',
				message: 'Key registration complete!',
				autoDismiss: 5_000,
			});
		} catch (err) {
			update({
				eventCode: 'orderlyKeyError',
				type: 'error',
				message: 'Key registration failed!',
				autoDismiss: 5_000,
			});

			throw err;
		} finally {
		}
	};

	return (
		<MainCard backgroudColor="primary" width="100%" height="100%">
			<form onSubmit={formContext.handleSubmit(submitForm)}>
				<Stack spacing={'10px'}>
					<OrderTypeTab formContext={formContext} />
					<OrderDirection formContext={formContext} wallet={wallet} />

					<Stack direction={'row'} alignItems={'center'} spacing={1}>
						<Typography fontWeight={600} fontSize={'13px'}>
							Amount
						</Typography>
						<Typography color={useTheme().palette.grey[500]} fontSize={'12px'}>
							Set order size
						</Typography>
					</Stack>

					<Stack spacing={'8px'}>
						<InputForm
							formContext={formContext}
							getInput={getInput}
							helper={helper}
							maxQty={maxQty}
							symbol={symbol}
							symbolsInfo={symbolsInfo}
						/>

						<Divider
							sx={{
								'&::before': {
									borderColor: setColorThemeMode(useTheme().palette.divider, useTheme().palette.common.white),
								},
								'&::after': {
									borderColor: setColorThemeMode(useTheme().palette.divider, useTheme().palette.common.white),
								},

								'& span': {
									color: setColorThemeMode(useTheme().palette.divider, useTheme().palette.common.white),
								},
							}}
						>
							or
						</Divider>
					</Stack>

					<AmountSetOrderSide formContext={formContext} />

					<Details
						estLiqPrice={estLiqPrice}
						freeCollateral={freeCollateral}
						markPrice={markPrice}
						quote={quote}
						direction={formContext.watch('direction')}
					/>
				</Stack>
			</form>
		</MainCard>
	);
};

interface IIttemProps {
	value: ReactNode | string;
	label: ReactNode | string;
}

export const Item = ({ value, label }: IIttemProps) => {
	return (
		<Stack direction={'row'} justifyContent={'space-between'}>
			<Typography fontSize={'12px'} color={useTheme().palette.grey[600]}>
				{label}
			</Typography>

			<Typography fontSize={'14px'}>{value}</Typography>
		</Stack>
	);
};

export default memo(CreateOrderForm);
