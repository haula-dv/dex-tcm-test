'use client';
import { styled } from '@mui/material/styles';
import { Input } from '@orderly.network/react';
import { Controller, FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form';
import { TextFieldElement, TextFieldElementProps } from 'react-hook-form-mui';
import { RenderFormError } from './RenderErrors';

interface InputFieldProps<V extends FieldValues> {
	formContext: UseFormReturn<V>;
	name: Path<V>;
	prefix?: string | React.ReactNode;
	suffix?: React.ReactNode;
	placeholder?: string;
	decimals?: number;
	inputMode?: 'numeric' | 'decimal' | 'amount';
	readOnly?: boolean | null;
	rules?: Omit<RegisterOptions<V, Path<V>>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'> | undefined;
}

const InputField = <V extends FieldValues>({
	name,
	formContext,
	prefix,
	decimals,
	placeholder,
	inputMode,
	readOnly,
	suffix,
	rules,
}: InputFieldProps<V>) => {
	return (
		<Controller
			name={name}
			control={formContext.control}
			rules={rules}
			render={({ field: { name, value, onBlur, onChange }, fieldState: { error } }) => (
				<>
					<Input
						value={value}
						className="orderly-text-right"
						placeholder={placeholder}
						inputMode={inputMode}
						prefix={prefix}
						suffix={suffix}
						decimals={decimals}
						name={name}
						onBlur={onBlur}
						onChange={onChange}
						readOnly={readOnly as any}
						autoComplete={'off'}
					/>

					<RenderFormError error={error?.message ?? ''} />
				</>
			)}
		/>
	);
};

export default InputField;

const CustomTextField = styled((props: TextFieldElementProps) => <TextFieldElement {...props} />)(({ theme }) => ({
	'& .MuiOutlinedInput-input::-webkit-input-placeholder': {
		color: theme.palette.text.secondary,
		opacity: '0.4',
	},
	'& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
		color: theme.palette.text.secondary,
		opacity: '1',
	},
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: theme.palette.grey[100],
	},

	'& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
		borderColor: theme.palette.grey[200],
	},
}));
