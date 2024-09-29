/* eslint-disable react-hooks/rules-of-hooks */
import MainCard from '@/components/card/MainCard';
import IconLoading from '@/components/icons/loading';
import { getDecimalsFromTick } from '@/utils/formatters/api';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Stack, Typography, useTheme } from '@mui/material';
import { useCollateral, useMarkPrice, useOrderEntry, useSymbolsInfo, useWithdraw } from '@orderly.network/hooks';
import { OrderEntity, OrderSide, OrderType } from '@orderly.network/types';
import { useConnectWallet, useNotifications } from '@web3-onboard/react';
import { memo, ReactNode, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { match } from 'ts-pattern';
import { Balance } from '../common/Balance';
import AvailableWithdraw from './AvailableWithdraw';
import Details from './Details';
import InputForm from './InputForm';
import ModalConfirmOrder from './ModalConfirmOrder';
import OrderDirection from './OrderDirection';
import OrderTypeTab from './OrderTypeTab';

interface IProps {
	symbol: string;
}

export type Inputs = {
	direction: 'Buy' | 'Sell';
	type: 'Market' | 'Limit' | 'StopLimit' | 'StopMarket';
	triggerPrice?: string;
	price?: string;
	quantity?: string;
	orderSide?: string;
	total?: string;
};

const defaultValues: Inputs = {
	direction: 'Buy',
	type: 'Limit',
	triggerPrice: undefined,
	price: undefined,
	quantity: undefined,
	orderSide: undefined,
	total: undefined,
};

const CreateOrderForm = ({ symbol }: IProps) => {
	const [loading, setLoading] = useState(false);
	const [openOrderConfirm, setOpenOrderConfirm] = useState(false);

	// Orderly Hooks
	const symbolsInfo = useSymbolsInfo();
	const [{ wallet }] = useConnectWallet();
	const { availableWithdraw } = useWithdraw();
	const collateral = useCollateral();
	const [_0, customNotification] = useNotifications();
	const [_, base, quote] = symbol.split('_');
	const { data: markPrice } = useMarkPrice(symbol);

	const symbolInfo = symbolsInfo[symbol]();
	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

	const formContext = useForm<Inputs>({
		defaultValues,
		mode: 'all',
	});

	const { watch } = formContext;

	const { onSubmit, helper, maxQty, estLeverage, estLiqPrice } = useOrderEntry(
		{
			symbol,
			side: match(watch('direction', 'Buy'))
				.with('Buy', () => OrderSide.BUY)
				.with('Sell', () => OrderSide.SELL)
				.exhaustive(),
			order_type: match(watch('type', 'Market'))
				.with('Market', () => OrderType.MARKET)
				.with('Limit', () => OrderType.LIMIT)
				.with('StopLimit', () => OrderType.STOP_LIMIT)
				.with('StopMarket', () => OrderType.STOP_MARKET)
				.exhaustive(),
			order_quantity: watch('quantity', undefined),
			order_price: watch('price', undefined),
			total: watch('total', undefined),
		},
		{ watchOrderbook: true },
	);

	// Handle show modal confirm
	const handleConfirmOrder = () => {
		if (!isBalanceSufficient) {
			customNotification({
				eventCode: 'error',
				type: 'error',
				message: 'Insufficient balance to place the order.',
				autoDismiss: 5_000,
			});
			return;
		}
		setOpenOrderConfirm(true);
	};

	// Submit form
	const submitForm = async () => {
		const data = formContext.getValues();
		setLoading(true);

		const { update } = customNotification({
			eventCode: 'createOrder',
			type: 'pending',
			message: 'Creating order...',
		});

		if (data.type == 'Market' || data.type == 'StopMarket') {
			data.price = undefined;
		}

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
			setOpenOrderConfirm(false);
			// location.reload();
		}
	};

	const quantity = Number(formContext.watch('quantity')) ?? 0;
	const price = formContext.watch('price') ?? 0;

	const totalPrice = useMemo(() => {
		if (isNaN(quantity)) {
			return 0;
		}

		const amount = Number(quantity) ?? 0;
		const curPrice = Number(price) ?? 0;

		if (formContext.watch('type') === 'Limit' || formContext.watch('type') === 'StopLimit') {
			const total = amount * curPrice;
			if (isNaN(total)) {
				return 0;
			}

			return total;
		}

		const total = amount * markPrice;
		if (isNaN(total)) {
			return 0;
		}

		return total;
	}, [quantity, markPrice, price, formContext]);

	// Check if the balance is sufficient
	const isBalanceSufficient = useMemo(() => {
		return totalPrice <= collateral.availableBalance; // Compare total price with available balance
	}, [totalPrice, collateral]);

	return (
		<>
			{symbolsInfo.isNil ? (
				<IconLoading />
			) : (
				<MainCard backgroudColor="primary" width="100%" height="100%" heightCard="100%">
					{wallet && <Balance availableWithdraw={collateral.availableBalance} quote={quote} wallet={wallet} />}

					<form onSubmit={formContext.handleSubmit(handleConfirmOrder)}>
						<Stack spacing={TSizes.margin_common}>
							<OrderTypeTab formContext={formContext} />
							<OrderDirection formContext={formContext} wallet={wallet} />

							<AvailableWithdraw balance={availableWithdraw} quote={quote} />

							<InputForm
								formContext={formContext}
								getInput={getInput}
								helper={helper}
								maxQty={maxQty}
								symbol={symbol}
								symbolsInfo={symbolsInfo}
								markPrice={markPrice}
							/>

							<Details
								totalPrice={totalPrice}
								estLeverage={estLeverage}
								baseDecimals={baseDecimals}
								quote={quote}
								symbol={symbol}
								formContext={formContext}
								estLiqPrice={estLiqPrice}
							/>
						</Stack>

						<ModalConfirmOrder
							open={openOrderConfirm}
							handleClose={() => setOpenOrderConfirm(false)}
							submitForm={submitForm}
							symbol={symbol}
							currentValue={formContext.getValues()}
							loading={loading}
							totalPrice={totalPrice}
						/>
					</form>
				</MainCard>
			)}
		</>
	);
};

interface IItemProps {
	value: ReactNode | string;
	label: ReactNode | string;
}

export const Item = ({ value, label }: IItemProps) => {
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

export const getInput = (data: Inputs, symbol: string): OrderEntity => {
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
		total: data.total,
	};
};

export async function getValidationErrors(
	data: Inputs,
	symbol: string,
	validator: ReturnType<typeof useOrderEntry>['helper']['validator'],
): Promise<ReturnType<ReturnType<typeof useOrderEntry>['helper']['validator']>> {
	return validator(getInput(data, symbol));
}
