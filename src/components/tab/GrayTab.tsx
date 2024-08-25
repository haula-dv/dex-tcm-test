import { TSizes } from '@/utils/themes/custom-theme/sizes';
import TabContext from '@mui/lab/TabContext';
import { Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode, useState } from 'react';

interface IProps {
	tabs: {
		label: string;
		value: string;
	}[];

	children?: ReactNode;
}

export const GrayTab = ({ tabs, children }: IProps) => {
	const [tab, setTab] = useState<string>('1');

	return (
		<TabContext value={tab}>
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

			{children}
		</TabContext>
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
