/* eslint-disable react-hooks/rules-of-hooks */
import { MainCard } from '@/components/card/MainCard';
import IconLoading from '@/components/icons/loading';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Stack, Typography, useTheme } from '@mui/material';
import { useOrderEntry, useSymbolsInfo, useWithdraw } from '@orderly.network/hooks';
import { OrderEntity, OrderSide, OrderType } from '@orderly.network/types';
import { useConnectWallet, useNotifications } from '@web3-onboard/react';
import { memo, ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { match } from 'ts-pattern';
import { Balance } from '../common/Balance';
import AmountSetOrderSide from './AmountSetOrderSide';
import Details from './Details';
import DividerOrder from './DividerOrder';
import InputForm from './InputForm';
import ModalConfirmOrder from './ModalConfirmOrder';
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
	const [openOrderConfirm, setOpenOrderConfirm] = useState(false);

	// Orderly Hooks
	const symbolsInfo = useSymbolsInfo();
	const [{ wallet }] = useConnectWallet();
	const { availableWithdraw } = useWithdraw();
	const [_0, customNotification] = useNotifications();
	const [_, base, quote] = symbol.split('_');

	const formContext = useForm<Inputs>({
		defaultValues,
		mode: 'all',
	});

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

	// Handle show modal confirm
	const handleShowModal = () => {
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
		}
	};

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

	return (
		<>
			{symbolsInfo.isNil ? (
				<IconLoading />
			) : (
				<MainCard backgroudColor="primary" width="100%" height="100%">
					{wallet && <Balance availableWithdraw={availableWithdraw} quote={quote} wallet={wallet} />}

					<form onSubmit={formContext.handleSubmit(handleShowModal)}>
						<Stack spacing={TSizes.margin_common}>
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

								<DividerOrder />
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

						<ModalConfirmOrder
							open={openOrderConfirm}
							handleClose={() => setOpenOrderConfirm(false)}
							submitForm={submitForm}
							symbol={symbol}
							currentValue={formContext.getValues()}
							loading={loading}
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
