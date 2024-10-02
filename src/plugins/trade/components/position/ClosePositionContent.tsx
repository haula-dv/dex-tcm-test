import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import CurrencyInputField from "@/components/form-control/CurrencyInputField";
import IconLoading from "@/components/icons/loading";
import BaseSlider from "@/components/sider/BaseSlider";
import { getDecimalsFromTick } from "@/utils/formatters/api";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Typography } from "@mui/material";
import { useOrderEntry, useSymbolsInfo } from "@orderly.network/hooks";
import { API, OrderEntity, OrderSide, OrderType } from "@orderly.network/types";
import { useNotifications } from "@web3-onboard/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
	direction: OrderSide;
	type: OrderType;
	quantity: string | number;
};

interface IProps {
	symbol: string;
	position: API.PositionExt;
	refresh: import("swr/_internal").KeyedMutator<API.PositionInfo>;
	handleCloseModal: () => void;
}
const ClosePositionContent = ({ symbol, position, refresh, handleCloseModal }: IProps) => {
	const [loading, setLoading] = useState(false);

	const symbolsInfo = useSymbolsInfo();

	const formContext = useForm<Inputs>({
		defaultValues: {
			direction: position.position_qty > 0 ? OrderSide.SELL : OrderSide.BUY,
			type: OrderType.MARKET,
			quantity: Math.abs(position.position_qty),
		},
		mode: "all",
	});

	const { onSubmit, helper } = useOrderEntry(
		{
			symbol,
			side: OrderSide.BUY,
			order_type: OrderType.MARKET,
		},
		{ watchOrderbook: true },
	);

	const [_0, customNotification] = useNotifications();
	const symbolInfo = symbolsInfo[symbol]();
	const [_, base] = symbol.split("_");
	const [baseDecimals] = getDecimalsFromTick(symbolInfo);

	const submitForm: SubmitHandler<Inputs> = async (data) => {
		setLoading(true);
		const { update } = customNotification({
			eventCode: "closePosition",
			type: "pending",
			message: "Closing position...",
		});
		try {
			await onSubmit(getInput(data, symbol));
			update({
				eventCode: "closePositionSuccess",
				type: "success",
				message: "Successfully closed position!",
				autoDismiss: 5_000,
			});
		} catch (err) {
			console.error(`Unhandled error in "submitForm":`, err);
			update({
				eventCode: "closePositionError",
				type: "error",
				message: `Closing position failed! ${err}`,
				autoDismiss: 5_000,
			});
		} finally {
			setLoading(false);
			refresh();
			handleCloseModal();
		}
	};

	// const newValue = helper.calculate(getInput(formContext.getValues(), symbol), 'order_quantity', 1);

	return (
		<>
			{symbolsInfo.isNil ? (
				<IconLoading />
			) : (
				<form onSubmit={formContext.handleSubmit(submitForm)}>
					<Typography pb={2}>Partially or fully close your open position at mark price.</Typography>

					<MainCard variant="outlined" backgroudColor={setColorThemeMode("white", "transparent")}>
						<CurrencyInputField
							name="quantity"
							formContext={formContext}
							decimals={baseDecimals}
							placeholder="0.0000"
							prefix={"Quantity"}
							suffix={base}
							rules={{
								validate: {
									custom: async (_, data) => {
										const errors = await getValidationErrors(data, symbol, helper.validator);
										return errors?.order_quantity != null ? errors.order_quantity.message : true;
									},
								},
							}}
						/>

						<BaseSlider
							min={0}
							max={Math.abs(position.position_qty)}
							handleChange={(newValue) =>
								formContext.setValue("quantity", newValue, {
									shouldValidate: true,
								})
							}
							amountQty={Number(formContext.watch("quantity")) ?? 0}
						/>
					</MainCard>
					<Box mt="10px" />

					<MainButton
						variant="contained"
						color="primary"
						fullWidth
						type="submit"
						disabled={loading}
						isLoading={loading}>
						Close position
					</MainButton>
				</form>
			)}
		</>
	);
};

export default ClosePositionContent;

async function getValidationErrors(
	data: Inputs,
	symbol: string,
	validator: ReturnType<typeof useOrderEntry>["helper"]["validator"],
): Promise<ReturnType<ReturnType<typeof useOrderEntry>["helper"]["validator"]>> {
	return validator(getInput(data, symbol));
}

function getInput(data: Inputs, symbol: string): OrderEntity {
	return {
		symbol,
		side: data.direction,
		order_type: data.type,
		order_quantity: String(data.quantity),
		reduce_only: true,
	};
}
