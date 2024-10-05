import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import { MainDialog } from "@/components/dialog/MainDialog";
import CurrencyInputField from "@/components/form-control/CurrencyInputField";
import { getDecimalsFromTick } from "@/utils/formatters/api";
import { getInputPlaceOrder, getValidationErrors, setColorThemeMode } from "@/utils/helpers";
import { Stack, Typography, useTheme } from "@mui/material";
import { useOrderEntry, useSymbolsInfo } from "@orderly.network/hooks";
import { toast } from "@orderly.network/react";
import { API, OrderEntity, OrderSide, OrderType } from "@orderly.network/types";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { match } from "ts-pattern";
import { IPlaceOrderValues } from "../create-order/CreateOrderForm";

interface IProps {
	open: boolean;
	onClose: () => void;
	orderActived:
		| { isAlgoOrder: false; order: API.Order }
		| { isAlgoOrder: true; order: API.AlgoOrder };
	updateOrder: (orderId: string, order: OrderEntity) => Promise<any>;
	updateAlgoOrder: (orderId: string, order: OrderEntity) => Promise<any>;
	submitting: boolean;
}

const convertedText = (text: any) => {
	return text.charAt(0) + text.slice(1).toLowerCase();
};

const UpdateOrderModal = ({
	onClose,
	open,
	orderActived,
	updateOrder,
	updateAlgoOrder,
	submitting,
}: IProps) => {
	const theme = useTheme();
	const [_, base, quote] = orderActived.order.symbol.split("_");
	const symbol = orderActived.order.symbol;
	const symbolsInfo = useSymbolsInfo();
	const symbolInfo = symbolsInfo[symbol]();
	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

	const [openConfirm, setOpenConfrim] = useState(false);

	const defaultValues: IPlaceOrderValues = {
		direction: convertedText(orderActived.order.side),
		type: convertedText(orderActived.order.type),
		quantity: orderActived.order.quantity as any,
		price: orderActived.order.price ? (orderActived.order.price as any) : undefined,
		triggerPrice: orderActived.order.trigger_price
			? (orderActived.order.trigger_price as any)
			: undefined,
	};

	const formContext = useForm({
		defaultValues,
		mode: "all",
	});

	const { onSubmit, helper } = useOrderEntry(
		{
			symbol,
			side: match(formContext.watch("direction", "Buy"))
				.with("Buy", () => OrderSide.BUY)
				.with("Sell", () => OrderSide.SELL)
				.exhaustive(),
			order_type: match(formContext.watch("type", "Market"))
				.with("Market", () => OrderType.MARKET)
				.with("Limit", () => OrderType.LIMIT)
				.with("StopLimit", () => OrderType.STOP_LIMIT)
				.with("StopMarket", () => OrderType.STOP_MARKET)
				.exhaustive(),
			order_quantity: formContext.watch("quantity", orderActived.order.quantity as any),
			order_price: formContext.watch("price", orderActived.order.price as any),
			trigger_price: formContext.watch("triggerPrice", orderActived.order.trigger_price as any),
		},
		{ watchOrderbook: true },
	);

	const handleUpdate = async () => {
		const data = formContext.getValues();
		try {
			if (orderActived.isAlgoOrder) {
				await updateAlgoOrder(
					String(orderActived.order.algo_order_id),
					getInputPlaceOrder(data, symbol),
				);
			} else {
				await updateOrder((orderActived.order as any).order_id as any, {
					...getInputPlaceOrder(data, symbol),
				});
			}

			toast.success("Order edited");
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
					<Stack spacing={"10px"}>
						{orderActived.isAlgoOrder ? (
							<>
								<CurrencyInputField
									name="triggerPrice"
									formContext={formContext}
									suffix={quote}
									prefix="Trigger price"
									decimals={quoteDecimals}
									placeholder="0.0000"
								/>

								{orderActived.order.type == "LIMIT" && (
									<CurrencyInputField
										name="price"
										formContext={formContext}
										suffix={quote}
										prefix="Price"
										placeholder="0.0000"
										decimals={quoteDecimals}
									/>
								)}
							</>
						) : (
							<CurrencyInputField
								name="price"
								formContext={formContext}
								suffix={quote}
								prefix="Price"
								placeholder="0.0000"
								decimals={quoteDecimals}
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

				<Stack direction={"row"} spacing={"10px"} pt="10px" justifyContent={"flex-end"}>
					<MainButton onClick={onClose}>Cancel</MainButton>

					<MainButton
						type="submit"
						variant="contained"
						disabled={!formContext.formState.isDirty || submitting}
						isLoading={submitting}>
						OK
					</MainButton>
				</Stack>
			</form>

			<MainDialog
				maxWidth="xs"
				open={openConfirm}
				title="Confirm Update"
				handleClose={() => setOpenConfrim(false)}
				isDivider>
				<Typography
					fontSize={"18px"}
					color={setColorThemeMode(theme.palette.grey[500], theme.palette.grey[300])}>
					You agree changing the price of ETH-PERP order to{" "}
					<span style={{ color: theme.palette.success.main }}>
						{orderActived.isAlgoOrder ? (
							<>
								Trigger Price {formContext.getValues("triggerPrice")} - Price{" "}
								{formContext.getValues("price")}
							</>
						) : (
							formContext.getValues("price")
						)}{" "}
						({quote}) - {formContext.getValues("quantity")} ({base}).
					</span>
				</Typography>

				<Stack direction={"row"} justifyContent={"flex-end"} pt="10px" spacing={"10px"}>
					<MainButton onClick={() => setOpenConfrim(false)}>Cancel</MainButton>

					<MainButton
						onClick={handleUpdate}
						variant="contained"
						disabled={submitting}
						isLoading={submitting}>
						Confirm
					</MainButton>
				</Stack>
			</MainDialog>
		</MainDialog>
	);
};

export default memo(UpdateOrderModal);
