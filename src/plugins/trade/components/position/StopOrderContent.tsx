import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import CurrencyInputField from '@/components/form-control/CurrencyInputField';
import { RenderFormError } from '@/components/form-control/RenderErrors';
import { TokenInput } from '@/components/form-control/TokenInput';
import { CustomSlider } from '@/components/sider/MainSlider';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { getDecimalsFromTick } from '@/utils/formatters/api';
import { usdFormatter } from '@/utils/formatters/number';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack, Typography } from '@mui/material';
import { useOrderEntry, useSymbolsInfo } from '@orderly.network/hooks';
import { positions } from '@orderly.network/perp';
import { API, OrderEntity, OrderSide, OrderType } from '@orderly.network/types';
import { useNotifications } from '@web3-onboard/react';
import { FixedNumber } from 'ethers';
import { memo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { P, match } from 'ts-pattern';
import StopOrderDirection from './StopOrderDirection';

export type StopOrderInputs = {
	direction: 'TakeProfit' | 'StopLoss';
	type: OrderType;
	trigger_price?: string;
	quantity?: string | number;
};

interface IProps {
	symbol: string;
	position: API.PositionExt;
	refresh: import('swr/_internal').KeyedMutator<API.PositionInfo>;
	handleCloseModal: () => void;
}

const StopOrder = ({ symbol, position, refresh, handleCloseModal }: IProps) => {
	const [loading, setLoading] = useState(false);

	const symbolsInfo = useSymbolsInfo();
	position.position_qty = Math.abs(position.position_qty);
	const formContext = useForm<StopOrderInputs>({
		defaultValues: {
			direction: 'TakeProfit',
			type: OrderType.STOP_MARKET,
			trigger_price: undefined,
			quantity: position.position_qty,
		},
	});
	const { onSubmit, helper } = useOrderEntry(
		{
			symbol,
			side: OrderSide.BUY,
			order_type: OrderType.STOP_MARKET,
		},
		{ watchOrderbook: true },
	);
	const [_0, customNotification] = useNotifications();

	const submitForm: SubmitHandler<StopOrderInputs> = async (data) => {
		setLoading(true);
		const { update } = customNotification({
			eventCode: 'createStopOrder',
			type: 'pending',
			message: 'Creating order...',
		});
		try {
			console.log('getInput(data, position)', getInput(data, position));
			await onSubmit(getInput(data, position));
			update({
				eventCode: 'createStopOrderSuccess',
				type: 'success',
				message: 'Order successfully created!',
				autoDismiss: 5_000,
			});
		} catch (err) {
			console.error(`Unhandled error in "submitForm":`, err);
			update({
				eventCode: 'createStopOrderError',
				type: 'error',
				message: 'Order creation failed!',
				autoDismiss: 5_000,
			});
		} finally {
			setLoading(false);
			refresh();
			handleCloseModal();
		}
	};

	const estimatedPnl = positions.unrealizedPnL({
		qty: Number(formContext.watch('quantity') ?? 0),
		openPrice: position.average_open_price,
		markPrice: Number(formContext.watch('trigger_price') ?? 0),
	});

	const symbolInfo = symbolsInfo[symbol]();
	const [_, base, quote] = symbol.split('_');
	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

	return (
		<div>
			{symbolsInfo.isNil ? (
				''
			) : (
				<form onSubmit={formContext.handleSubmit(submitForm)}>
					<Typography>
						Create an algorithmic order to (partially) close a position when a specific mark price is reached.
					</Typography>

					<StopOrderDirection formContext={formContext} />
					<Box mt="10px" />

					<MainCard backgroudColor="transparent" width="100%" variant="outlined">
						<Stack spacing={TSizes.margin_common}>
							<CurrencyInputField
								name="trigger_price"
								formContext={formContext}
								decimals={quoteDecimals}
								suffix={quote}
								rules={{
									validate: {
										min: (_, data) => {
											const isLong = position.position_qty > 0;
											if (data.trigger_price == null) return true;
											const triggerPrice = Number(data.trigger_price);
											return match([isLong, data.direction])
												.with(P.union([true, 'TakeProfit'], [false, 'StopLoss']), () =>
													triggerPrice > position.mark_price
														? true
														: 'Minimum trigger price should be greater than mark price',
												)
												.otherwise(() => true);
										},
										max: (_, data) => {
											const isLong = position.position_qty > 0;
											if (data.trigger_price == null) return true;
											const triggerPrice = Number(data.trigger_price);
											return match([isLong, data.direction])
												.with(P.union([false, 'TakeProfit'], [true, 'StopLoss']), () =>
													triggerPrice < position.mark_price
														? true
														: 'Maximum trigger price should be less than mark price',
												)
												.otherwise(() => true);
										},
										custom: async (_, data) => {
											const errors = await getValidationErrors(data, position, helper.validator);
											return errors?.trigger_price != null ? errors.trigger_price.message : true;
										},
									},
								}}
							/>

							<Controller
								name="quantity"
								control={formContext.control}
								rules={{
									validate: {
										custom: async (_, data) => {
											const errors = await getValidationErrors(data, position, helper.validator);
											return errors?.order_quantity != null ? errors.order_quantity.message : true;
										},
									},
								}}
								render={({ field: { name, onBlur, onChange, value }, fieldState: { error } }) => (
									<Stack>
										<TokenInput
											decimals={baseDecimals}
											placeholder={'0.0000'}
											name={name}
											value={value}
											onBlur={onBlur}
											onChange={onChange}
											suffix={base}
											hasError={error != null}
											onValueChange={(newVal) => {
												value = newVal.toString();
											}}
											min={FixedNumber.fromString('0')}
											max={FixedNumber.fromString(String(position.position_qty))}
										/>

										<CustomSlider
											name={name}
											value={[Number(value)]}
											defaultValue={[100]}
											onChange={(event, newValue: any) => {
												onChange(newValue[0] as any);
											}}
											min={0}
											max={position.position_qty}
											step={symbolInfo.base_tick}
											size="small"
											aria-label="Small"
											valueLabelDisplay="auto"
										/>
										<Typography textAlign={'center'}>
											{value} {base}
										</Typography>

										<RenderFormError error={error?.message ?? ''} />
									</Stack>
								)}
							/>
						</Stack>
					</MainCard>
					<Box mt="10px" />
					<ItemRow
						title="Est. PnL:"
						value={
							formContext.watch('quantity') && formContext.watch('trigger_price')
								? `${usdFormatter.format(estimatedPnl)} ${quote}`
								: '-'
						}
					/>
					<Box mt="10px" />

					<MainButton
						variant="contained"
						color="primary"
						fullWidth
						type="submit"
						disabled={loading}
						isLoading={loading}
					>
						{match(formContext.watch('direction'))
							.with('TakeProfit', () => 'Take Profit')
							.with('StopLoss', () => 'Stop Loss')
							.exhaustive()}
					</MainButton>
				</form>
			)}
		</div>
	);
};

export default memo(StopOrder);

async function getValidationErrors(
	data: StopOrderInputs,
	position: API.PositionExt,
	validator: ReturnType<typeof useOrderEntry>['helper']['validator'],
): Promise<ReturnType<ReturnType<typeof useOrderEntry>['helper']['validator']>> {
	return validator(getInput(data, position));
}

function getInput(data: StopOrderInputs, position: API.PositionExt): OrderEntity {
	const isLong = position.position_qty > 0;
	return {
		symbol: position.symbol,
		isStopOrder: true,
		order_quantity: data.quantity,
		trigger_price: data.trigger_price,
		side: isLong ? OrderSide.SELL : OrderSide.BUY,
		order_type: OrderType.STOP_MARKET,
	};
}
