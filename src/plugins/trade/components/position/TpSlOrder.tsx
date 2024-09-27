import { MainButton } from '@/components/button/MainButton';
import MainCard from '@/components/card/MainCard';
import CurrencyInputField from '@/components/form-control/CurrencyInputField';
import { RenderFormError } from '@/components/form-control/RenderErrors';
import { TokenInput } from '@/components/form-control/TokenInput';
import BaseSlider from '@/components/sider/BaseSlider';
import { getDecimalsFromTick } from '@/utils/formatters/api';
import { usdFormatter } from '@/utils/formatters/number';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useSymbolsInfo, useTPSLOrder } from '@orderly.network/hooks';
import { API } from '@orderly.network/types';
import { useNotifications } from '@web3-onboard/react';
import { FixedNumber } from 'ethers';
import { memo, useEffect, useState } from 'react';
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

	const [algoOrder, { setValue, submit, errors }] = useTPSLOrder(position);
	const [_0, customNotification] = useNotifications();

	const tp_trigger_price = formContext.watch('tp_trigger_price');

	useEffect(() => {
		if (tp_trigger_price == null) return;
		setValue('tp_trigger_price', tp_trigger_price);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tp_trigger_price]);

	const sl_trigger_price = formContext.watch('sl_trigger_price');

	useEffect(() => {
		if (sl_trigger_price == null) return;
		setValue('sl_trigger_price', sl_trigger_price);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sl_trigger_price]);

	const quantity = formContext.watch('quantity');

	useEffect(() => {
		if (quantity == null) return;
		setValue('quantity', quantity);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quantity]);

	const submitForm: SubmitHandler<TpSlOrderInputs> = async () => {
		setLoading(true);
		const { update } = customNotification({
			eventCode: 'createStopOrder',
			type: 'pending',
			message: 'Creating order...',
		});
		try {
			await submit();
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
			<MainCard backgroudColor="transparent" width="100%" variant="outlined">
				<Stack spacing={'6px'}>
					<CurrencyInputField
						formContext={formContext}
						name="tp_trigger_price"
						decimals={quoteDecimals}
						placeholder="0.0"
						label={`TP Trigger Price (${quote})`}
						hasError={errors?.tp_trigger_price != null}
						extErrors={errors?.tp_trigger_price}
						helperText={
							<Stack direction={'row'} justifyContent={'space-between'}>
								<Typography fontSize={'11px'} color={theme.palette.grey[500]}>
									Est. PnL:
								</Typography>
								<Typography fontSize={'12px'}>
									{algoOrder.tp_pnl != null ? `${usdFormatter.format(algoOrder.tp_pnl)} ${quote}` : '-'}
								</Typography>
							</Stack>
						}
					/>

					<CurrencyInputField
						formContext={formContext}
						name="tp_trigger_price"
						decimals={quoteDecimals}
						placeholder="0.0"
						label={`SL Trigger Price (${quote})`}
						hasError={errors?.sl_trigger_price != null}
						extErrors={errors?.sl_trigger_price}
						helperText={
							<Stack direction={'row'} justifyContent={'space-between'}>
								<Typography fontSize={'11px'} color={theme.palette.grey[500]}>
									Est. PnL:
								</Typography>
								<Typography fontSize={'12px'}>
									{algoOrder.sl_pnl != null ? `${usdFormatter.format(algoOrder.sl_pnl)} ${quote}` : '-'}
								</Typography>
							</Stack>
						}
					/>

					<MainCard variant="outlined" backgroudColor="transparent">
						<Controller
							name="quantity"
							control={formContext.control}
							render={({ field: { name, onBlur, onChange, value }, fieldState: { error } }) => (
								<Stack>
									<Typography fontSize={'12px'}>Quantity ({base})</Typography>

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
					</MainCard>
				</Stack>
			</MainCard>
			<Box pt="10px" />

			<MainButton
				type="submit"
				disabled={
					loading || !formContext.watch('tp_trigger_price')
						? true
						: false || errors?.tp_trigger_price
						? true
						: false || errors?.sl_trigger_price
						? true
						: false
				}
				isLoading={loading}
				variant="contained"
				fullWidth
			>
				Create TP & SL Order
			</MainButton>
		</form>
	);
};

export default memo(TpSlOrder);
