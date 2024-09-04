import MainTooltip from '@/components/MainTooltip';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { memo } from 'react';

interface IProps {
	price: number;
	quantity: number;
	aggregated: number;
	totalQuote: number;
	gradient: number;
	isFirstAsk?: boolean;
	base: string;
	quote: string;
}

const OrderBookItem = ({ price, quantity, aggregated, totalQuote, gradient, base, quote, isFirstAsk }: IProps) => {
	const theme = useTheme();

	const TooltipValue = (
		<Stack minWidth={'168px'}>
			<ItemRow
				title={
					<Typography fontSize={'12px'} fontWeight={600} color={useTheme().palette.grey[500]}>
						Avg. Price
					</Typography>
				}
				value={
					<Typography fontSize={'12px'} fontWeight={600}>
						{usdFormatter.format(price)}
					</Typography>
				}
			/>
			<ItemRow
				title={
					<Typography fontSize={'12px'} fontWeight={600} color={useTheme().palette.grey[500]}>
						{`Sum (${base})`}
					</Typography>
				}
				value={
					<Typography fontSize={'12px'} fontWeight={600}>
						{aggregated.toFixed(2)}
					</Typography>
				}
			/>
			<ItemRow
				title={
					<Typography fontSize={'12px'} fontWeight={600} color={useTheme().palette.grey[500]}>
						{`Sum (${quote})`}
					</Typography>
				}
				value={
					<Typography fontSize={'12px'} fontWeight={600}>
						{usdFormatter.format(totalQuote)}
					</Typography>
				}
			/>
		</Stack>
	);

	return (
		<MainTooltip placement="left" arrow title={TooltipValue}>
			<Box
				borderRadius={0}
				sx={{
					cursor: 'pointer',
					'&:hover': {
						backgroundColor: setColorThemeMode(theme.palette.primary.main, theme.palette.grey[900]),
					},
				}}
			>
				<Grid container spacing={1}>
					<Grid item md={4}>
						<Typography
							fontSize={'11px'}
							fontWeight={600}
							color={isFirstAsk ? theme.palette.error.main : theme.palette.success.main}
							py={'2px'}
						>
							{usdFormatter.format(price)}
						</Typography>
					</Grid>

					<Grid item md={3}>
						<Typography
							fontSize={'11px'}
							fontWeight={600}
							textAlign={'center'}
							color={setColorThemeMode(theme.palette.grey[900], theme.palette.common.white)}
							py={'2px'}
						>
							{quantity.toFixed(2)}
						</Typography>
					</Grid>

					<Grid item md={5}>
						<Box
							py={'2px'}
							borderRadius={'0px'}
							sx={{
								background: `linear-gradient(to right, ${
									isFirstAsk
										? `color-mix(in srgb, ${theme.palette.error.main}, transparent 70%)`
										: `color-mix(in srgb, ${theme.palette.success.main}, transparent 70%)`
								} ${gradient}%, transparent ${gradient}%)`,
							}}
							display={'flex'}
							justifyContent={'center'}
						>
							<Typography
								fontSize={'11px'}
								fontWeight={600}
								color={setColorThemeMode(theme.palette.grey[900], theme.palette.common.white)}
							>
								{aggregated.toFixed(2)}
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</MainTooltip>
	);
};

export default memo(OrderBookItem);
