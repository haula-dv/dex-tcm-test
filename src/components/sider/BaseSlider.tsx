import { Box, ButtonBase, Slider, SliderProps, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { MainSlider } from '../form-control/AmountSlider';

interface IProps extends SliderProps {
	max: number;
	handleChange: (newAmount: number) => void;
	amountQty: number;
}

const BaseSlider = ({ max, handleChange, amountQty, ...props }: IProps) => {
	const [valuePercent, setNewValue] = useState<any>(0);
	const theme = useTheme();

	const onChange = (newValue: any) => {
		const caculatedAmount = (max * newValue) / 100;
		const truncatedAmount = Math.floor(caculatedAmount * 10000) / 10000;
		handleChange(truncatedAmount);
		setNewValue(newValue);
	};

	useEffect(() => {
		if (amountQty) {
			const percentage = (amountQty / max) * 100;
			setNewValue(parseFloat(percentage.toFixed(1)));
		}
	}, [amountQty, max]);

	return (
		<Stack>
			<Box px="6px">
				<MainSlider
					size="small"
					valueLabelDisplay="auto"
					value={valuePercent}
					onChange={(event, newValue) => {
						onChange(newValue);
					}}
					marks={marks}
					getAriaValueText={(value) => `${value}%`}
					valueLabelFormat={(value) => `${value}%`}
					aria-label="Small"
					{...props}
				/>
			</Box>

			<Stack direction={'row'} spacing={'10px'}>
				<Typography flex={1} fontWeight={600} fontSize={'12px'} color={theme.palette.success.main}>
					{valuePercent}% - Max {max}
				</Typography>

				{marks.map((item, index) => (
					<CustomButton key={index} actived={item.value === valuePercent} onClick={() => onChange(item.value)}>
						{item.value}%
					</CustomButton>
				))}
			</Stack>
		</Stack>
	);
};

export default BaseSlider;

const CustomButton = styled(ButtonBase, { shouldForwardProp: (prop) => prop != 'actived' })<any>(
	({ theme, actived }) => ({
		border: `1px solid ${theme.palette.grey[600]}`,
		paddingLeft: '4px',
		paddingRight: '4px',
		borderRadius: '4px',
		fontSize: '12px',
		fontWeight: 600,
		...(actived && {
			backgroundColor: theme.palette.success.main,
			borderColor: theme.palette.success.main,
		}),
	}),
);

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

const marks = [
	{
		value: 0,
	},
	{
		value: 25,
	},
	{
		value: 50,
	},
	{
		value: 75,
	},
	{
		value: 100,
	},
];
