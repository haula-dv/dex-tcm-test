import { MainCard } from '@/components/card/MainCard';
import IconLoading from '@/components/icons/loading';
import { Stack, Typography } from '@mui/material';
import { useOrderbookStream } from '@orderly.network/hooks';
import { memo } from 'react';
import OrderBookItem from './OrderBookItem';

interface IProps {
	symbol: string;
}

const OrderBookContentCustom = ({ symbol }: IProps) => {
	const [data, { isLoading }] = useOrderbookStream(symbol, undefined, {
		level: 15,
	});

	if (isLoading) {
		return <IconLoading />;
	}

	let firstAsk: number;
	let firstBid: number;

	return (
		<MainCard backgroudColor="primaryLight" width="100%" height="100%">
			<Stack direction={'row'} pb={0.5}>
				<Typography width={'100%'} fontSize={'12px'} fontWeight={700}>
					PRICE
				</Typography>

				<Typography width={'100%'} fontSize={'12px'} textAlign="center" fontWeight={700}>
					Qty
				</Typography>

				<Typography width={'100%'} fontSize={'12px'} fontWeight={700} textAlign="center">
					Total
				</Typography>
			</Stack>

			<Stack spacing={0.5}>
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
							/>
						);
					})
					.reverse()}
			</Stack>
		</MainCard>
	);
};

export default memo(OrderBookContentCustom);
