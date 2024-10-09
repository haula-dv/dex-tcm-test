"use client";
import {
	filterAllowedCharacters,
	getFormattedNumber,
	getNumberAsUInt128,
} from "@/utils/formatters/number";
import { converLocalStringToNum, converNumToLocalString, setColorThemeMode } from "@/utils/helpers";
import { Box, FormControl, InputAdornment, Stack, Typography, useTheme } from "@mui/material";
import { FixedNumber } from "ethers";
import { ReactNode } from "react";
import { Controller, FieldValues, Path, RegisterOptions, UseFormReturn } from "react-hook-form";
import { RenderFormError } from "./RenderErrors";
import { CustomTextField } from "./TokenInput";

interface InputFieldProps<V extends FieldValues> {
	formContext: UseFormReturn<V>;
	name: Path<V>;
	decimals: number;
	suffix?: React.ReactNode;
	prefix?: React.ReactNode;
	min?: FixedNumber;
	max?: FixedNumber;
	placeholder?: string;
	rules?:
		| Omit<RegisterOptions<V, Path<V>>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">
		| undefined;
	hint?: string;
	onValueChange?: (value: string) => void | Promise<void>;
	label?: string | ReactNode;
	helperText?: ReactNode;
	hasError?: any;
	extErrors?: any;
	readOnly?: boolean;
}

const CurrencyInputField = <V extends FieldValues>({
	name,
	formContext,
	decimals,
	placeholder,
	suffix,
	prefix,
	rules,
	min,
	max,
	onValueChange,
	label,
	hasError,
	helperText,
	extErrors,
	readOnly,
}: InputFieldProps<V>) => {
	const theme = useTheme();

	const handleOnChange = (event: any, value: string, onChange: any) => {
		let newValue = converLocalStringToNum(filterAllowedCharacters(event.target.value || ""));

		if (converLocalStringToNum(value) !== newValue) {
			const quantity = getFormattedNumber(newValue, decimals);
			const [res] = getNumberAsUInt128(quantity, decimals);
			let fixedNumber = FixedNumber.fromValue(res, decimals).toFormat(decimals);

			if (min && fixedNumber.lt(min)) {
				fixedNumber = min;
				newValue = fixedNumber.toString();
			}

			if (max && fixedNumber.gt(max)) {
				fixedNumber = max;
				newValue = fixedNumber.toString();
			}

			const [first, last] = newValue.split(".");

			// Kiểm tra số lượng phần thập phân
			if (last && last.length >= 3) {
				onChange(fixedNumber.toString());
				return;
			}

			onChange(newValue);

			if (onValueChange) {
				onValueChange(newValue);
			}
		}
	};

	return (
		<Stack width={"100%"}>
			{typeof label == "string" ? <Typography fontSize={"12px"}>{label}</Typography> : label}

			<FormControl fullWidth>
				<Controller
					name={name}
					control={formContext.control}
					rules={rules}
					render={({ field: { name, value = "", onBlur, onChange }, fieldState: { error } }) => {
						const numFormat = converNumToLocalString(value);

						return (
							<>
								<CustomTextField
									id={`outlined-adornment-${suffix}`}
									value={numFormat}
									readOnly={readOnly}
									name={name}
									placeholder={placeholder ?? "0.0"}
									onChange={(event) => handleOnChange(event, numFormat, onChange)}
									onBlur={(event) => handleOnChange(event, numFormat, onChange)}
									startAdornment={
										<InputAdornment position="start">
											<Typography
												fontWeight={600}
												fontSize="12px"
												color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[100])}>
												{prefix ? prefix : name}
											</Typography>
										</InputAdornment>
									}
									endAdornment={
										<InputAdornment position="end">
											<Typography
												px={"6px"}
												bgcolor={setColorThemeMode(
													theme.palette.primary.main,
													theme.palette.grey[800],
												)}
												fontWeight={600}
												borderRadius={"8px"}
												fontSize={"11px"}>
												{suffix}
											</Typography>
										</InputAdornment>
									}
									aria-describedby="outlined-weight-helper-text"
									inputProps={{
										"aria-label": "weight",
									}}
									autoComplete="off"
									error={error?.message ? true : false}
								/>

								{helperText && <Box>{helperText}</Box>}

								<RenderFormError error={extErrors ? extErrors?.message : error?.message ?? ""} />
							</>
						);
					}}
				/>
			</FormControl>
		</Stack>
	);
};

export default CurrencyInputField;
