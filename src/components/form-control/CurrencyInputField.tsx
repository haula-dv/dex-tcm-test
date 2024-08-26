'use client';
import { theme } from '@/utils';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { FormControl, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form';

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

const CurrencyInputField = <V extends FieldValues>({
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
							endAdornment={
								<InputAdornment position="end">
									<Typography
										px={'4px'}
										bgcolor={theme.palette.primary.main}
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
						{/* <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText> */}

						{/* <RenderFormError error={error?.message ?? ''} /> */}
					</>
				)}
			/>
		</FormControl>
	);
};

export default CurrencyInputField;

const CustomTextField = styled(OutlinedInput)(({ theme }) => ({
	fontWeight: 600,
	borderRadius: TSizes.borderRadius,
	fontSize: '13px',
	backgroundColor: theme.palette.primary.light,
	height: TSizes.buttonHeightSmall,

	'& input': {
		padding: '12px 0px 12px 14px',
	},

	'& .MuiInputAdornment-root': {
		marginLeft: '0px',
		marginRight: '-8px',
	},

	'& .MuiOutlinedInput-input::-webkit-input-placeholder': {
		color: theme.palette.grey[900],
		opacity: '1',
	},
	'& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
		color: theme.palette.text.secondary,
		opacity: '1',
	},
	'& .MuiOutlinedInput-notchedOutline': {
		border: 0,
	},

	'& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
		borderColor: theme.palette.grey[200],
	},
}));
