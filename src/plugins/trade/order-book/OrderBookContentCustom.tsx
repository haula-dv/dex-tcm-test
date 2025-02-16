import IconLoading from "@/components/icons/loading";
import { getDecimalsFromTick } from "@/utils/formatters/api";
import { Grid, Stack, Typography } from "@mui/material";
import { useOrderbookStream, useSymbolsInfo } from "@orderly.network/hooks";
import { memo, useCallback, useMemo } from "react";
import MarkPrice from "./MarkPrice";
import OrderBookItem from "./OrderBookItem";
import OrderBookItemNull from "./OrderBookItemNull";

interface IProps {
  symbol: string;
}

const OrderBookContentCustom = ({ symbol }: IProps) => {
  const [data, { isLoading }] = useOrderbookStream(symbol, undefined, {
    level: 7,
  });

  const symbolsInfo = useSymbolsInfo();
  const symbolInfo = symbolsInfo[symbol]();
  const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

  const formatQuantity = useCallback(
    (quantity: number) => {
      // Format giá trị với dấu phẩy cho UI
      const formattedValue = Number(quantity).toLocaleString(undefined, {
        minimumFractionDigits: baseDecimals,
        maximumFractionDigits: baseDecimals,
      });

      return formattedValue;
    },
    [baseDecimals]
  );

  const formatPrice = useCallback(
    (quantity: number) => {
      // Format giá trị với dấu phẩy cho UI
      const formattedValue = Number(quantity).toLocaleString(undefined, {
        minimumFractionDigits: quoteDecimals,
        maximumFractionDigits: quoteDecimals,
      });

      return formattedValue;
    },
    [quoteDecimals]
  );

  const formatMarkPrice = useMemo(() => {
    // Format giá trị với dấu phẩy cho UI
    const formattedValue = Number(data.markPrice).toLocaleString(undefined, {
      minimumFractionDigits: quoteDecimals,
      maximumFractionDigits: quoteDecimals,
    });

    return formattedValue;
  }, [data.markPrice, quoteDecimals]);

  if (isLoading) {
    return <IconLoading />;
  }

  const [_, base, quote] = symbol.split("_");

  return (
    <>
      <Grid container pb={"2px"}>
        <Grid item xs={4} md={4}>
          <Typography width={"100%"} fontSize={"12px"} fontWeight={700}>
            Price
          </Typography>
        </Grid>

        <Grid item xs={4} md={3}>
          <Typography
            width={"100%"}
            fontSize={"12px"}
            textAlign="center"
            fontWeight={700}
          >
            Qty
          </Typography>
        </Grid>

        <Grid item xs={4} md={5}>
          <Typography
            width={"100%"}
            fontSize={"14px"}
            fontWeight={700}
            textAlign="center"
          >
            Total
          </Typography>
        </Grid>
      </Grid>

      <Stack spacing={0.2}>
        {data.asks?.map(([price, quantity, aggregated, totalQuote], index) => {
          if (
            Number.isNaN(price) ||
            Number.isNaN(quantity) ||
            Number.isNaN(aggregated)
          ) {
            return <OrderBookItemNull key={index} isFirstAsk />;
          }

          const gradient = (100 * aggregated) / data.asks?.[0]?.[2] || 1;

          return (
            <OrderBookItem
              key={index}
              gradient={gradient}
              price={formatPrice(price)}
              quantity={formatQuantity(quantity)}
              aggregated={formatQuantity(aggregated)}
              totalQuote={totalQuote}
              isFirstAsk
              base={base}
              quote={quote}
            />
          );
        })}

        <MarkPrice
          markPrice={formatMarkPrice as any}
          lastPrice={data && data?.middlePrice ? data.middlePrice : []}
          asks={data?.bids ?? []}
          bids={data?.asks ?? []}
          quoteDecimals={quoteDecimals}
        />

        {data.bids
          ?.reverse()
          ?.map(([price, quantity, aggregated, totalQuote], index) => {
            if (
              Number.isNaN(price) ||
              Number.isNaN(quantity) ||
              Number.isNaN(aggregated)
            ) {
              return <OrderBookItemNull key={index} />;
            }

            const gradient = (100 * aggregated) / data.bids?.[0]?.[2] || 1;

            return (
              <OrderBookItem
                key={index}
                gradient={gradient}
                price={formatPrice(price)}
                quantity={formatQuantity(quantity)}
                aggregated={formatQuantity(aggregated)}
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
