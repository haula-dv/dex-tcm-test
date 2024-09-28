'use client';
import { Box, FormControl, Stack, Typography } from '@mui/material';
import { FixedNumber } from 'ethers';
import { ReactNode } from 'react';
import { Controller, FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form';
import { RenderFormError } from './RenderErrors';
import { TokenInput } from './TokenInput';

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
							<TokenInput
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

							{helperText && <Box>{helperText}</Box>}

							<RenderFormError error={extErrors ? extErrors?.message : error?.message ?? ''} />
						</>
					)}
				/>
			</FormControl>
		</Stack>
	);
};

export default CurrencyInputField;
