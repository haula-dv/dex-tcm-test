import { converLocalStringToNum } from "@/utils/helpers";
import { Box, Slider, Stack, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { match } from "ts-pattern";

const marks = [
	{
		value: 0,
	},
	{
		value: 25,
	},
	{
		value: 50,
	},
	{
		value: 75,
	},
	{
		value: 100,
	},
];

interface IProps<V extends FieldValues> {
	formContext: UseFormReturn<V>;
	name: Path<V>;
	max?: number;
	maxQty?: string;
	extChange?: (val: any) => void;
}

const AmountSlider = <V extends FieldValues>({
	name,
	max = 0,
	formContext,
	maxQty,
	extChange,
}: IProps<V>) => {
	const theme = useTheme();

	// Watch quantity
	useEffect(() => {
		const watch = formContext.watch((value, { name }) => {
			if (name === "quantity") {
				const qty = Number(converLocalStringToNum(value.quantity));
				const maxQty = Number(max);
				if (maxQty <= 0 && qty <= 0) {
					return;
				}

				const percentage = (qty / maxQty) * 100;
				formContext.setValue(
					"orderSide" as any,
					percentage >= 100 ? 100 : (parseFloat(percentage.toFixed(0)) as any),
				);
			}
		});

		return () => watch.unsubscribe();
	}, [formContext, max]);

	return (
		<Controller
			name={name}
			control={formContext.control}
			render={({ field: { value = 0, onChange } }) => (
				<>
					<Box px="4px" mt="-4px !important">
						<MainSlider
							name={name}
							marks={marks}
							size="small"
							getAriaValueText={(value) => `${value}%`}
							valueLabelFormat={(value) => `${value}%`}
							value={Number(value).toFixed(0) as any}
							valueLabelDisplay="auto"
							onChange={(event, newValue: any) => {
								onChange(Number(newValue).toFixed(0));

								if (newValue === 0) {
									formContext.setValue("quantity" as any, 0 as any, {
										shouldValidate: false,
									});

									return;
								}

								const caculatedAmount = (max * newValue) / 100;
								const truncatedAmount = Math.floor(caculatedAmount * 10000) / 10000;
								if (caculatedAmount >= 100) {
									formContext.setValue("quantity" as any, max as any, {
										shouldValidate: true,
									});
									return;
								}

								formContext.setValue("quantity" as any, truncatedAmount as any, {
									shouldValidate: true,
								});

								extChange && extChange(truncatedAmount);
							}}
						/>
					</Box>

					<Stack direction={"row"} justifyContent={"space-between"} mt="-6px !important">
						<Typography fontSize={"12px"} color={theme.palette.success.main}>
							{value}%
						</Typography>

						<Stack direction={"row"} justifyContent={"space-between"} spacing={"2px"}>
							<Typography fontSize={"12px"} color={theme.palette.grey[300]}>
								Max{" "}
								{match(formContext.watch("direction" as any) as any)
									.with("Buy" as any, () => "Buy")
									.otherwise(() => "Sell")}
							</Typography>
							<Typography
								fontSize={"12px"}
								color={match(formContext.watch("direction" as any) as any)
									.with("Buy", () => theme.palette.success.main)
									.otherwise(() => theme.palette.error.main)}>
								{" "}
								{maxQty}
							</Typography>
						</Stack>
					</Stack>
				</>
			)}
		/>
	);
};

export default AmountSlider;

export const MainSlider = styled(Slider)(({ theme }) => ({
	"& span": {
		color: theme.palette.success.main,
	},

	"& .MuiSlider-rail": {
		color: theme.palette.grey[900],
		height: "2px",
	},

	"& .MuiSlider-markActive": {
		backgroundColor: `${theme.palette.success.main} !important`,
		border: `2px solid ${theme.palette.success.main} !important`,
		opacity: "1",
	},

	"&  .MuiSlider-mark": {
		height: "6px",
		width: "6px",
		borderRadius: "50%",
		border: `2px solid ${theme.palette.grey[900]}`,
		backgroundColor: theme.palette.grey[900],
	},

	"& .MuiSlider-track": {
		height: "2px",
		color: theme.palette.success.main,
	},

	"& .MuiSlider-thumb": {
		backgroundColor: theme.palette.success.main,
	},

	"& .MuiSlider-valueLabel": {
		lineHeight: "0.6rem",
		backgroundColor: theme.palette.success.main,
		"& .MuiSlider-valueLabelLabel": {
			fontSize: "10px",
			color: "#000 !important",
		},
	},
}));
