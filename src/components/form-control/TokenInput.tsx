'use client';
import { filterAllowedCharacters, getFormattedNumber, getNumberAsUInt128 } from '@/utils/formatters/number';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FixedNumber } from 'ethers';
import { FC, useEffect, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

export const TokenInput: FC<
	{
		decimals: number;
		id?: string;
		readonly?: boolean;
		placeholder?: string;
		afterInputChange?: Function;
		value?: string | number;
		onValueChange?: (value: FixedNumber) => void | Promise<void>;
		min?: FixedNumber;
		max?: FixedNumber;
		className?: string;
		hasError?: boolean;
		suffix?: React.ReactNode;
	} & Partial<ControllerRenderProps>
> = ({
	id,
	readonly,
	placeholder,
	decimals,
	afterInputChange,
	value: outerValue,
	onValueChange,
	min,
	max,
	className,
	hasError,
	suffix,
	...props
}) => {
	const [value, setValue] = useState(outerValue ? String(outerValue) : '');

	useEffect(() => {
		if (outerValue == null || typeof outerValue === 'string') return;
		let newValue = filterAllowedCharacters(String(outerValue));
		const quantity = getFormattedNumber(newValue, decimals);
		if (getFormattedNumber(value, decimals) !== quantity) {
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
			setValue(newValue);
		}
	}, [decimals, max, min, outerValue, value]);

	const onInputChange = () => {
		if (afterInputChange) {
			afterInputChange();
		}
	};

	return (
		<CustomTextField
			id={`outlined-adornment-${suffix}`}
			value={value}
			onInput={onInputChange}
			name={props.name}
			readOnly={readonly ?? false}
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
					event.target.value = newValue;
					setValue(newValue);
				}
				if (props.onChange) props.onChange(event);
			}}
			onBlur={(event) => {
				const quantity = getFormattedNumber(event.target.value, decimals);
				setValue(quantity);
				if (props.onBlur) props.onBlur();
			}}
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
			autoComplete="off"
			error={hasError}
		/>
	);
};

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
