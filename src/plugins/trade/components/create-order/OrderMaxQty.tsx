import { Stack, Typography } from '@mui/material';

interface IProps {
	maxQty: string;
	base: string;
}

export const OrderMaxQty = ({ maxQty, base }: IProps) => {
	return (
		<Stack direction={'row'} justifyContent={'space-between'}>
			<Typography>Max:</Typography>

			<Typography>
				{maxQty} {base}
			</Typography>
		</Stack>
	);
};
