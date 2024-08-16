import { Checkbox, FormControlLabel } from '@mui/material';
import IconCheckActived from '../icons/check-actived';
import IconCheckInActived from '../icons/check-inactived';

interface IProps {
	label?: string;
}

export const CheckBoxBase = ({ label }: IProps) => {
	return (
		<FormControlLabel
			control={
				<Checkbox
					defaultChecked
					color="darkPrimary"
					icon={<IconCheckInActived />}
					checkedIcon={<IconCheckActived />}
					sx={{ p: 0 }}
				/>
			}
			sx={{ '& .MuiFormControlLabel-label': { pl: 1 } }}
			label={label}
		/>
	);
};
