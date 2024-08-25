import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

interface IProps {
	tabs: any[];
}

export const GrayTab = ({ tabs }: IProps) => {
	const [tab, setTab] = useState(1);

	return (
		<CustomTab direction={'row'} spacing={1}>
			{tabs.map(({ label, value }) => (
				<Button
					fullWidth
					key={value}
					variant={value == tab ? 'contained' : 'text'}
					color="darkGrey"
					onClick={() => setTab(value)}
				>
					{label}
				</Button>
			))}
		</CustomTab>
	);
};

const CustomTab = styled(Stack)(({ theme }) => ({
	backgroundColor: theme.palette.common.white,
	borderRadius: TSizes.borderRadius,
	height: '48px',

	'& .MuiButton-root': {
		height: '48px',
	},

	'& .MuiButton-text': {
		'&:hover': {
			backgroundColor: 'inherit',
			boxShadow: 'none',
		},
	},
}));
