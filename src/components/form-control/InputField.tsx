'use client';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { TextFieldElement, TextFieldElementProps } from 'react-hook-form-mui';

interface InputFieldProps<V extends FieldValues> {
	formContext: UseFormReturn<V>;
	name: Path<V>;
	type?: 'text' | 'number' | 'email';
	label?: string;
	required?: boolean;
	rows?: number;
	placeholder?: string;
	disabled?: boolean;
}

const InputField = <V extends FieldValues>({
	name,
	type = 'text',
	label = '',
	required = false,
	placeholder = '',
	rows = 1,
	disabled = false,
	formContext,
}: InputFieldProps<V>) => {
	return (
		<Stack width={'100%'}>
			<TextFieldElement
				name={name}
				control={formContext.control as any}
				multiline={rows > 1}
				minRows={rows}
				maxRows={rows}
				fullWidth
				type={type}
				required={required}
				placeholder={placeholder}
				disabled={disabled}
				variant="filled"
			/>
		</Stack>
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
