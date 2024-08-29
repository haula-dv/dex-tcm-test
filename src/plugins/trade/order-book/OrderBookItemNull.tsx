import { theme } from '@/utils';
import { Grid, Typography } from '@mui/material';
import { memo } from 'react';

interface IProps {
	isFirstAsk?: boolean;
}

const OrderBookItemNull = ({ isFirstAsk }: IProps) => {
	return (
		<Grid container py={'2px'}>
			<Grid item md={4}>
				<Typography fontSize={'11px'} color={isFirstAsk ? theme.palette.error.main : theme.palette.success.main}>
					_
				</Typography>
			</Grid>
			<Grid item md={3}>
				<Typography fontSize={'11px'} textAlign={'center'}>
					_
				</Typography>
			</Grid>
			<Grid item md={5}>
				<Typography fontSize={'11px'} textAlign={'center'}>
					_
				</Typography>
			</Grid>
		</Grid>
	);
};

export default memo(OrderBookItemNull);
