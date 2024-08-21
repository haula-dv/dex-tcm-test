'use client';
import { styled } from '@mui/material/styles';
import { Select } from '@orderly.network/react';
import { SelectOption } from '@orderly.network/react/esm/select/select';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { TextFieldElement, TextFieldElementProps } from 'react-hook-form-mui';

interface SelectFieldProps<V extends FieldValues> {
	formContext: UseFormReturn<V>;
	name: Path<V>;
	options: SelectOption[];
}

const SelectField = <V extends FieldValues>({ name, formContext, options }: SelectFieldProps<V>) => {
	return (
		<Controller
			name={name}
			control={formContext.control}
			render={({ field: { name, value, onBlur, onChange }, fieldState: { error } }) => (
				<Select options={options} value={value} onChange={onChange} name={name} onBlur={onBlur} />
			)}
		/>
	);
};

export default SelectField;

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
