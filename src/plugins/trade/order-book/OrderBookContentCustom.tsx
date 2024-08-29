import { MainCard } from '@/components/card/MainCard';
import IconLoading from '@/components/icons/loading';
import MainTooltip from '@/components/MainTooltip';
import { Grid, Stack, Typography } from '@mui/material';
import { useOrderbookStream } from '@orderly.network/hooks';
import { memo } from 'react';
import OrderBookItem from './OrderBookItem';
import OrderBookItemNull from './OrderBookItemNull';

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
		<MainCard backgroudColor="primaryLight" width="100%" height="100%">
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
				{data.asks?.map(([price, quantity, aggregated], index) => {
					if (Number.isNaN(price) || Number.isNaN(quantity) || Number.isNaN(aggregated)) {
						return <OrderBookItemNull key={index} isFirstAsk />;
					}

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
					<Typography fontSize={'18px'} fontWeight={600} width={'100%'}>
						{data.markPrice}
					</Typography>
					<MainTooltip
						placement="top"
						arrow
						title="Obtained from a third-party oracle, the mark price is calculated as the median of three prices: the last price, the fair price based on the funding rate basis, and the fair price based on the order books."
					>
						<Typography fontSize={'12px'} width={'100%'} textAlign={'center'}>
							15.00
						</Typography>
					</MainTooltip>

					<MainTooltip placement="top" title="Spread Ratio of the ask1 and bid1." arrow>
						<Typography fontSize={'12px'} width={'100%'} textAlign={'center'}>
							0.0004%
						</Typography>
					</MainTooltip>
				</Stack>

				{data.bids
					?.reverse()
					?.map(([price, quantity, aggregated], index) => {
						if (Number.isNaN(price) || Number.isNaN(quantity) || Number.isNaN(aggregated)) {
							return <OrderBookItemNull key={index} />;
						}
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
