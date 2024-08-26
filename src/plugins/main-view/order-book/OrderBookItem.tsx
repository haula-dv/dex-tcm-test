import { theme } from '@/utils';
import { usdFormatter } from '@/utils/formatters/number';
import { Box, Grid, Typography } from '@mui/material';
import { memo } from 'react';

interface IProps {
	price: number;
	quantity: number;
	aggregated: number;
	gradient: number;
	isFirstAsk?: boolean;
}

const OrderBookItem = ({ price, quantity, aggregated, gradient, isFirstAsk }: IProps) => {
	return (
		<Box>
			<Grid container spacing={1}>
				<Grid item md={4}>
					<Typography
						fontSize={'11px'}
						fontWeight={600}
						color={isFirstAsk ? theme.palette.error.main : theme.palette.success.main}
					>
						{usdFormatter.format(price)}
					</Typography>
				</Grid>

				<Grid item md={3}>
					<Typography fontSize={'11px'} fontWeight={600} textAlign={'center'} color={theme.palette.grey[900]}>
						{quantity.toFixed(2)}
					</Typography>
				</Grid>

				<Grid item md={5}>
					<Box
						borderRadius={'0px'}
						sx={{
							background: `linear-gradient(to right, ${
								isFirstAsk
									? theme.palette.error.light
									: `color-mix(in srgb, ${theme.palette.success.light}, transparent 70%)`
							} ${gradient}%, transparent ${gradient}%)`,
						}}
						display={'flex'}
						justifyContent={'center'}
					>
						<Typography fontSize={'11px'} fontWeight={600} color={theme.palette.grey[900]}>
							{aggregated.toFixed(2)}
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default memo(OrderBookItem);
