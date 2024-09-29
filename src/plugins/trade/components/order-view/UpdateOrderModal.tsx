import { MainButton } from '@/components/button/MainButton';
import MainCard from '@/components/card/MainCard';
import { MainDialog } from '@/components/dialog/MainDialog';
import CurrencyInputField from '@/components/form-control/CurrencyInputField';
import { getDecimalsFromTick } from '@/utils/formatters/api';
import { setColorThemeMode } from '@/utils/helpers';
import { Stack, Typography, useTheme } from '@mui/material';
import { useOrderEntry, useSymbolsInfo } from '@orderly.network/hooks';
import { toast } from '@orderly.network/react';
import { API, OrderEntity, OrderSide, OrderType } from '@orderly.network/types';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getInput, getValidationErrors, Inputs } from '../create-order/CreateOrderForm';

interface IProps {
	open: boolean;
	onClose: () => void;
	orderActived: { isAlgoOrder: false; order: API.Order } | { isAlgoOrder: true; order: API.AlgoOrder };
	updateOrder: (orderId: string, order: OrderEntity) => Promise<any>;
	updateAlgoOrder: (orderId: string, order: OrderEntity) => Promise<any>;
	submitting: boolean;
}

const convertedText = (text: any) => {
	return text.charAt(0) + text.slice(1).toLowerCase();
};

const UpdateOrderModal = ({ onClose, open, orderActived, updateOrder, updateAlgoOrder, submitting }: IProps) => {
	const theme = useTheme();
	const [_, base, quote] = orderActived.order.symbol.split('_');
	const symbol = orderActived.order.symbol;
	const symbolsInfo = useSymbolsInfo();
	const symbolInfo = symbolsInfo[symbol]();
	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

	const [openConfirm, setOpenConfrim] = useState(false);

	const defaultValues: Inputs = {
		direction: convertedText(orderActived.order.side),
		type: convertedText(orderActived.order.type),
		quantity: orderActived.order.quantity as any,
		price: orderActived.order.price ? String(orderActived.order.price) : undefined,
		triggerPrice: orderActived.order.trigger_price ? String(orderActived.order.trigger_price) : undefined,
	};

	const formContext = useForm({
		defaultValues,
		mode: 'all',
	});

	const { onSubmit, helper } = useOrderEntry(
		{
			symbol,
			side: orderActived.order.side as OrderSide,
			order_type: orderActived.order.type as OrderType,
			order_quantity: formContext.watch('quantity', undefined),
			order_price: formContext.watch('price', undefined),
			trigger_price: formContext.watch('triggerPrice', undefined),
		},
		{ watchOrderbook: true },
	);

	const handleUpdate = async () => {
		const data = formContext.getValues();
		try {
			if (orderActived.isAlgoOrder) {
				await updateAlgoOrder(String(orderActived.order.algo_order_id), getInput(data, symbol));
			} else {
				await updateOrder((orderActived.order as any).order_id as any, {
					...getInput(data, symbol),
					reduce_only: true,
				});
			}

			toast.success('Order edited');
		} catch (err: any) {
			toast.error(err.message);
		} finally {
			setOpenConfrim(false);
			onClose();
		}
	};

	return (
		<MainDialog maxWidth="xs" open={open} handleClose={onClose} title="Update Order" isDivider>
			<form onSubmit={formContext.handleSubmit(() => setOpenConfrim(true))}>
				<MainCard backgroudColor="transparent" variant="outlined">
					<Stack spacing={'10px'}>
						{orderActived.isAlgoOrder ? (
							<CurrencyInputField
								name="triggerPrice"
								formContext={formContext}
								suffix={quote}
								prefix="Trigger price"
								decimals={quoteDecimals}
								placeholder="0.0000"
								rules={{
									validate: {
										custom: async (_, data) => {
											const errors = await getValidationErrors(data, symbol, helper.validator);
											return errors?.trigger_price != null ? errors.trigger_price.message : true;
										},
									},
								}}
							/>
						) : (
							<CurrencyInputField
								name="price"
								formContext={formContext}
								suffix={quote}
								prefix="Price"
								placeholder="0.0000"
								decimals={quoteDecimals}
								rules={{
									validate: {
										custom: async (_, data) => {
											const errors = await getValidationErrors(data, symbol, helper.validator);
											console.log(errors);
											return errors?.order_price != null ? errors.order_price.message : true;
										},
									},
								}}
							/>
						)}

						<CurrencyInputField
							name="quantity"
							formContext={formContext}
							suffix={base}
							decimals={baseDecimals}
							placeholder="0.0000"
							prefix="Quantity"
							rules={{
								validate: {
									custom: async (_, data) => {
										const errors = await getValidationErrors(data, symbol, helper.validator);
										return errors?.order_quantity != null ? errors.order_quantity.message : true;
									},
								},
							}}
						/>
					</Stack>
				</MainCard>

				<Stack direction={'row'} spacing={'10px'} pt="10px" justifyContent={'flex-end'}>
					<MainButton onClick={onClose}>Cancel</MainButton>

					<MainButton
						type="submit"
						variant="contained"
						disabled={!formContext.formState.isDirty || submitting}
						isLoading={submitting}
					>
						OK
					</MainButton>
				</Stack>
			</form>

			<MainDialog
				maxWidth="xs"
				open={openConfirm}
				title="Confirm Update"
				handleClose={() => setOpenConfrim(false)}
				isDivider
			>
				<Typography fontSize={'18px'} color={setColorThemeMode(theme.palette.grey[500], theme.palette.grey[300])}>
					You agree changing the price of ETH-PERP order to{' '}
					<span style={{ color: theme.palette.success.main }}>
						{orderActived.isAlgoOrder ? formContext.getValues('triggerPrice') : formContext.getValues('price')} ({quote}
						) - {formContext.getValues('quantity')} ({base}).
					</span>
				</Typography>

				<Stack direction={'row'} justifyContent={'flex-end'} pt="10px" spacing={'10px'}>
					<MainButton onClick={() => setOpenConfrim(false)}>Cancel</MainButton>

					<MainButton onClick={handleUpdate} variant="contained" disabled={submitting} isLoading={submitting}>
						Confirm
					</MainButton>
				</Stack>
			</MainDialog>
		</MainDialog>
	);
};

export default memo(UpdateOrderModal);
