import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import CurrencyInputField from "@/components/form-control/CurrencyInputField";
import { CustomTextField } from "@/components/form-control/TokenInput";
import IconLoading from "@/components/icons/loading";
import BaseSlider from "@/components/sider/BaseSlider";
import { TabItem } from "@/components/tab/MainTab";
import { getDecimalsFromTick } from "@/utils/formatters/api";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, InputAdornment, Stack, Typography, useTheme } from "@mui/material";
import { useOrderEntry, useSymbolsInfo } from "@orderly.network/hooks";
import { SelectOption } from "@orderly.network/react/esm/select/select";
import { API, OrderEntity, OrderSide, OrderType } from "@orderly.network/types";
import { useNotifications } from "@web3-onboard/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { match } from "ts-pattern";

type Inputs = {
	direction: OrderSide;
	quantity: string | number;
	price: string | number;
	type: "Market" | "Limit";
};

const items: SelectOption[] = [
	{ label: "Market", value: "Market" },
	{ label: "Limit", value: "Limit" },
];

interface IProps {
	symbol: string;
	position: API.PositionExt;
	refresh: import("swr/_internal").KeyedMutator<API.PositionInfo>;
	handleCloseModal: () => void;
}
const ClosePositionContent = ({ symbol, position, refresh, handleCloseModal }: IProps) => {
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState<any>("Market");
	const [isHiddenMarket, setIsHiddenMarket] = useState(true);

	const theme = useTheme();
	const symbolsInfo = useSymbolsInfo();

	const formContext = useForm<Inputs>({
		defaultValues: {
			direction: position.position_qty > 0 ? OrderSide.SELL : OrderSide.BUY,
			type: "Market",
			quantity: Math.abs(position.position_qty),
			price: position["notional"],
		},
		mode: "all",
	});

	const { onSubmit, helper } = useOrderEntry(
		{
			symbol,
			side: OrderSide.BUY,
			order_type: OrderType.MARKET,
			order_price: undefined,
		},
		{ watchOrderbook: true },
	);

	const [_0, customNotification] = useNotifications();
	const symbolInfo = symbolsInfo[symbol]();
	const [_, base] = symbol.split("_");
	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

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

	// On total Change
	const handleChange = (val: string | number, event?: React.MouseEvent<HTMLButtonElement>) => {
		setValue(val);
		formContext.setValue("type", val as any);
	};

	useEffect(() => {
		const { unsubscribe } = formContext.watch((value, { name, type }) => {
			if (name === "type") {
				if (value.type === "Market") {
					setIsHiddenMarket(true);
				} else {
					setIsHiddenMarket(false);
				}
			}
		});

		return () => unsubscribe();
	}, [formContext]);

	return (
		<>
			{symbolsInfo.isNil ? (
				<IconLoading />
			) : (
				<form onSubmit={formContext.handleSubmit(submitForm)}>
					<Typography pb={2}>Partially or fully close your open position at mark price.</Typography>

					<MainCard variant="outlined" backgroudColor={setColorThemeMode("white", "transparent")}>
						<Stack direction={"row"} pb={"10px"}>
							{items.map((item, index) => {
								const isActived = item.value === value;
								return (
									<TabItem
										actived={isActived}
										key={index}
										fullWidth
										onClick={(e) => handleChange(item.value, e)}>
										{item.label}
									</TabItem>
								);
							})}
						</Stack>

						{isHiddenMarket ? (
							<>
								<CustomTextField
									readOnly
									placeholder="Market"
									startAdornment={
										<InputAdornment position="start">
											<Typography
												fontWeight={600}
												fontSize="14px"
												color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[300])}>
												Price
											</Typography>
										</InputAdornment>
									}
									endAdornment={
										<InputAdornment position="end">
											<Typography
												px={"6px"}
												flexShrink={0}
												bgcolor={setColorThemeMode(
													theme.palette.primary.main,
													theme.palette.grey[800],
												)}
												fontWeight={600}
												borderRadius={"40px"}
												fontSize={"14px"}>
												{"USDC"}
											</Typography>
										</InputAdornment>
									}
								/>
								<Box pt="4px" />
							</>
						) : (
							<CurrencyInputField
								name="price"
								formContext={formContext}
								suffix={"USDC"}
								decimals={quoteDecimals}
								prefix={"Price"}
								rules={{
									validate: {
										custom: async (_, data) => {
											const errors = await getValidationErrors(data, symbol, helper.validator);
											return errors?.order_price != null ? errors.order_price.message : true;
										},
									},
								}}
							/>
						)}

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
		order_type: match(data.type)
			.with("Market", () => OrderType.MARKET)
			.with("Limit", () => OrderType.LIMIT)
			.exhaustive(),
		order_quantity: String(data.quantity),
		order_price: data.price,
		reduce_only: true,
	};
}
