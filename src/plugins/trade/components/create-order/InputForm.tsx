import AmountSlider from "@/components/form-control/AmountSlider";
import CurrencyInputField from "@/components/form-control/CurrencyInputField";
import { CustomTextField } from "@/components/form-control/TokenInput";
import { getDecimalsFromTick } from "@/utils/formatters/api";
import {
	converLocalStringToNum,
	getInputPlaceOrder,
	getValidationErrors,
	setColorThemeMode,
} from "@/utils/helpers";
import { Collapse, InputAdornment, Stack, Typography, useTheme } from "@mui/material";
import { OrderEntity } from "@orderly.network/types";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { match } from "ts-pattern";
import { IPlaceOrderValues } from "./CreateOrderForm";

interface IProps {
	formContext: UseFormReturn<IPlaceOrderValues>;
	symbolsInfo: any;
	symbol: string;
	helper: {
		calculate: (
			values: Partial<OrderEntity>,
			field: keyof OrderEntity,
			value: any,
		) => Partial<OrderEntity>;
		validator: (values: Partial<OrderEntity>) => any;
	};
	maxQty: number;
	markPrice: number;
}

function InputForm({ formContext, symbolsInfo, symbol, helper, maxQty, markPrice }: IProps) {
	const symbolInfo = symbolsInfo[symbol]();
	const [_, base, quote] = symbol.split("_");
	const theme = useTheme();

	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

	const formatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: baseDecimals });

	const [isHiddenMarket, setIsHiddenMarket] = useState(false);

	// Watch Direction
	useEffect(() => {
		const { unsubscribe } = formContext.watch((value, { name, type }) => {
			if (name === "type") {
				if (value.type === "Market" || value.type === "StopMarket") {
					setIsHiddenMarket(true);
				} else {
					setIsHiddenMarket(false);
				}
			}
		});

		return () => unsubscribe();
	}, [formContext]);

	// Handle Convert price USDC to Base
	const onChangePriceExt = (val: string) => {
		const newValue = converLocalStringToNum(val);
		const quantity = formContext.getValues("quantity");
		if (!quantity) {
			return;
		}

		const watchValue = helper.calculate(
			getInputPlaceOrder(formContext.getValues(), symbol),
			"order_price",
			Number(newValue),
		);

		if (!watchValue.total) {
			return;
		}

		formContext.setValue("total", !watchValue ? "" : String(watchValue.total));
	};

	// EX Base to USDC
	const onChangeQuanityExt = (val: any) => {
		const newValue = converLocalStringToNum(val);

		if (formContext.watch("type") === "Market" || formContext.watch("type") === "StopMarket") {
			const newWatchValue = helper.calculate(
				getInputPlaceOrder(formContext.getValues(), symbol),
				"order_quantity",
				newValue,
			);

			formContext.setValue("total", newWatchValue.total as any, {
				shouldValidate: true,
				shouldDirty: false,
			});
			return;
		}

		if (!formContext.watch("price")) {
			return;
		}

		const newWatchValue = helper.calculate(
			getInputPlaceOrder(formContext.getValues(), symbol),
			"order_quantity",
			newValue,
		);

		formContext.setValue("total", !newValue ? "" : (newWatchValue.total as any), {
			shouldValidate: true,
			shouldDirty: false,
		});
	};

	// On total Change
	const onTotalChange = (val: any) => {
		const newValue = converLocalStringToNum(val);

		const newWatchValue = helper.calculate(
			getInputPlaceOrder(formContext.getValues(), symbol),
			"total",
			newValue,
		);

		formContext.setValue("quantity", newWatchValue.order_quantity as any, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	return (
		<Stack spacing={"8px"}>
			<Collapse
				in={formContext.watch("type") === "StopLimit" || formContext.watch("type") === "StopMarket"}
				sx={{
					mt:
						formContext.watch("type") === "StopLimit" || formContext.watch("type") === "StopMarket"
							? "0px"
							: "-10px !important",
				}}>
				<CurrencyInputField
					name="triggerPrice"
					formContext={formContext}
					suffix={quote}
					prefix="Trigger"
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
			</Collapse>

			<Stack spacing={"10px"}>
				{isHiddenMarket ? (
					<CustomTextField
						readOnly
						placeholder="Market"
						value={"Market"}
						startAdornment={
							<InputAdornment position="start">
								<Typography
									fontWeight={600}
									fontSize="12px"
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
									bgcolor={setColorThemeMode(theme.palette.primary.main, theme.palette.grey[800])}
									fontWeight={600}
									borderRadius={"40px"}
									fontSize={"12px"}>
									{quote}
								</Typography>
							</InputAdornment>
						}
					/>
				) : (
					<CurrencyInputField
						name="price"
						formContext={formContext}
						suffix={quote}
						decimals={quoteDecimals}
						prefix={"Price"}
						placeholder={match(formContext.watch("type"))
							.with("Market", () => "Market")
							.with("StopMarket", () => "Market")
							.otherwise(() => "0.0000")}
						readOnly={match(formContext.watch("type"))
							.with("Market", () => true)
							.with("StopMarket", () => true)
							.otherwise(() => false)}
						rules={{
							validate: {
								custom: async (_, data) => {
									const errors = await getValidationErrors(data, symbol, helper.validator);
									return errors?.order_price != null ? errors.order_price.message : true;
								},
							},
						}}
						onValueChange={(val) => onChangePriceExt(val)}
					/>
				)}

				<CurrencyInputField
					name="quantity"
					formContext={formContext}
					suffix={base}
					decimals={baseDecimals}
					placeholder="0.0000"
					prefix={"Quantity"}
					onValueChange={(val) => onChangeQuanityExt(val)}
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

			<AmountSlider
				name="orderSide"
				formContext={formContext}
				max={maxQty}
				maxQty={`${formatter.format(maxQty)}`}
				extChange={(val) => onChangeQuanityExt(val)}
			/>

			<CurrencyInputField
				name="total"
				formContext={formContext}
				suffix={quote}
				decimals={quoteDecimals}
				prefix={"Total~"}
				placeholder="0.0000"
				onValueChange={(val) => onTotalChange(val)}
				rules={{
					validate: {
						custom: async (_, data) => {
							const errors = await getValidationErrors(data, symbol, helper.validator);
							return errors?.total != null ? errors.total.message : true;
						},
					},
				}}
			/>
		</Stack>
	);
}

export default InputForm;
