import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomSlider = styled(Slider)(({ theme }) => ({
	'& span': {
		color: theme.palette.success.main,
	},
	'& .MuiSlider-rail': {
		color: theme.palette.success.main,
	},

	'& .MuiSlider-track': {
		color: theme.palette.success.main,
	},

	'& .MuiSlider-thumb': {
		backgroundColor: theme.palette.success.main,
	},
}));
