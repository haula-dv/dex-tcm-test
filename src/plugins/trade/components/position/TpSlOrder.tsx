import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import CurrencyInputField from "@/components/form-control/CurrencyInputField";
import BaseSlider from "@/components/sider/BaseSlider";
import { ItemRow } from "@/plugins/pool/components/TokenSelected";
import { getDecimalsFromTick } from "@/utils/formatters/api";
import { usdFormatter } from "@/utils/formatters/number";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useOrderStream, useSymbolsInfo, useTPSLOrder } from "@orderly.network/hooks";
import { API } from "@orderly.network/types";
import { useNotifications } from "@web3-onboard/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type TpSlOrderInputs = {
	tp_trigger_price?: string;
	sl_trigger_price?: string;
	quantity?: string | number;
};

interface IProps {
	symbol: string;
	position: API.PositionExt;
	refresh: import("swr/_internal").KeyedMutator<API.PositionInfo>;
	handleCloseModal: () => void;
	stopLoss: any | null;
	takeProfit: any | null;
}

const TpSlOrder = ({
	symbol,
	position,
	refresh,
	handleCloseModal,
	stopLoss,
	takeProfit,
}: IProps) => {
	const [loading, setLoading] = useState(false);
	const theme = useTheme();
	const symbolsInfo = useSymbolsInfo();

	const formContext = useForm<TpSlOrderInputs>({
		defaultValues: {
			tp_trigger_price: takeProfit?.trigger_price ?? undefined,
			sl_trigger_price: stopLoss?.trigger_price ?? undefined,
			quantity: Math.abs(position.position_qty),
		},
		mode: "all",
	});

	const [ComputedAlgoOrder, { setValue, submit, errors }] = useTPSLOrder({
		...position,
		symbol,
	});

	const [_1, { updateTPSLOrder }] = useOrderStream({});
	const [_0, customNotification] = useNotifications();

	const submitForm: SubmitHandler<TpSlOrderInputs> = async () => {
		setLoading(true);

		const { update } = customNotification({
			eventCode: "createStopOrder",
			type: "pending",
			message: "Creating order...",
		});

		try {
			if (takeProfit?.trigger_price || stopLoss?.trigger_price) {
				updateTPSLOrder;
			} else {
				await submit();
			}

			update({
				eventCode: "createStopOrderSuccess",
				type: "success",
				message: "Order successfully created!",
				autoDismiss: 5_000,
			});
		} catch (err) {
			console.error(`Unhandled error in "submitForm":`, err);
			update({
				eventCode: "createStopOrderError",
				type: "error",
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
	const [_, base, quote] = symbol.split("_");
	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

	useEffect(() => {
		setValue("size", "BUY");
	}, []);

	return (
		<form onSubmit={formContext.handleSubmit(submitForm)}>
			<MainCard variant="outlined" backgroudColor={setColorThemeMode("white", "transparent")}>
				<Stack spacing={"6px"}>
					<CurrencyInputField
						name="quantity"
						formContext={formContext}
						decimals={baseDecimals}
						suffix={base}
						prefix={"Quantity"}
						placeholder="0.0"
						onValueChange={(newVal) => {
							setValue("quantity", String(newVal));
						}}
						rules={{
							validate: {
								custom: async (_, data) => {
									return errors?.quantity != null ? errors.quantity.message : true;
								},
							},
						}}
					/>

					<BaseSlider
						min={0}
						max={Math.abs(position.position_qty)}
						handleChange={(newValue) => {
							setValue("quantity", newValue.toString()),
								formContext.setValue("quantity", newValue.toString());
						}}
						amountQty={Number(formContext.watch("quantity")) ?? 0}
					/>

					<Box pt="2px" />

					<Divider />

					<CurrencyInputField
						formContext={formContext}
						name="tp_trigger_price"
						decimals={quoteDecimals}
						placeholder="0.0"
						prefix={"TP price"}
						suffix={quote}
						onValueChange={(val) => setValue("tp_trigger_price", String(val))}
						rules={{
							validate: {
								custom: (_, data) => {
									return errors?.tp_trigger_price != null ? errors?.tp_trigger_price.message : true;
								},
							},
						}}
						label={
							<ItemRow
								title={<Typography fontSize={"11px"}>Take profit</Typography>}
								value={
									<Typography fontSize={"11px"}>
										<span
											style={{
												color: setColorThemeMode(theme.palette.grey[800], theme.palette.grey[300]),
											}}>
											Est. PnL:
										</span>{" "}
										<span
											style={{
												color: ComputedAlgoOrder.tp_pnl?.toString().startsWith("-")
													? theme.palette.error.main
													: theme.palette.success.main,
											}}>
											{formContext.watch("tp_trigger_price")
												? ComputedAlgoOrder.tp_pnl != null
													? `${usdFormatter.format(ComputedAlgoOrder.tp_pnl)} ${quote}`
													: "-"
												: "-"}
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
						prefix={"SL price"}
						suffix={quote}
						placeholder="0.0"
						onValueChange={(val) => setValue("sl_trigger_price", String(val))}
						rules={{
							validate: {
								custom: (_, data) => {
									return errors?.sl_trigger_price != null ? errors?.sl_trigger_price.message : true;
								},
							},
						}}
						label={
							<ItemRow
								title={<Typography fontSize={"11px"}>Stop loss</Typography>}
								value={
									<Typography fontSize={"11px"}>
										<span
											style={{
												color: setColorThemeMode(theme.palette.grey[800], theme.palette.grey[300]),
											}}>
											Est. PnL:
										</span>{" "}
										<span
											style={{
												color: ComputedAlgoOrder.sl_pnl?.toString().startsWith("-")
													? theme.palette.error.main
													: theme.palette.success.main,
											}}>
											{formContext.watch("sl_trigger_price")
												? ComputedAlgoOrder.sl_pnl != null
													? `${usdFormatter.format(ComputedAlgoOrder.sl_pnl)} ${quote}`
													: "-"
												: "--"}
										</span>
									</Typography>
								}
							/>
						}
					/>
				</Stack>
			</MainCard>

			<Box pt="10px" />

			<MainButton
				type="submit"
				disabled={loading || !formContext.formState.isDirty}
				isLoading={loading}
				variant="contained"
				fullWidth>
				Create TP & SL Order
			</MainButton>
		</form>
	);
};

export default TpSlOrder;
