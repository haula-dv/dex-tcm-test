import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { PasswordElement } from 'react-hook-form-mui';

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

const InputPasswordField = <V extends FieldValues>({
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
		<PasswordElement
			name={name}
			control={formContext.control}
			multiline={rows > 1}
			minRows={rows}
			maxRows={rows}
			fullWidth
			type={type}
			required={required}
			placeholder={placeholder}
			disabled={disabled}
			variant="filled"
			label={label}
		/>
	);
};

export default InputPasswordField;
