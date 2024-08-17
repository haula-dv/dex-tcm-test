import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IProps {
	tabs: any[];
}

export const GrayTab = ({ tabs }: IProps) => {
	return (
		<CustomTab direction={'row'} spacing={1}>
			{tabs.map(({ label, value }) => (
				<Button
					fullWidth
					key={value}
					variant={value == 1 ? 'contained' : 'text'}
					color="darkPrimary"
				>
					{label}
				</Button>
			))}
		</CustomTab>
	);
};

const CustomTab = styled(Stack)(({ theme }) => ({
	backgroundColor: theme.palette.grey[50],
	// padding: "5px",
	borderRadius: TSizes.borderRadius,
}));
