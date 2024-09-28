'use client';
import { filterAllowedCharacters, getFormattedNumber, getNumberAsUInt128 } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { Box, FormControl, InputAdornment, Stack, Typography, useTheme } from '@mui/material';
import { FixedNumber } from 'ethers';
import { ReactNode } from 'react';
import { Controller, FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form';
import { RenderFormError } from './RenderErrors';
import { CustomTextField } from './TokenInput';

interface InputFieldProps<V extends FieldValues> {
	formContext: UseFormReturn<V>;
	name: Path<V>;
	decimals: number;
	suffix?: React.ReactNode;
	min?: FixedNumber;
	max?: FixedNumber;
	placeholder?: string;
	rules?: Omit<RegisterOptions<V, Path<V>>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'> | undefined;
	hint?: string;
	onValueChange?: (value: FixedNumber) => void | Promise<void>;
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
	rules,
	hint,
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

	return (
		<Stack width={'100%'}>
			{typeof label == 'string' ? <Typography fontSize={'12px'}>{label}</Typography> : label}

			<FormControl fullWidth>
				<Controller
					name={name}
					control={formContext.control}
					rules={rules}
					render={({ field: { name, value, onBlur, onChange }, fieldState: { error } }) => (
						<>
							<CustomTextField
								id={`outlined-adornment-${suffix}`}
								value={value}
								readOnly={readOnly}
								name={name}
								placeholder={placeholder ?? '0.0'}
								onChange={(event) => {
									let newValue = filterAllowedCharacters(event.target.value);
									if (value !== newValue) {
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
										if (onValueChange) {
											onValueChange(fixedNumber);
										}

										const formattedValue = Number(newValue).toLocaleString(undefined, {
											minimumFractionDigits: decimals,
											maximumFractionDigits: decimals,
										});

										onChange(newValue);
									}
								}}
								endAdornment={
									<InputAdornment position="end">
										<Typography
											px={'6px'}
											bgcolor={setColorThemeMode(theme.palette.primary.main, theme.palette.grey[800])}
											fontWeight={600}
											borderRadius={'40px'}
											fontSize={'12px'}
										>
											{suffix}
										</Typography>
									</InputAdornment>
								}
								aria-describedby="outlined-weight-helper-text"
								inputProps={{
									'aria-label': 'weight',
								}}
								autoComplete="off"
								error={hasError}
							/>

							{helperText && <Box>{helperText}</Box>}
							<RenderFormError error={extErrors ? extErrors?.message : error?.message ?? ''} />

							{/* <TokenInput
								decimals={decimals}
								placeholder={placeholder}
								name={name}
								value={value}
								onBlur={onBlur}
								onChange={onChange}
								hasError={hasError ? hasError : error != null}
								suffix={suffix}
								onValueChange={onValueChange}
								max={max}
								min={min}
								readOnly={readOnly}
							/>

							 */}
						</>
					)}
				/>
			</FormControl>
		</Stack>
	);
};

export default CurrencyInputField;
