import IconLoading from "@/components/icons/loading";
import { Grid, Stack, Typography } from "@mui/material";
import { useOrderbookStream } from "@orderly.network/hooks";
import { memo } from "react";
import MarkPrice from "./MarkPrice";
import OrderBookItem from "./OrderBookItem";
import OrderBookItemNull from "./OrderBookItemNull";

interface IProps {
	symbol: string;
}

const OrderBookContentCustom = ({ symbol }: IProps) => {
	const [data, { isLoading }] = useOrderbookStream(symbol, undefined, {
		level: 9,
	});

	if (isLoading) {
		return <IconLoading />;
	}

	const [_, base, quote] = symbol.split("_");

	return (
		<>
			<Grid container pb={"6px"}>
				<Grid item md={4}>
					<Typography width={"100%"} fontSize={"12px"} fontWeight={700}>
						Price
					</Typography>
				</Grid>

				<Grid item md={3}>
					<Typography width={"100%"} fontSize={"12px"} textAlign="center" fontWeight={700}>
						Qty
					</Typography>
				</Grid>

				<Grid item md={5}>
					<Typography width={"100%"} fontSize={"12px"} fontWeight={700} textAlign="center">
						Total
					</Typography>
				</Grid>
			</Grid>

			<Stack spacing={0.2}>
				{data.asks?.map(([price, quantity, aggregated, totalQuote], index) => {
					if (Number.isNaN(price) || Number.isNaN(quantity) || Number.isNaN(aggregated)) {
						return <OrderBookItemNull key={index} isFirstAsk />;
					}

					const gradient = (100 * aggregated) / data.asks?.[0]?.[2] || 1;

					return (
						<OrderBookItem
							key={index}
							gradient={gradient}
							price={price}
							quantity={quantity}
							aggregated={aggregated}
							totalQuote={totalQuote}
							isFirstAsk
							base={base}
							quote={quote}
						/>
					);
				})}

				<MarkPrice
					markPrice={data.markPrice ?? 0}
					lastPrice={data && data?.middlePrice ? data.middlePrice : []}
					asks={data?.bids ?? []}
					bids={data?.asks ?? []}
				/>

				{data.bids
					?.reverse()
					?.map(([price, quantity, aggregated, totalQuote], index) => {
						if (Number.isNaN(price) || Number.isNaN(quantity) || Number.isNaN(aggregated)) {
							return <OrderBookItemNull key={index} />;
						}

						const gradient = (100 * aggregated) / data.bids?.[0]?.[2] || 1;

						return (
							<OrderBookItem
								key={index}
								gradient={gradient}
								price={price}
								quantity={quantity}
								aggregated={aggregated}
								totalQuote={totalQuote}
								base={base}
								quote={quote}
							/>
						);
					})
					.reverse()}
			</Stack>
		</>
	);
};

export default memo(OrderBookContentCustom);
