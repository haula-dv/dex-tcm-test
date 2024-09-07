import { ITab } from '@/common/types/components/tab';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import TabContext from '@mui/lab/TabContext';
import { Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode, useState } from 'react';

interface IProps {
	tabs: ITab[];

	children?: ReactNode;
}

export const GrayTab = ({ tabs, children }: IProps) => {
	const [tab, setTab] = useState<string | number>('1');

	return (
		<TabContext value={tab}>
			<CustomTab direction={'row'} spacing={1}>
				{tabs.map(({ label, value }) => (
					<Button
						fullWidth
						key={value}
						variant={value == tab ? 'contained' : 'text'}
						color={setColorThemeMode('darkGrey', 'primary')}
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
	backgroundColor: setColorThemeMode(theme.palette.common.white, theme.palette.grey[900]),
	borderRadius: TSizes.borderRadius,
	height: '48px',

	'& .MuiButton-root': {
		height: '48px',
		fontSize: '18px',
	},

	'& .MuiButton-text': {
		color: setColorThemeMode(theme.palette.grey[500], theme.palette.grey[200]),

		'&:hover': {
			backgroundColor: 'inherit',
			boxShadow: 'none',
		},
	},
}));
