/* eslint-disable react-hooks/rules-of-hooks */
import { getDecimalsFromTick } from "@/utils/formatters/api";
import { getInputPlaceOrder } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Stack, Typography, useTheme } from "@mui/material";
import {
	useCollateral,
	useMarkPrice,
	useOrderEntry,
	useSymbolsInfo,
	useWithdraw,
} from "@orderly.network/hooks";
import { OrderSide, OrderType } from "@orderly.network/types";
import { useConnectWallet, useNotifications } from "@web3-onboard/react";
import { memo, ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { match } from "ts-pattern";
import Balance from "../common/Balance";
import { Accountleverage } from "./Accountleverage";
import AvailableWithdraw from "./AvailableWithdraw";
import Details from "./Details";
import InputForm from "./InputForm";
import ModalConfirmOrder from "./ModalConfirmOrder";
import OrderDirection from "./OrderDirection";
import OrderTypeTab from "./OrderTypeTab";

interface IProps {
	symbol: string;
}

export type IPlaceOrderValues = {
	direction: "Buy" | "Sell";
	type: "Market" | "Limit" | "StopLimit" | "StopMarket";
	triggerPrice?: string;
	price?: string;
	quantity?: string;
	orderSide?: string;
	total?: string;
};

const defaultValues: IPlaceOrderValues = {
	direction: "Buy",
	type: "Limit",
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
	const [_, base, quote] = symbol.split("_");
	const { data: markPrice } = useMarkPrice(symbol);

	const symbolInfo = symbolsInfo[symbol]();
	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

	const formContext = useForm<IPlaceOrderValues>({
		defaultValues,
		// mode: "all",
	});

	const { watch } = formContext;

	const { onSubmit, helper, maxQty, estLeverage, estLiqPrice } = useOrderEntry(
		{
			symbol,
			side: match(watch("direction", "Buy"))
				.with("Buy", () => OrderSide.BUY)
				.with("Sell", () => OrderSide.SELL)
				.exhaustive(),
			order_type: match(watch("type", "Market"))
				.with("Market", () => OrderType.MARKET)
				.with("Limit", () => OrderType.LIMIT)
				.with("StopLimit", () => OrderType.STOP_LIMIT)
				.with("StopMarket", () => OrderType.STOP_MARKET)
				.exhaustive(),
			order_quantity: watch("quantity", undefined),
			order_price: watch("price", undefined),
			total: watch("total", undefined),
		},
		{ watchOrderbook: true },
	);

	// Handle show modal confirm
	const handleConfirmOrder = () => {
		setOpenOrderConfirm(true);
	};

	// Submit form
	const submitForm = async () => {
		const data = formContext.getValues();
		setLoading(true);

		const { update } = customNotification({
			eventCode: "createOrder",
			type: "pending",
			message: "Creating order...",
		});

		if (data.type == "Market" || data.type == "StopMarket") {
			data.price = undefined;
		}

		try {
			await onSubmit(getInputPlaceOrder(data, symbol));
			update({
				eventCode: "createOrderSuccess",
				type: "success",
				message: "Order successfully created!",
				autoDismiss: 5_000,
			});
		} catch (err) {
			console.error(`Unhandled error in "submitForm":`, err);
			update({
				eventCode: "createOrderError",
				type: "error",
				message: "Order creation failed!",
				autoDismiss: 5_000,
			});
		} finally {
			setLoading(false);
			setOpenOrderConfirm(false);
		}
	};

	return (
		<>
			<Balance
				availableWithdraw={collateral.availableBalance}
				quote={quote}
				wallet={wallet}
				isFristLoading={symbolsInfo.isNil}
			/>

			<Accountleverage symbol={symbol} />

			<form onSubmit={formContext.handleSubmit(handleConfirmOrder)}>
				<Stack spacing={TSizes.margin_common}>
					<OrderDirection formContext={formContext} wallet={wallet} />

					<AvailableWithdraw balance={availableWithdraw} quote={quote} />

					<OrderTypeTab formContext={formContext} />

					<InputForm
						formContext={formContext}
						helper={helper}
						maxQty={maxQty}
						symbol={symbol}
						symbolsInfo={symbolsInfo}
						markPrice={markPrice}
						wallet={wallet}
					/>

					<Details
						estLeverage={estLeverage}
						quoteDecimals={quoteDecimals}
						quote={quote}
						symbol={symbol}
						direction={formContext.watch("direction")}
						estLiqPrice={estLiqPrice}
						openOrderConfirm={openOrderConfirm}
					/>
				</Stack>

				<ModalConfirmOrder
					open={openOrderConfirm}
					handleClose={() => setOpenOrderConfirm(false)}
					submitForm={submitForm}
					symbol={symbol}
					currentValue={formContext.getValues()}
					loading={loading}
					totalPrice={formContext.watch("total") ?? ""}
				/>
			</form>
		</>
	);
};

interface IItemProps {
	value: ReactNode | string;
	label: ReactNode | string;
}

export const Item = ({ value, label }: IItemProps) => {
	return (
		<Stack direction={"row"} justifyContent={"space-between"}>
			<Typography fontSize={"12px"} color={useTheme().palette.grey[600]}>
				{label}
			</Typography>

			<Typography fontSize={"14px"}>{value}</Typography>
		</Stack>
	);
};

export default memo(CreateOrderForm);
