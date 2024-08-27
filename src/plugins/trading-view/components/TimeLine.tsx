import { theme } from '@/utils';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';

const timelines = [
	{ label: '1m', value: '1' },
	{ label: '3m', value: '3' },
	{ label: '5m', value: '5' },
	{ label: '15m', value: '15' },
	{ label: '30m', value: '30' },
	{ label: '1h', value: '60' },
	{ label: '2h', value: '120' },
	{ label: '3h', value: '180' },
	{ label: '4h', value: '240' },
	{ label: '1D', value: 'D' },
	{ label: '1W', value: 'W' },
	{ label: '1M', value: 'M' },
	{ label: '1Y', value: 'Y' },
];

interface IProps {
	handleChangeInterval: (val: string) => void;
}

const TimeLine = ({ handleChangeInterval }: IProps) => {
	const [currentIn, setCurrentIn] = useState('1');

	const onChange = (value: string) => {
		setCurrentIn(value);
		handleChangeInterval(value);
	};

	return (
		<Stack
			direction={'row'}
			spacing={0.5}
			bgcolor={theme.palette.primary.light}
			p={'10px'}
			mt={1}
			sx={{ borderTopLeftRadius: TSizes.borderRadius, borderTopRightRadius: TSizes.borderRadius }}
			border={1}
			borderColor={theme.palette.divider}
			borderBottom={0}
		>
			{timelines.map((item, index) => (
				<Typography
					key={index}
					width={'56px'}
					sx={{ cursor: 'pointer' }}
					onClick={() => onChange(item.value)}
					fontWeight={currentIn === item.value ? 700 : 500}
				>
					{item.label}
				</Typography>
			))}
		</Stack>
	);
};

export default TimeLine;
