import { MainCard } from '@/components/card/MainCard';
import IconLoading from '@/components/icons/loading';
import { Grid, Stack, Typography } from '@mui/material';
import { useOrderbookStream } from '@orderly.network/hooks';
import { memo } from 'react';
import OrderBookItem from './OrderBookItem';

interface IProps {
	symbol: string;
}

const OrderBookContentCustom = ({ symbol }: IProps) => {
	const [data, { isLoading }] = useOrderbookStream(symbol, undefined, {
		level: 14,
	});

	if (isLoading) {
		return <IconLoading />;
	}
	const [_, base, quote] = symbol.split('_');
	let firstAsk: number;
	let firstBid: number;

	return (
		<MainCard backgroudColor="primaryLight" width="100%">
			<Grid container pb={'6px'}>
				<Grid item md={4}>
					<Typography width={'100%'} fontSize={'12px'} fontWeight={700}>
						PRICE
					</Typography>
				</Grid>

				<Grid item md={3}>
					<Typography width={'100%'} fontSize={'12px'} textAlign="center" fontWeight={700}>
						Qty
					</Typography>
				</Grid>

				<Grid item md={5}>
					<Typography width={'100%'} fontSize={'12px'} fontWeight={700} textAlign="center">
						Total
					</Typography>
				</Grid>
			</Grid>

			<Stack spacing={0.2}>
				{data.asks
					?.filter(([price]) => !Number.isNaN(price))
					.map(([price, quantity, aggregated], index) => {
						if (firstAsk == null) {
							firstAsk = aggregated;
						}
						const gradient = (100 * aggregated) / firstAsk;

						return (
							<OrderBookItem
								key={index}
								aggregated={aggregated}
								gradient={gradient}
								price={price}
								quantity={quantity}
								isFirstAsk
								base={base}
								quote={quote}
							/>
						);
					})}

				<Stack direction={'row'} py="16px">
					<Typography fontSize={'15px'} fontWeight={600} width={'100%'}>
						65,100
					</Typography>
					<Typography fontSize={'12px'} width={'100%'} textAlign={'center'}>
						15.00
					</Typography>
					<Typography fontSize={'12px'} width={'100%'} textAlign={'center'}>
						0.0004%
					</Typography>
				</Stack>

				{data.bids
					?.filter(([price]) => !Number.isNaN(price))
					.reverse()
					.map(([price, quantity, aggregated], index) => {
						if (firstBid == null) {
							firstBid = aggregated;
						}
						const gradient = (100 * aggregated) / firstBid;

						return (
							<OrderBookItem
								key={index}
								aggregated={aggregated}
								gradient={gradient}
								price={price}
								quantity={quantity}
								base={base}
								quote={quote}
							/>
						);
					})
					.reverse()}
			</Stack>
		</MainCard>
	);
};

export default memo(OrderBookContentCustom);
