import { Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import IconCheckActived from '../icons/check-actived';
import IconCheckInActived from '../icons/check-inactived';

interface IProps {
	label?: string;
	defaultValue?: boolean;
	onChange?: (value: boolean) => void;
}

export const CheckBoxBase = ({ label, defaultValue, onChange }: IProps) => {
	const [value, setValue] = useState(defaultValue);

	const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
		setValue(checked);
		onChange && onChange(checked);
	};

	return (
		<FormControlLabel
			control={
				<Checkbox
					value={value}
					defaultChecked={defaultValue}
					onChange={handleChange}
					color="darkPrimary"
					icon={<IconCheckInActived />}
					checkedIcon={<IconCheckActived />}
					sx={{ p: 0 }}
				/>
			}
			sx={{ '& .MuiFormControlLabel-label': { pl: 1 }, mr: 0 }}
			label={label}
		/>
	);
};
