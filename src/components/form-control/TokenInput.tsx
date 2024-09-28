'use client';
import { TColors } from '@/utils';
import { filterAllowedCharacters, getFormattedNumber, getNumberAsUInt128 } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { FixedNumber } from 'ethers';
import { FC, useEffect, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

export const TokenInput: FC<
	{
		decimals: number;
		id?: string;
		readOnly?: boolean;
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
	readOnly,
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
	const theme = useTheme();
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

			// Format giá trị với dấu phẩy cho UI
			const formattedValue = Number(newValue).toLocaleString(undefined, {
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals,
			});

			setValue(formattedValue);
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
			readOnly={readOnly}
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

					setValue(formattedValue);
					setValue(newValue);
				}
				if (props.onChange) props.onChange(event);
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
	);
};

export const CustomTextField = styled(OutlinedInput)(({ theme }) => ({
	fontWeight: 600,
	borderRadius: TSizes.borderRadius,
	fontSize: '13px',
	backgroundColor: setColorThemeMode(theme.palette.primary.light, TColors.brownnDark),
	height: TSizes.buttonHeightSmall,
	width: '100%',
	'& input': {
		padding: '12px 0px 12px 14px',
	},

	'& .MuiInputAdornment-root': {
		marginLeft: '0px',
		marginRight: '-8px',
	},

	'& .MuiOutlinedInput-input::-webkit-input-placeholder': {
		color: setColorThemeMode(theme.palette.grey[900], theme.palette.common.white),
		opacity: '0.6',
	},
	'& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
		color: theme.palette.text.secondary,
		opacity: '0.6',
	},
	'& .MuiOutlinedInput-notchedOutline': {
		border: 0,
	},

	'& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
		borderColor: theme.palette.grey[200],
	},
}));
