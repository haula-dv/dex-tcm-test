import { setColorThemeMode } from '@/utils/helpers';
import { Box, Stack, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, ReactNode, useState } from 'react';

const Android12Switch = styled(Switch)(({ theme }) => ({
	padding: 8,
	'& span': {
		color: '#fff',
	},
	'& .MuiSwitch-track': {
		borderRadius: 22 / 2,
		backgroundColor: `${setColorThemeMode(theme.palette.grey[500], theme.palette.grey[900], theme)} !important`,
		opacity: `${1} !important`,
		'&::before, &::after': {
			content: '""',
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
			width: 16,
			height: 16,
		},
		'&::before': {
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				theme.palette.getContrastText('#fff'),
			)}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
			left: 12,
		},
		'&::after': {
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				theme.palette.getContrastText(theme.palette.primary.main),
			)}" d="M19,13H5V11H19V13Z" /></svg>')`,
			right: 12,
		},
	},
	'& .MuiSwitch-thumb': {
		boxShadow: 'none',
		width: 16,
		height: 16,
		margin: 2,
	},
}));

interface IProps {
	label?: ReactNode;
}

const CustomSwitch = ({ label }: IProps) => {
	const [value, setValue] = useState(false);

	const handleChange = () => {
		setValue(!value);
	};

	return (
		<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
			<Box>{label}</Box>

			<Android12Switch defaultChecked />
		</Stack>
	);
};

export default memo(CustomSwitch);
