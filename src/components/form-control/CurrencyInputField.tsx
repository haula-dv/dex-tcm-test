'use client';
import { FormControl } from '@mui/material';
import { FixedNumber } from 'ethers';
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
	inputMode?: 'numeric' | 'decimal' | 'amount';
	readOnly?: boolean | null;
	rules?: Omit<RegisterOptions<V, Path<V>>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'> | undefined;
}

const CurrencyInputField = <V extends FieldValues>({
	name,
	formContext,
	decimals,
	placeholder,
	inputMode,
	readOnly,
	suffix,
	rules,
	min,
	max,
}: InputFieldProps<V>) => {
	return (
		<FormControl fullWidth>
			<Controller
				name={name}
				control={formContext.control}
				rules={rules}
				render={({ field: { name, onBlur, onChange }, fieldState: { error } }) => (
					<>
						<TokenInput
							decimals={decimals}
							placeholder={placeholder}
							name={name}
							onBlur={onBlur}
							onChange={onChange}
							hasError={error != null}
							suffix={suffix}
						/>

						<RenderFormError error={error?.message ?? ''} />
					</>
				)}
			/>
		</FormControl>
	);
};

export default CurrencyInputField;
