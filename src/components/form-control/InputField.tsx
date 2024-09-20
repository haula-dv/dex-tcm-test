'use client';
import { setColorThemeMode } from '@/utils/helpers';
import { FormControl, InputAdornment, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Controller, FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form';
import { CustomTextField } from './TokenInput';

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
	onExtChange?: (val: string, onChange: any) => void;
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
	onExtChange,
}: InputFieldProps<V>) => {
	const theme = useTheme();

	return (
		<FormControl fullWidth>
			<Controller
				name={name}
				control={formContext.control}
				rules={rules}
				render={({ field: { name, value, onBlur, onChange }, fieldState: { error } }) => (
					<>
						<CustomTextField
							id={`outlined-adornment-${suffix}`}
							placeholder={placeholder}
							name={name}
							value={value}
							// onBlur={onBlur}
							onChange={() => {
								onExtChange ? onExtChange(value, onChange) : onChange(value);
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
						/>
					</>
				)}
			/>
		</FormControl>
	);
};

export default InputField;
