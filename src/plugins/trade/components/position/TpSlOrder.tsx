import { MainButton } from '@/components/button/MainButton';
import MainCard from '@/components/card/MainCard';
import CurrencyInputField from '@/components/form-control/CurrencyInputField';
import { RenderFormError } from '@/components/form-control/RenderErrors';
import { TokenInput } from '@/components/form-control/TokenInput';
import BaseSlider from '@/components/sider/BaseSlider';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { getDecimalsFromTick } from '@/utils/formatters/api';
import { usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useSymbolsInfo, useTPSLOrder } from '@orderly.network/hooks';
import { API } from '@orderly.network/types';
import { useNotifications } from '@web3-onboard/react';
import { FixedNumber } from 'ethers';
import { memo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type TpSlOrderInputs = {
	tp_trigger_price?: string;
	sl_trigger_price?: string;
	quantity?: string | number;
};

interface IProps {
	symbol: string;
	position: API.PositionExt;
	refresh: import('swr/_internal').KeyedMutator<API.PositionInfo>;
	handleCloseModal: () => void;
}

const TpSlOrder = ({ symbol, position, refresh, handleCloseModal }: IProps) => {
	const [loading, setLoading] = useState(false);
	const theme = useTheme();
	const symbolsInfo = useSymbolsInfo();
	position.position_qty = Math.abs(position.position_qty);

	const formContext = useForm<TpSlOrderInputs>({
		defaultValues: {
			tp_trigger_price: undefined,
			sl_trigger_price: undefined,
			quantity: String(Math.abs(position.position_qty)),
		},
	});

	const [ComputedAlgoOrder, { setValue, submit, errors }] = useTPSLOrder(position);

	const [_0, customNotification] = useNotifications();

	const submitForm: SubmitHandler<TpSlOrderInputs> = async () => {
		setLoading(true);

		const { update } = customNotification({
			eventCode: 'createStopOrder',
			type: 'pending',
			message: 'Creating order...',
		});

		try {
			await submit();

			const childOrders = [{}];
			// updateTPSLOrder(orderId, childOrders);

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
				message: `Order creation failed! ${err}`,
				autoDismiss: 5_000,
			});
		} finally {
			setLoading(false);
			refresh();
			handleCloseModal();
		}
	};

	const symbolInfo = symbolsInfo[symbol]();
	const [_, base, quote] = symbol.split('_');
	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

	return (
		<form onSubmit={formContext.handleSubmit(submitForm)}>
			<MainCard variant="outlined" backgroudColor={setColorThemeMode('white', 'transparent')}>
				<Stack spacing={'6px'}>
					<Controller
						name="quantity"
						control={formContext.control}
						render={({ field: { name, onBlur, onChange, value }, fieldState: { error } }) => (
							<Stack>
								<Typography fontSize={'11px'} lineHeight={'11px'} pb="6px">
									Quantity
								</Typography>

								<TokenInput
									decimals={baseDecimals}
									placeholder={'0.0000'}
									name={name}
									value={value}
									onBlur={onBlur}
									onChange={onChange}
									suffix={base}
									hasError={errors?.quantity != null}
									onValueChange={(newVal) => {
										value = newVal.toString();
										setValue('quantity', value);
									}}
									min={FixedNumber.fromString('0')}
									max={FixedNumber.fromString(String(Math.abs(position.position_qty)))}
								/>

								<RenderFormError error={error?.message ?? ''} />
							</Stack>
						)}
					/>

					<BaseSlider
						min={0}
						max={position.position_qty}
						handleChange={(newValue) => formContext.setValue('quantity', newValue)}
						amountQty={Number(formContext.watch('quantity')) ?? 0}
					/>

					<Box pt="2px" />

					<Divider />

					<CurrencyInputField
						formContext={formContext}
						name="tp_trigger_price"
						decimals={quoteDecimals}
						placeholder="0.0"
						extErrors={errors?.tp_trigger_price}
						hasError={errors?.tp_trigger_price != null}
						onValueChange={(val) => setValue('tp_trigger_price', val._value)}
						label={
							<ItemRow
								title={<Typography fontSize={'11px'}>TP Price</Typography>}
								value={
									<Typography fontSize={'11px'}>
										<span style={{ color: setColorThemeMode(theme.palette.grey[800], theme.palette.grey[300]) }}>
											Est. PnL:
										</span>{' '}
										<span
											style={{
												color: ComputedAlgoOrder.tp_pnl?.toString().startsWith('-')
													? theme.palette.success.main
													: theme.palette.error.main,
											}}
										>
											{ComputedAlgoOrder.tp_pnl != null
												? `${usdFormatter.format(ComputedAlgoOrder.tp_pnl.toString().replace('-', '') as any)} ${quote}`
												: '-'}
										</span>
									</Typography>
								}
							/>
						}
					/>

					<CurrencyInputField
						formContext={formContext}
						name="sl_trigger_price"
						decimals={quoteDecimals}
						placeholder="0.0"
						extErrors={errors?.sl_trigger_price}
						hasError={errors?.sl_trigger_price != null}
						onValueChange={(val) => setValue('sl_trigger_price', val._value)}
						label={
							<ItemRow
								title={<Typography fontSize={'11px'}>SL Price</Typography>}
								value={
									<Typography fontSize={'11px'}>
										<span style={{ color: setColorThemeMode(theme.palette.grey[800], theme.palette.grey[300]) }}>
											Est. PnL:
										</span>{' '}
										<span
											style={{
												color: ComputedAlgoOrder.sl_pnl?.toString().startsWith('-')
													? theme.palette.success.main
													: theme.palette.error.main,
											}}
										>
											{ComputedAlgoOrder.sl_pnl != null
												? `${usdFormatter.format(ComputedAlgoOrder.sl_pnl.toString().replace('-', '') as any)} ${quote}`
												: '-'}
										</span>
									</Typography>
								}
							/>
						}
					/>
				</Stack>
			</MainCard>

			<Box pt="10px" />

			<MainButton type="submit" disabled={loading} isLoading={loading} variant="contained" fullWidth>
				Create TP & SL Order
			</MainButton>
		</form>
	);
};

export default memo(TpSlOrder);
